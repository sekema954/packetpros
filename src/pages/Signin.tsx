import { useState } from 'react'
import {
  signIn,
  /**signinWithGoogle,**/
  forgotPassword,
} from '../firebase/services/auth'
import { useNavigate } from 'react-router-dom'


const inputClasses =
  'w-full bg-white/[0.06] border border-white/10 rounded-[10px] px-3.5 py-3 text-[13.5px] text-[#EDEBFA] placeholder-[#6E6893] outline-none mb-4.5 font-inherit transition-colors duration-150 focus:border-[#7C5CFF]'

const labelClasses =
  'block text-[12.5px] font-semibold text-[#D8D4EF] mb-1.5'

export const Signin = () => {
  const [error, setError] = useState('')
  const [resetMessage, setResetMessage] = useState('')

  const [login, setLogin] = useState({
    email: '',
    password: '',
    remember: false,
  })

  /**const [isGoogleLoading, setIsGoogleLoading] =
    useState(false)**/

  const [isLoginLoading, setIsLoginLoading] =
    useState(false)

  const [isResetting, setIsResetting] =
    useState(false)

  const navigate = useNavigate()

  /*
   * GOOGLE LOGIN
   *
  async function handleGoogleSignin() {
    if (isGoogleLoading) return

    try {
      setError('')
      setResetMessage('')
      setIsGoogleLoading(true)

      console.log(
        'Starting Google login...'
      )

      const user = await signinWithGoogle()

      console.log(
        'Google signin successful:',
        user
      )

      navigate('/packetPros', {
        replace: true,
      })
    } catch (err: any) {
      console.error(
        'Google login failed:',
        err
      )

      setError(
        err.message ||
          'Unable to sign in with Google.'
      )
    } finally {
      setIsGoogleLoading(false)
    }
  }
    */

  /*
   * EMAIL / PASSWORD LOGIN
   */
  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    if (isLoginLoading) return

    try {
      setError('')
      setResetMessage('')
      setIsLoginLoading(true)

      const user = await signIn(
        login.email,
        login.password
      )

      console.log(
        'Logged in:',
        user
      )

      navigate('/packetPros', {
        replace: true,
      })
    } catch (err: any) {
      console.error(
        'Login error:',
        err
      )

      setError(
        err.message ||
          'Unable to sign in.'
      )
    } finally {
      setIsLoginLoading(false)
    }
  }

 //Forgot password
  async function handleForgotPassword() {
    if (isResetting) return

    const email = login.email.trim()

    /*
     * User must enter an email first.
     */
    if (!email) {
      setResetMessage('')

      setError(
        'Enter your email address first.'
      )

      return
    }

    try {
      setError('')
      setResetMessage('')
      setIsResetting(true)

      console.log(
        'Sending password reset email...'
      )

      await forgotPassword(email)

      console.log(
        'Password reset email sent.'
      )

      setResetMessage(
        'Password reset email sent! Check your inbox.'
      )
    } catch (err: any) {
      console.error(
        'Password reset error:',
        err
      )

      setError(
        err.message ||
          'Unable to send password reset email.'
      )
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#0F0C24]">

      {/* LEFT — LOGIN FORM */}

      <div className="flex items-center justify-center px-8 py-14 bg-[#0F0C24] text-white">
        <div className="w-full max-w-[400px]">

          <h1 className="text-[30px] font-bold mb-1.5 text-white">
            Welcome Back!
          </h1>

          <p className="text-[#9C96C4] text-[13.5px] mb-7">
            Login to your account
          </p>

          {/* ERROR */}

          {error && (
            <div className="flex items-start gap-2 rounded-[10px] border border-red-400/20 bg-red-400/10 px-3.5 py-3 mb-4">
              <span className="text-red-400 text-sm">
                !
              </span>

              <p className="text-red-400 text-[13px]">
                {error}
              </p>
            </div>
          )}

          {/* SUCCESS */}

          {resetMessage && (
            <div className="flex items-start gap-2 rounded-[10px] border border-green-400/20 bg-green-400/10 px-3.5 py-3 mb-4">
              <span className="text-green-400 text-sm">
                ✓
              </span>

              <p className="text-green-400 text-[13px]">
                {resetMessage}
              </p>
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="flex flex-col"
          >

            {/* EMAIL */}

            <label
              htmlFor="login-email"
              className={labelClasses}
            >
              Email
            </label>

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={login.email}
              onChange={(e) => {
                setLogin({
                  ...login,
                  email: e.target.value,
                })

                /*
                 * Clear reset messages when
                 * user changes the email.
                 */
                setResetMessage('')
              }}
              required
              className={inputClasses}
            />

            {/* PASSWORD */}

            <label
              htmlFor="login-password"
              className={labelClasses}
            >
              Password
            </label>

            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={login.password}
              onChange={(e) =>
                setLogin({
                  ...login,
                  password: e.target.value,
                })
              }
              required
              className={inputClasses}
            />
            {/* REMEMBER / FORGOT */}

            <div className="flex items-center justify-between mb-5.5 text-[12.5px]">
              <label className="flex items-center gap-2 text-[#C9C5E8] cursor-pointer">
                <input
                  type="checkbox"
                  checked={login.remember}
                  onChange={(e) =>
                    setLogin({
                      ...login,
                      remember:
                        e.target.checked,
                    })
                  }
                  className="w-[15px] h-[15px] accent-[#7C5CFF] cursor-pointer"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={
                  handleForgotPassword
                }
                disabled={isResetting}
                className="font-semibold text-[#B7AFE8] bg-transparent border-0 p-0 cursor-pointer hover:underline disabled:opacity-60 disabled:cursor-not-allowed">
                {isResetting
                  ? 'Sending...'
                  : 'Forgot password?'}
              </button>
            </div>
            {/* login */}
            <button
              type="submit"
              disabled={
                isLoginLoading ||
                isResetting
              }
              className="w-full rounded-[10px] py-3.5 text-[14.5px] font-bold text-white bg-gradient-to-br from-[#7C5CFF] to-[#5B2FE0] shadow-[0_8px_20px_-8px_rgba(124,92,255,0.55)] transition-all duration-150 hover:-translate-y-px hover:shadow-[0_10px_24px_-8px_rgba(124,92,255,0.65)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0">
              {isLoginLoading
                ? 'Logging in...'
                : 'Login'}
            </button>
          </form>
          {/* divider */}
          <div className="flex items-center gap-3 my-5">
            <span className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-[#6E6893]">
              or continue with
            </span>
            <span className="flex-1 h-px bg-white/10" />
          </div>
          {/* sign up */}
          <p className="text-center text-[12.5px] text-[#9C96C4]">
            Don't have an account?{' '}
            <a
              href="/signup"
              className="font-semibold text-[#8B6CFF] no-underline hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
      {/* right social proof/ content panel */}
      <div className="hidden md:flex relative overflow-hidden items-center justify-center px-10 py-14 bg-[#F4F2FB] text-[#1F1B3A]">
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -top-28 -left-32 w-[380px] h-[380px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.10)_0%,rgba(124,92,255,0)_70%)]" />
        <div className="relative z-10 w-full max-w-[380px]">
          <div className="w-13 h-13 grid place-items-center rounded-2xl mb-7 bg-gradient-to-br from-[#7C5CFF] to-[#5B2FE0] text-white font-bold text-base tracking-wide shadow-[0_8px_24px_-6px_rgba(124,92,255,0.35)]">
            PP
          </div>
          <h2 className="text-[26px] font-bold leading-tight mb-3.5 text-[#17123A]">
            Pick up right where you left off
          </h2>
          <p className="text-sm leading-relaxed text-[#6B6690] mb-8">
            Your labs, progress, and community are all waiting for you inside PacketPros Academy.
          </p>
          {/* quick stats */}
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-white rounded-xl border border-[#E3E0F3] px-3 py-3.5 text-center shadow-sm">
              <div className="text-lg font-bold text-[#17123A]">
                1,284
              </div>
              <div className="text-[10.5px] text-[#6B6690] mt-0.5">
                Students
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E3E0F3] px-3 py-3.5 text-center shadow-sm">
              <div className="text-lg font-bold text-[#17123A]">
                318
              </div>
              <div className="text-[10.5px] text-[#6B6690] mt-0.5">
                Active now
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E3E0F3] px-3 py-3.5 text-center shadow-sm">
              <div className="text-lg font-bold text-[#17123A]">
                68%
              </div>
              <div className="text-[10.5px] text-[#6B6690] mt-0.5">
                Completion
              </div>
            </div>
          </div>
          {/* TESTIMONIAL */}
          <div className="bg-white rounded-2xl border border-[#E3E0F3] p-5 shadow-sm">
            <p className="text-[13.5px] text-[#443F70] leading-relaxed italic mb-4">
              "The roadmap gave me structure I didn't have on my own. Landed my first NOC role two months after finishing Phase 4."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full grid place-items-center bg-[#7C5CFF]/15 text-[#6D3CE8] text-xs font-bold shrink-0">
                JM
              </div>
              <div>
                <div className="text-[12.5px] font-semibold text-[#17123A]">
                  Jordan M.
                </div>
                <div className="text-[11px] text-[#6B6690]">
                  Hired — Network Technician
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

