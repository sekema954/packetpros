import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
  type User,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase";
import { FirebaseError } from "firebase/app";

async function syncHighLevelContact(
  name: string,
  email: string,
  firebaseUid: string
) {
  try {
      const url = import.meta.env.MODE === 'development' 
      ? import.meta.env.VITE_DEV_URL 
      : import.meta.env.VITE_PROD_URL;   
      const res = await fetch(`${url}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        firebaseUid,
      }),
    });

    if (!res.ok) {
      console.error(
        "Failed to create/update HighLevel contact:",
        res.status,
        await res.text().catch(() => "")
      );

      return;
    }

    console.log("HighLevel contact created/updated.");
  } catch (err) {
    console.error(
      "HighLevel registration error:",
      err
    );
  }
}

async function ensureUserDoc(
  uid: string,
  data: {
    name: string | null;
    email: string | null;
  }
) {
  const ref = doc(db, "users", uid);

  const snap = await getDoc(ref);

  if (snap.exists()) {
    console.log(
      "Firestore user document already exists:",
      uid
    );

    return false;
  }

  await setDoc(ref, {
    name: data.name,
    email: data.email,
    role: "student",
    plan: "free",
    subscriptionStatus: "inactive",
    createdAt: serverTimestamp(),
  });

  console.log(
    "Created Firestore user document:",
    uid
  );

  return true;
}

export async function signUp(
  name: string,
  email: string,
  password: string
) {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  let user: User;

  try {
    console.log(
      "Creating Firebase user:",
      cleanEmail
    );

    const credential =
      await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

    user = credential.user;

    console.log(
      "Firebase user created:",
      user.uid
    );
  } catch (err) {
    console.error(
      "SIGNUP ERROR:",
      err
    );

    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/email-already-in-use":
          throw new Error(
            "An account with that email already exists. Please log in instead."
          );

        case "auth/weak-password":
          throw new Error(
            "Password must be at least 6 characters."
          );

        case "auth/invalid-email":
          throw new Error(
            "Please enter a valid email address."
          );

        case "auth/network-request-failed":
          throw new Error(
            "Network error. Please check your internet connection and try again."
          );

        case "auth/operation-not-allowed":
          throw new Error(
            "Email/password accounts are currently disabled."
          );

        case "auth/user-disabled":
          throw new Error(
            "This account has been disabled. Please contact support."
          );

        default:
          throw err;
      }
    }

    throw err;
  }

  try {
    await updateProfile(user, {
      displayName: cleanName,
    });

    console.log(
      "Firebase profile updated."
    );

    await setDoc(
      doc(db, "users", user.uid),
      {
        name: cleanName,
        email: cleanEmail,
        role: "student",
        plan: "free",
        subscriptionStatus: "inactive",
        createdAt: serverTimestamp(),
      }
    );

    console.log(
      "Firestore user document created:",
      user.uid
    );

    await sendEmailVerification(user);

    console.log(
      "Verification email sent."
    );
  } catch (setupError) {
    console.error(
      "SIGNUP SETUP FAILED:",
      setupError
    );

    try {
      await user.delete();

      console.log(
        "Firebase Auth user rolled back successfully."
      );
    } catch (deleteError) {
      console.error(
        "Could not roll back Firebase Auth user:",
        deleteError
      );

      await signOut(auth).catch(() => {});
    }

    if (setupError instanceof FirebaseError) {
      switch (setupError.code) {
        case "permission-denied":
          throw new Error(
            "Unable to create your user profile. Please check your Firestore permissions."
          );

        case "unavailable":
          throw new Error(
            "Firebase is temporarily unavailable. Please try again."
          );

        case "failed-precondition":
          throw new Error(
            "Firebase could not finish creating your account. Please try again."
          );

        default:
          throw new Error(
            `Unable to finish creating your account: ${setupError.code}`
          );
      }
    }

    if (setupError instanceof Error) {
      throw setupError;
    }

    throw new Error(
      "Unable to finish creating your account. Please try again."
    );
  }

  await syncHighLevelContact(
    cleanName,
    cleanEmail,
    user.uid
  );

  return user;
}

export async function signIn(
  email: string,
  password: string
) {
  try {
    const cleanEmail =
      email.trim().toLowerCase();

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

    const user = userCredential.user;

    console.log(
      "Firebase login successful:",
      user.uid
    );

    if (!user.emailVerified) {
      await signOut(auth);

      throw new Error(
        "Please verify your email before logging in."
      );
    }

    await ensureUserDoc(
      user.uid,
      {
        name: user.displayName,
        email: user.email || cleanEmail,
      }
    );

    await syncHighLevelContact(
      user.displayName || "",
      user.email || cleanEmail,
      user.uid
    );

    return user;
  } catch (err) {
    if (
      err instanceof Error &&
      !(err instanceof FirebaseError)
    ) {
      throw err;
    }

    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          throw new Error(
            "Incorrect email or password."
          );

        case "auth/too-many-requests":
          throw new Error(
            "Too many login attempts. Please try again later."
          );

        case "auth/network-request-failed":
          throw new Error(
            "Network error. Please check your internet connection and try again."
          );

        case "permission-denied":
          throw new Error(
            "You logged in successfully, but Firebase could not access your user profile. Please check your Firestore security rules."
          );

        default:
          throw err;
      }
    }

    throw err;
  }
}

export async function signinWithGoogle() {
  const provider =
    new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account",
  });

  try {
    const result =
      await signInWithPopup(
        auth,
        provider
      );

    const user = result.user;

    console.log(
      "Google authentication successful:",
      user.uid
    );

    const created =
      await ensureUserDoc(
        user.uid,
        {
          name: user.displayName,
          email: user.email,
        }
      );

    console.log(
      created
        ? "New Google user added to Firestore."
        : "Existing Google user."
    );

    await syncHighLevelContact(
      user.displayName || "",
      user.email || "",
      user.uid
    );

    return user;
  } catch (err) {
    console.error(
      "Google sign-in failed:",
      err
    );

    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/popup-closed-by-user":
          throw new Error(
            "Google sign-in was cancelled."
          );

        case "auth/popup-blocked":
          throw new Error(
            "The Google sign-in popup was blocked. Please allow popups for this site."
          );

        case "auth/cancelled-popup-request":
          throw new Error(
            "Another Google sign-in window is already open."
          );

        case "auth/network-request-failed":
          throw new Error(
            "Network error. Please check your internet connection and try again."
          );

        case "auth/account-exists-with-different-credential":
          throw new Error(
            "An account already exists with this email using a different sign-in method."
          );

        case "permission-denied":
          throw new Error(
            "Google login succeeded, but Firebase could not create or access your user profile. Please check your Firestore security rules."
          );

        default:
          throw err;
      }
    }

    throw err;
  }
}

export async function forgotPassword(
  email: string
) {
  try {
    await sendPasswordResetEmail(
      auth,
      email.trim().toLowerCase()
    );

    console.log(
      "Password reset email sent."
    );
  } catch (err) {
    console.error(
      "PASSWORD RESET ERROR:",
      err
    );

    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/invalid-email":
          throw new Error(
            "Please enter a valid email address."
          );

        case "auth/user-not-found":
          throw new Error(
            "No account was found with that email address."
          );

        case "auth/too-many-requests":
          throw new Error(
            "Too many requests. Please wait before trying again."
          );

        case "auth/network-request-failed":
          throw new Error(
            "Network error. Please check your internet connection and try again."
          );

        default:
          throw new Error(
            "Unable to send password reset email."
          );
      }
    }

    throw err;
  }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error(
        "You must be logged in to change your password."
      );
    }

    if (!user.email) {
      throw new Error(
        "This account does not have an email address."
      );
    }

    if (newPassword.length < 6) {
      throw new Error(
        "New password must be at least 6 characters."
      );
    }

    if (currentPassword === newPassword) {
      throw new Error(
        "Your new password must be different from your current password."
      );
    }

    const credential =
      EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

    await reauthenticateWithCredential(
      user,
      credential
    );

    await updatePassword(
      user,
      newPassword
    );

    console.log(
      "Password changed successfully."
    );
  } catch (err) {
    console.error(
      "CHANGE PASSWORD ERROR:",
      err
    );

    if (err instanceof FirebaseError) {
      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
          throw new Error(
            "Your current password is incorrect."
          );

        case "auth/weak-password":
          throw new Error(
            "New password must be at least 6 characters."
          );

        case "auth/requires-recent-login":
          throw new Error(
            "For security, please sign in again before changing your password."
          );

        case "auth/network-request-failed":
          throw new Error(
            "Network error. Please check your internet connection and try again."
          );

        default:
          throw new Error(
            "Unable to change your password. Please try again."
          );
      }
    }

    if (err instanceof Error) {
      throw err;
    }

    throw new Error(
      "Unable to change your password."
    );
  }
}

export async function logout() {
  await signOut(auth);

  console.log(
    "User logged out."
  );
}