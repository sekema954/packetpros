import React, { useState } from 'react'
import { Socials } from '../constants/constants'

export const Contact = () => {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)

    const data = {
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      email: formData.get('email'),
      reason: formData.get('reason'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DEV_URL}/api/send-contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message')
      }

      setSubmitted(true)
      form.reset()
    } catch (err) {
      console.error('Contact form error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F7FB] text-[#171526]">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=85')",
        }}
      />

      <div className="absolute inset-0 bg-[#F8F7FB]/95" />

      <div className="absolute -top-48 -right-32 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/10 blur-[140px]" />

      <div className="absolute bottom-[-250px] -left-32 w-[550px] h-[550px] rounded-full bg-[#5B21B6]/10 blur-[140px]" />

      {/* Content */}
      <section className="relative z-10 max-w-[1150px] mx-auto px-6 lg:px-10 py-20 lg:py-28">

        {/* Header */}
        <div className="max-w-[700px]">

          <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#EEE8FC] border border-[#DDD3F2] text-[#6D28D9] text-[10px] uppercase tracking-[2px] font-bold">
            Get In Touch
          </span>

          <h1 className="mt-6 text-[42px] sm:text-[54px] lg:text-[62px] leading-[1.04] font-bold tracking-[-2.5px] text-[#171526]">
            How can we
            <span className="text-[#7C3AED]"> help?</span>
          </h1>

          <p className="mt-6 text-[16px] sm:text-[17px] leading-8 text-[#625D6E] max-w-[650px]">
            Have a question about PacketPros Academy, our courses,
            community, or getting started in IT? Send us a message and
            we'll get back to you.
          </p>

        </div>

        {/* Contact Area */}
        <div className="grid lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-12 mt-14">

          {/* Left Contact Info */}
          <div className="relative overflow-hidden rounded-3xl bg-[#120C20] p-8 lg:p-10 text-white">

            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80')",
              }}
            />

            <div className="absolute inset-0 bg-[#120C20]/85" />

            <div className="relative z-10">

              <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#B9A3F4]">
                Contact PacketPros
              </span>

              <h2 className="mt-4 text-[28px] sm:text-[32px] leading-tight font-bold tracking-[-1px]">
                Let's start a conversation.
              </h2>

              <p className="mt-4 text-[14px] leading-7 text-[#B6AFC0]">
                Whether you're interested in learning, joining the
                community, or simply have a question, we're here to help.
              </p>

              {/* Contact Items */}
              <div className="mt-10 space-y-5">

                {/* Email */}
                <div className="flex gap-4 items-start">

                  <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-[#C4B5FD]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[1.5px] font-bold text-[#8F879B]">
                      Email
                    </p>

                    <a
                      href={`mailto:${Socials.email}`}
                      className="mt-1 block text-[14px] font-medium text-white hover:text-[#C4B5FD] transition-colors"
                    >
                      {Socials.email}
                    </a>
                  </div>

                </div>

                {/* Community */}
                <div className="flex gap-4 items-start">

                  <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-[#C4B5FD]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[1.5px] font-bold text-[#8F879B]">
                      Community
                    </p>

                    <a
                      href={Socials.discordLink}
                      className="mt-1 block text-[14px] font-medium text-white hover:text-[#C4B5FD] transition-colors"
                    >
                      Join the TechyChris Discord
                    </a>
                  </div>

                </div>

                {/* Academy */}
                <div className="flex gap-4 items-start">

                  <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-[#C4B5FD]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M3 10 12 5l9 5-9 5-9-5Z" />
                      <path d="M7 12.5V17c3 2 7 2 10 0v-4.5" />
                      <path d="M21 10v6" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[11px] uppercase tracking-[1.5px] font-bold text-[#8F879B]">
                      Academy
                    </p>

                    <a
                      href="/packetPros"
                      className="mt-1 block text-[14px] font-medium text-white hover:text-[#C4B5FD] transition-colors"
                    >
                      Explore our courses
                    </a>
                  </div>

                </div>

              </div>

              {/* Bottom Message */}
              <div className="mt-12 pt-7 border-t border-white/10">

                <p className="text-[12px] leading-6 text-[#8F879B]">
                  Prefer getting help from the community? Join our Discord
                  and connect with other students and IT professionals.
                </p>

                <a
                  href="/community"
                  className="inline-flex mt-4 text-[12px] font-bold text-[#C4B5FD] hover:text-white transition-colors"
                >
                  Visit the Community →
                </a>

              </div>

            </div>
          </div>

          {/* Right Form */}
          <div className="rounded-3xl bg-white border border-[#E5E0EA] p-7 sm:p-9 lg:p-10 shadow-[0_25px_70px_-35px_rgba(35,20,60,.25)]">

            {!submitted ? (

              <form onSubmit={handleSubmit}>

                {/* First + Last Name */}
                <div className="grid sm:grid-cols-2 gap-5">

                  {/* First Name */}
                  <div>

                    <label
                      htmlFor="firstname"
                      className="block text-[12px] font-bold text-[#393346] mb-2"
                    >
                      First name
                    </label>

                    <input
                      id="firstname"
                      name="firstname"
                      type="text"
                      required
                      placeholder="Chris"
                      className="w-full h-12 rounded-xl border border-[#DED9E6] bg-[#FBFAFD] px-4 text-[13px] text-[#211C2D] outline-none placeholder:text-[#AAA4B2] focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#7C3AED]/10 transition-all"
                    />

                  </div>

                  {/* Last Name */}
                  <div>

                    <label
                      htmlFor="lastname"
                      className="block text-[12px] font-bold text-[#393346] mb-2"
                    >
                      Last name
                    </label>

                    <input
                      id="lastname"
                      name="lastname"
                      type="text"
                      required
                      placeholder="Quashie"
                      className="w-full h-12 rounded-xl border border-[#DED9E6] bg-[#FBFAFD] px-4 text-[13px] text-[#211C2D] outline-none placeholder:text-[#AAA4B2] focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#7C3AED]/10 transition-all"
                    />

                  </div>

                </div>

                {/* Email */}
                <div className="mt-5">

                  <label
                    htmlFor="email"
                    className="block text-[12px] font-bold text-[#393346] mb-2"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full h-12 rounded-xl border border-[#DED9E6] bg-[#FBFAFD] px-4 text-[13px] text-[#211C2D] outline-none placeholder:text-[#AAA4B2] focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#7C3AED]/10 transition-all"
                  />

                </div>

                {/* Reason */}
                <div className="mt-5">

                  <label
                    htmlFor="reason"
                    className="block text-[12px] font-bold text-[#393346] mb-2"
                  >
                    What can we help with?
                  </label>

                  <select
                    id="reason"
                    name="reason"
                    required
                    defaultValue=""
                    className="w-full h-12 rounded-xl border border-[#DED9E6] bg-[#FBFAFD] px-4 text-[13px] text-[#211C2D] outline-none focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#7C3AED]/10 transition-all"
                  >

                    <option value="" disabled>
                      Select an option
                    </option>

                    <option value="Academy / Courses">
                      Academy / Courses
                    </option>

                    <option value="Community / Discord">
                      Community / Discord
                    </option>

                    <option value="Technical Question">
                      Technical Question
                    </option>

                    <option value="Partnership">
                      Partnership
                    </option>

                    <option value="Something Else">
                      Something Else
                    </option>

                  </select>

                </div>

                {/* Message */}
                <div className="mt-5">

                  <label
                    htmlFor="message"
                    className="block text-[12px] font-bold text-[#393346] mb-2">
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-xl border border-[#DED9E6] bg-[#FBFAFD] px-4 py-3.5 text-[13px] leading-6 text-[#211C2D] outline-none placeholder:text-[#AAA4B2] focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#7C3AED]/10 transition-all"
                  />

                </div>

                {/* Error */}
                {error && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-center text-[12px] text-red-600">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 h-12 rounded-xl bg-[#7C3AED] text-white text-[13px] font-bold hover:bg-[#6D28D9] hover:-translate-y-0.5 transition-all shadow-[0_12px_30px_-15px_rgba(124,58,237,.9)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>

                <p className="mt-4 text-center text-[11px] text-[#8A8494]">
                  We typically respond as soon as possible.
                </p>

              </form>

            ) : (

              /* Success State */
              <div className="min-h-[520px] flex flex-col items-center justify-center text-center px-5">

                <div className="w-16 h-16 rounded-2xl bg-[#EEE8FC] flex items-center justify-center">

                  <svg
                    viewBox="0 0 24 24"
                    className="w-7 h-7 text-[#7C3AED]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>

                </div>

                <h2 className="mt-6 text-[27px] font-bold tracking-[-.8px] text-[#171526]">
                  Message received.
                </h2>

                <p className="mt-3 max-w-[430px] text-[14px] leading-7 text-[#696275]">
                  Thanks for reaching out to PacketPros. We've received
                  your message and will get back to you soon.
                </p>

                <a
                  href="/"
                  className="mt-7 inline-flex px-6 py-3 rounded-xl bg-[#7C3AED] text-white text-[13px] font-bold hover:bg-[#6D28D9] transition-colors"
                >
                  Back to Home
                </a>

              </div>

            )}

          </div>

        </div>

        {/* Quick Help */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">

          {/* Academy */}
          <a
            href="/packetPros"
            className="group rounded-2xl border border-[#E4DFEA] bg-white/80 backdrop-blur-sm p-6 hover:border-[#C9B8F5] hover:bg-white transition-all"
          >

            <div className="w-9 h-9 rounded-lg bg-[#EEE8FC] flex items-center justify-center text-[#7C3AED] font-bold">
              01
            </div>

            <h3 className="mt-5 text-[15px] font-bold text-[#211B2E]">
              Looking for courses?
            </h3>
            <p className="mt-2 text-[12px] leading-5 text-[#777081]">
              Explore the PacketPros Academy and find the right learning path.
            </p>
            <span className="inline-block mt-4 text-[11px] font-bold text-[#7C3AED]">
              Explore Academy →
            </span>
          </a>

          {/* Discord */}
          <a
            href={Socials.discordLink}
            className="group rounded-2xl border border-[#E4DFEA] bg-white/80 backdrop-blur-sm p-6 hover:border-[#C9B8F5] hover:bg-white transition-all">
            <div className="w-9 h-9 rounded-lg bg-[#EEE8FC] flex items-center justify-center text-[#7C3AED] font-bold">
              02
            </div>
            <h3 className="mt-5 text-[15px] font-bold text-[#211B2E]">
              Need technical help?
            </h3>
            <p className="mt-2 text-[12px] leading-5 text-[#777081]">
              Join the community and connect with other IT learners.
            </p>
            <span className="inline-block mt-4 text-[11px] font-bold text-[#7C3AED]">
              Join Discord →
            </span>
          </a>
          {/* Resources */}
          <a
            href="/resources"
            className="group rounded-2xl border border-[#E4DFEA] bg-white/80 backdrop-blur-sm p-6 hover:border-[#C9B8F5] hover:bg-white transition-all">

            <div className="w-9 h-9 rounded-lg bg-[#EEE8FC] flex items-center justify-center text-[#7C3AED] font-bold">
              03
            </div>
            <h3 className="mt-5 text-[15px] font-bold text-[#211B2E]">
              Looking for resources?
            </h3>
            <p className="mt-2 text-[12px] leading-5 text-[#777081]">
              Browse tools, guides, and other resources for your IT journey.
            </p>
            <span className="inline-block mt-4 text-[11px] font-bold text-[#7C3AED]">
              View Resources →
            </span>
          </a>
        </div>
      </section>
    </main>
  )
}