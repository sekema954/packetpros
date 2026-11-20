import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../firebase/services/auth'

export const ForgotPassword = () => {
const [email, setEmail] = useState('')
const [loading, setLoading] = useState(false)
const [message, setMessage] = useState('')
const [error, setError] = useState('')

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
) => {
  e.preventDefault()
  setMessage('')
  setError('')

  if (!email.trim()) {
    setError('Please enter your email address.')
    return
  }

  try {
    setLoading(true)
    await forgotPassword(email)
    setMessage(
      'If an account exists with this email, a password reset link has been sent.'
    )

    setEmail('')
  } catch (error) {
    if (error instanceof Error) {
      setError(error.message)
    } else {
      setError(
        'Unable to send password reset email.'
      )
    }
  } finally {
    setLoading(false)
  }
}

return (
    <div className="min-h-screen bg-[#08050D] text-white flex items-center justify-center px-5 py-20 relative overflow-hidden">
    {/** Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#12071F] via-[#08050D] to-[#0D0615]" />
    <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-[#7C3AED]/20 blur-[160px]" />
    <div className="absolute bottom-[-250px] left-[-150px] w-[500px] h-[500px] rounded-full bg-[#A855F7]/10 blur-[150px]" />

    {/** Grid */}
    <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
        backgroundImage: `
            linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        }}
    />

    <div className="relative z-10 w-full max-w-[450px]">
        {/** Card */}
        <div className="rounded-[28px] border border-white/[0.1] bg-white/[0.045] backdrop-blur-2xl shadow-[0_30px_100px_-30px_rgba(0,0,0,.8)] p-7 sm:p-9">
        {/** Logo */}
        <div className="flex justify-center mb-8">
            <Link
            to="/"
            className="text-[20px] font-black tracking-[-.5px] text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#9333EA]"
            >
            PacketPros
            </Link>
        </div>

        {/** Heading */}
        <div className="text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-[#7C3AED]/15 border border-[#A855F7]/25 flex items-center justify-center text-[#C084FC] text-2xl shadow-[0_0_30px_rgba(168,85,247,.15)]">
            🔑
            </div>

            <h1 className="mt-6 text-[30px] sm:text-[34px] font-black tracking-[-1px]">
            Forgot your password?
            </h1>

            <p className="mt-3 text-[13px] leading-6 text-[#9F94A8]">
            Enter your email address and we'll send you a link to reset your
            password.
            </p>
        </div>

        {/** Form */}
        <form onSubmit={handleSubmit} className="mt-8">
            <label className="block text-[11px] font-bold text-[#C9BFCE] mb-2">
            Email Address
            </label>

            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            className="w-full h-13 px-4 rounded-xl bg-black/20 border border-white/[0.1] text-white text-[13px] placeholder:text-[#6F6577] outline-none focus:border-[#A855F7]/60 focus:bg-white/[0.05] transition-all"
            />

            {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-[11px] leading-5 text-red-300">
                {error}
            </div>
            )}

            {message && (
            <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-[11px] leading-5 text-emerald-300">
                {message}
            </div>
            )}

            <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full h-13 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#6D28D9] text-white text-[13px] font-bold shadow-[0_12px_35px_-12px_rgba(147,51,234,.8)] hover:-translate-y-0.5 hover:shadow-[0_15px_40px_-10px_rgba(147,51,234,.95)] disabled:opacity-50 disabled:hover:translate-y-0 transition-all"
            >
            {loading ? 'Sending reset link...' : 'Send Reset Link →'}
            </button>
        </form>

        {/** Back to login */}
        <div className="mt-7 text-center">
            <Link
            to="/signin"
            className="text-[12px] font-semibold text-[#B9A9C7] hover:text-[#C084FC] transition-colors"
            >
            ← Back to Sign In
            </Link>
        </div>
        </div>
        {/** Footer */}
        <p className="mt-6 text-center text-[10px] text-[#655C6C]">
        © 2026 PacketPros. All rights reserved.
        </p>
    </div>
    </div>
)
}

export default ForgotPassword