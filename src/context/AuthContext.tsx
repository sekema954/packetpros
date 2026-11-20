import { createContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../firebase/firebase";

interface AuthContextType {
    user: User | null
}

export const AuthContext = createContext<AuthContextType>({
    user: null
})

interface AuthProviderProp {
    children: ReactNode;
}

export function AuthProvider({children}:AuthProviderProp){
    const [user, setUser] = useState<User | null>(null)

    useEffect(()=>{
        const unsubscribe =  onAuthStateChanged(
            auth,
            (currentUser)=>{
                if(currentUser){
                    if(currentUser.emailVerified){
                        setUser(currentUser)
                    } else{
                        setUser(null)
                    }
                }else{
                    setUser(null)
                }
            });
        return unsubscribe
    }, []);

    return(
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}