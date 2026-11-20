import { useState } from 'react'
import {
  /**signinWithGoogle,**/
  signUp,
} from '../firebase/services/auth'
import { useNavigate } from 'react-router-dom'

/** 
function GoogleIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.79-.07-1.55-.2-2.28H12v4.31h5.22a4.46 4.46 0 0 1-1.94 2.93v2.45h3.14c1.84-1.69 2.93-4.18 2.93-7.41Z"
      />
      <path
        fill="#34A853"
        d="M12 21.7c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.7Z"
      />
      <path
        fill="#FBBC05"
        d="M6.54 13.79A5.85 5.85 0 0 1 6.23 12c0-.62.11-1.22.31-1.79V7.68H3.3A9.73 9.73 0 0 0 2.27 12c0 1.57.38 3.05 1.03 4.32l3.24-2.53Z"
      />
      <path
        fill="#EA4335"
        d="M12 6.18c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.27 14.63 2.3 12 2.3a9.74 9.74 0 0 0-8.7 5.38l3.24 2.53C7.31 7.9 9.46 6.18 12 6.18Z"
      />
    </svg>
  )
}
 **/

interface SignupForm {
  name: string
  email: string
  password: string
  confirm: string
}

const inputClasses =
  'w-full bg-white border border-[#E3E0F3] rounded-[10px] px-3.5 py-3 text-[13.5px] text-[#1F1B3A] placeholder-[#A6A1C6] outline-none mb-4 font-inherit transition-colors duration-150 focus:border-[#7C5CFF] focus:ring-4 focus:ring-[#7C5CFF]/10'

const labelClasses = 'block text-[12.5px] font-semibold text-[#443F70] mb-1.5'

export const Signup = () => {
  const [isSubmitting, setSubmitting] = useState(false)
  /**const [isGoogleLoading, setIsGoogleLoading] = useState(false)**/
  const [error, setError] = useState('')

  const [signup, setSignup] = useState<SignupForm>({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })

  const navigate = useNavigate()

  /*
   * GOOGLE SIGNUP / LOGIN
   * Google authentication is handled with a popup.
   */
  /** *
  async function handleGoogleSignin() {
    if (isGoogleLoading) return

    try {
      setError('')
      setIsGoogleLoading(true)
      console.log('Starting Google signup...')

      const user = await signinWithGoogle()

      console.log('Google signup successful:', user)

      
       * Google authentication is complete.
       * signinWithGoogle() also creates the Firestore user
       * document if this is the first login.
       
      navigate('/packPros', { replace: true })
    } catch (err: any) {
      console.error('Google signup failed:', err)
      setError(err.message || 'Unable to sign in with Google.')
    } finally {
      setIsGoogleLoading(false)
    }
  }
  ***/

  /*
   * EMAIL / PASSWORD SIGNUP
   */
  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (isSubmitting) return

    setError('')

    if (signup.password !== signup.confirm) {
      setError('Passwords do not match')
      return
    }

    setSubmitting(true)

    try {
      await signUp(signup.name, signup.email, signup.password)

      /*
       * Account was created. signUp() sends the verification
       * email. Send them to login.
       */
      navigate('/signin', { replace: true })
    } catch (err: any) {
      console.error('Signup error:', err)
      setError(err.message || 'Unable to create account.')
    } finally {
      setSubmitting(false)
    }
  }

  /*
   * UPDATE INPUT
   */
  function updateField(field: keyof SignupForm) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignup((prev) => ({
        ...prev,
        [field]: e.target.value,
      }))
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* left — brand panel */}
      <div className="relative overflow-hidden flex items-center justify-center px-10 py-14 bg-gradient-to-br from-[#171233] to-[#100c26] text-[#EDEBFA]">
        {/* decorative glows */}
        <div className="pointer-events-none absolute -top-32 -right-36 w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.22)_0%,rgba(124,92,255,0)_70%)]" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(91,47,224,0.18)_0%,rgba(91,47,224,0)_70%)]" />

        <div className="relative z-10 w-full max-w-[380px]">
          <div className="w-13 h-13 grid place-items-center rounded-2xl mb-7 bg-gradient-to-br from-[#7C5CFF] to-[#5B2FE0] text-white font-bold text-base tracking-wide shadow-[0_8px_24px_-6px_rgba(124,92,255,0.55)]">
            PP
          </div>

          <h2 className="text-[28px] font-bold leading-tight mb-3.5 text-white">
            Join PacketPros Academy
          </h2>

          <p className="text-sm leading-relaxed text-[#B7AFE0] mb-8">
            Structured lessons, hands-on labs, and career coaching — everything
            you need to become job-ready as a Network Engineer.
          </p>

          <div className="flex flex-col gap-3.5">
            {[
              '5-phase guided roadmap',
              'Real Packet Tracer labs',
              'Resume & interview prep',
              'Private student community',
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2.5 text-[13.5px] text-[#D8D4EF] font-medium"
              >
                <span className="grid place-items-center w-5 h-5 rounded-md bg-[#7C5CFF]/15 text-[#A78BFA] text-[11px] font-bold shrink-0">
                  ✓
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* right — signup form */}
      <div className="flex items-center justify-center px-10 py-14 bg-[#F4F2FB] text-[#1F1B3A]">
        <div className="w-full max-w-[400px]">
          <h1 className="text-[28px] font-bold mb-1.5 text-[#17123A]">
            Create Account
          </h1>
          <p className="text-[#6B6690] text-[13.5px] mb-7">
            Join PacketPros Academy today!
          </p>

          {error && (
            <p className="text-red-500 text-[13px] mb-4 -mt-2">{error}</p>
          )}

          <form onSubmit={handleSignup} className="flex flex-col">
            <label htmlFor="signup-name" className={labelClasses}>
              Full Name
            </label>
            <input
              id="signup-name"
              type="text"
              placeholder="Full Name"
              value={signup.name}
              onChange={updateField('name')}
              required
              className={inputClasses}
            />

            <label htmlFor="signup-email" className={labelClasses}>
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              placeholder="Email"
              value={signup.email}
              onChange={updateField('email')}
              required
              className={inputClasses}
            />

            <label htmlFor="signup-password" className={labelClasses}>
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              placeholder="Password"
              value={signup.password}
              onChange={updateField('password')}
              required
              minLength={6}
              className={inputClasses}
            />

            <label htmlFor="signup-confirm" className={labelClasses}>
              Confirm Password
            </label>
            <input
              id="signup-confirm"
              type="password"
              placeholder="Confirm Password"
              value={signup.confirm}
              onChange={updateField('confirm')}
              required
              minLength={6}
              className={inputClasses}
            />

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full rounded-[10px] py-3.5 mt-1.5 text-[14.5px] font-bold text-white bg-gradient-to-br from-[#7C5CFF] to-[#5B2FE0] shadow-[0_8px_20px_-8px_rgba(124,92,255,0.55)] transition-all duration-150 hover:-translate-y-px hover:shadow-[0_10px_24px_-8px_rgba(124,92,255,0.65)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <span className="flex-1 h-px bg-[#E3E0F3]" />
            <span className="text-xs text-[#A6A1C6]">or continue with</span>
            <span className="flex-1 h-px bg-[#E3E0F3]" />
          </div>
          <p className="text-center text-[12.5px] text-[#6B6690]">
            Already have an account?{' '}
            
             <a href="/signin"
              className="font-semibold text-[#6D3CE8] no-underline hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}