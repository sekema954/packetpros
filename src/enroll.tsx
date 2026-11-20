import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Enroll = () => {
  const [step, setStep] = useState(1)

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [agreed, setAgreed] = useState(false)

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      if (!fullName.trim()) {
        alert('Please enter your full name.')
        return
      }

      if (!email.trim()) {
        alert('Please enter your email address.')
        return
      }

      setStep(2)
      return
    }

    if (step === 2) {
      if (!agreed) {
        alert('Please agree to the enrollment terms.')
        return
      }

      setStep(3)
      return
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleStripeCheckout = async () => {
    /*
      STRIPE WILL GO HERE.

      Example:

      const response = await fetch(
        'YOUR_BACKEND_URL/api/create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: fullName,
            email,
          }),
        }
      )

      const data = await response.json()

      window.location.href = data.url
    */

    console.log('Stripe checkout:', {
      fullName,
      email,
    })
  }

  return (
    <div className="min-h-screen bg-[#08040D] text-white">
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-[#08040D]/90" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#18062C]/80 via-[#08040D]/80 to-[#050308]/95" />
        <div className="absolute -top-40 left-1/4 w-[650px] h-[650px] rounded-full bg-[#7C3AED]/20 blur-[160px]" />
        <div className="absolute -bottom-60 right-0 w-[600px] h-[600px] rounded-full bg-[#A855F7]/10 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-[1150px] mx-auto px-6 lg:px-10 py-20">

          <Link
            to="/academy"
            className="inline-flex items-center gap-2 text-[12px] text-[#AFA3B8] hover:text-white transition"
          >
            ← Back to PacketPros Academy
          </Link>

          <div className="mt-12 max-w-[750px]">

            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.07] border border-white/[0.12] text-[#D8B4FE] text-[10px] font-bold tracking-[1.8px] uppercase backdrop-blur-md">

              <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_12px_#A855F7]" />

              PacketPros Academy

            </div>

            <h1 className="mt-6 text-[42px] sm:text-[58px] lg:text-[68px] leading-[.98] tracking-[-3px] font-black">

              Start your
              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#9333EA]">
                Network Engineer
              </span>

              <br />

              journey.

            </h1>

            <p className="mt-6 text-[15px] sm:text-[17px] leading-8 text-[#C5BBCF] max-w-[650px]">
              Enroll in PacketPros Academy and follow a structured path
              from networking fundamentals to practical engineering skills
              and career preparation.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          CHECKOUT AREA
      ===================================================== */}

      <section className="relative py-20 sm:py-28 bg-[#F8F6FB] text-[#181526]">

        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-[1fr_390px] gap-10 lg:gap-14 items-start">

            {/* =================================================
                LEFT — STEPS
            ================================================= */}

            <div>

              {/* STEP INDICATOR */}

              <div className="flex items-center max-w-[600px] mb-10">

                {/* STEP 1 */}

                <div className="flex items-center gap-3">

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                      step >= 1
                        ? 'bg-[#7C3AED] text-white'
                        : 'bg-[#EAE4F0] text-[#81798A]'
                    }`}
                  >
                    {step > 1 ? '✓' : '1'}
                  </div>

                  <span
                    className={`hidden sm:block text-[11px] font-bold ${
                      step >= 1
                        ? 'text-[#292231]'
                        : 'text-[#918899]'
                    }`}
                  >
                    Information
                  </span>

                </div>


                <div
                  className={`h-px flex-1 mx-4 transition-all ${
                    step >= 2
                      ? 'bg-[#7C3AED]'
                      : 'bg-[#DDD5E5]'
                  }`}
                />


                {/* STEP 2 */}

                <div className="flex items-center gap-3">

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                      step >= 2
                        ? 'bg-[#7C3AED] text-white'
                        : 'bg-[#EAE4F0] text-[#81798A]'
                    }`}
                  >
                    {step > 2 ? '✓' : '2'}
                  </div>

                  <span
                    className={`hidden sm:block text-[11px] font-bold ${
                      step >= 2
                        ? 'text-[#292231]'
                        : 'text-[#918899]'
                    }`}
                  >
                    Review
                  </span>

                </div>


                <div
                  className={`h-px flex-1 mx-4 transition-all ${
                    step >= 3
                      ? 'bg-[#7C3AED]'
                      : 'bg-[#DDD5E5]'
                  }`}
                />


                {/* STEP 3 */}

                <div className="flex items-center gap-3">

                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                      step >= 3
                        ? 'bg-[#7C3AED] text-white'
                        : 'bg-[#EAE4F0] text-[#81798A]'
                    }`}
                  >
                    3
                  </div>

                  <span
                    className={`hidden sm:block text-[11px] font-bold ${
                      step >= 3
                        ? 'text-[#292231]'
                        : 'text-[#918899]'
                    }`}
                  >
                    Payment
                  </span>

                </div>

              </div>


              {/* TITLE */}

              <div className="mb-8">

                <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                  {step === 1 && 'Step 1 of 3'}
                  {step === 2 && 'Step 2 of 3'}
                  {step === 3 && 'Step 3 of 3'}
                </span>

                <h2 className="mt-3 text-[32px] sm:text-[40px] tracking-[-1.5px] font-black">

                  {step === 1 && "Let's get you started."}

                  {step === 2 && 'Review your enrollment.'}

                  {step === 3 && 'Complete your enrollment.'}

                </h2>

                <p className="mt-3 text-[13px] leading-6 text-[#756D7E]">

                  {step === 1 &&
                    "Tell us a little about yourself so we can create your student account."}

                  {step === 2 &&
                    "Make sure everything looks correct before continuing to secure payment."}

                  {step === 3 &&
                    "Your payment will be securely processed through Stripe."}

                </p>

              </div>


              {/* =================================================
                  STEP 1
              ================================================= */}

              {step === 1 && (

                <form
                  onSubmit={handleNext}
                  className="rounded-[26px] bg-white border border-[#E4DDEA] shadow-[0_25px_70px_-40px_rgba(45,20,75,.35)] p-7 sm:p-9"
                >

                  <h3 className="text-[16px] font-extrabold">
                    Your information
                  </h3>

                  <p className="mt-1 text-[11px] text-[#81798A]">
                    We'll use this information for your PacketPros account.
                  </p>


                  {/* NAME */}

                  <div className="mt-7">

                    <label className="block text-[11px] font-bold text-[#40394A] mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full h-12 px-4 rounded-xl border border-[#DDD5E5] bg-[#FBFAFD] text-[13px] outline-none focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#7C3AED]/10 transition"
                    />

                  </div>


                  {/* EMAIL */}

                  <div className="mt-5">

                    <label className="block text-[11px] font-bold text-[#40394A] mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-12 px-4 rounded-xl border border-[#DDD5E5] bg-[#FBFAFD] text-[13px] outline-none focus:border-[#8B5CF6] focus:ring-4 focus:ring-[#7C3AED]/10 transition"
                    />

                  </div>


                  <button
                    type="submit"
                    className="mt-8 w-full h-14 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#5B21B6] text-white text-[13px] font-bold shadow-[0_15px_35px_-15px_rgba(124,58,237,.75)] hover:-translate-y-0.5 transition-all"
                  >
                    Continue to Review →
                  </button>

                </form>

              )}


              {/* =================================================
                  STEP 2
              ================================================= */}

              {step === 2 && (

                <form
                  onSubmit={handleNext}
                  className="rounded-[26px] bg-white border border-[#E4DDEA] shadow-[0_25px_70px_-40px_rgba(45,20,75,.35)] p-7 sm:p-9"
                >

                  <h3 className="text-[16px] font-extrabold">
                    Enrollment information
                  </h3>


                  {/* USER DETAILS */}

                  <div className="mt-6 rounded-2xl bg-[#F8F5FC] border border-[#E6DEED] p-5">

                    <div className="flex justify-between gap-5">

                      <div>

                        <div className="text-[9px] uppercase tracking-[1.5px] font-bold text-[#8A8193]">
                          Student
                        </div>

                        <div className="mt-1 text-[13px] font-bold text-[#292231]">
                          {fullName}
                        </div>

                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-[10px] font-bold text-[#7C3AED] hover:text-[#5B21B6]"
                      >
                        Edit
                      </button>

                    </div>


                    <div className="mt-4">

                      <div className="text-[9px] uppercase tracking-[1.5px] font-bold text-[#8A8193]">
                        Email
                      </div>

                      <div className="mt-1 text-[12px] text-[#514A59]">
                        {email}
                      </div>

                    </div>

                  </div>


                  {/* PROGRAM */}

                  <div className="mt-6">

                    <div className="text-[9px] uppercase tracking-[1.5px] font-bold text-[#8A8193]">
                      Program
                    </div>

                    <div className="mt-2 text-[18px] font-black">
                      Network Engineer Career Program
                    </div>

                    <p className="mt-2 text-[11px] leading-5 text-[#777080]">
                      Full access to the PacketPros Academy learning
                      experience.
                    </p>

                  </div>


                  {/* PRICE */}

                  <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#E3DBEA] p-5">

                    <span className="text-[12px] font-bold">
                      Total Enrollment
                    </span>

                    <span className="text-[28px] font-black">
                      $XX
                    </span>

                  </div>


                  {/* TERMS */}

                  <label className="mt-7 flex items-start gap-3 cursor-pointer">

                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#7C3AED]"
                    />

                    <span className="text-[10.5px] leading-5 text-[#756D7E]">
                      I agree to the PacketPros Academy enrollment
                      terms and understand that payment will be
                      processed securely through Stripe.
                    </span>

                  </label>


                  {/* BUTTONS */}

                  <div className="flex gap-3 mt-8">

                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-[35%] h-14 rounded-xl border border-[#DDD5E5] bg-white text-[#5E5668] text-[12px] font-bold hover:bg-[#FAF8FC] transition"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      className="flex-1 h-14 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#5B21B6] text-white text-[13px] font-bold shadow-[0_15px_35px_-15px_rgba(124,58,237,.75)] hover:-translate-y-0.5 transition-all"
                    >
                      Continue to Payment →
                    </button>

                  </div>

                </form>

              )}


              {/* =================================================
                  STEP 3
              ================================================= */}

              {step === 3 && (

                <div className="rounded-[26px] bg-white border border-[#E4DDEA] shadow-[0_25px_70px_-40px_rgba(45,20,75,.35)] p-7 sm:p-9">

                  <div className="w-16 h-16 rounded-2xl bg-[#F0E9FC] text-[#7C3AED] flex items-center justify-center text-2xl mx-auto">
                    🔒
                  </div>

                  <div className="text-center mt-6">

                    <h3 className="text-[22px] font-black">
                      Secure Stripe Checkout
                    </h3>

                    <p className="mt-3 text-[12px] leading-6 text-[#777080] max-w-[500px] mx-auto">
                      You're ready to complete your enrollment.
                      Click below to continue to Stripe's secure
                      payment page.
                    </p>

                  </div>


                  {/* PAYMENT SUMMARY */}

                  <div className="mt-8 rounded-2xl bg-[#F8F5FC] border border-[#E6DEED] p-5">

                    <div className="flex justify-between items-center">

                      <div>

                        <div className="text-[9px] uppercase tracking-[1.5px] font-bold text-[#8A8193]">
                          Program
                        </div>

                        <div className="mt-1 text-[13px] font-bold">
                          Network Engineer Career Program
                        </div>

                      </div>

                      <div className="text-[25px] font-black">
                        $XX
                      </div>

                    </div>

                  </div>


                  {/* STRIPE BUTTON */}

                  <button
                    type="button"
                    onClick={handleStripeCheckout}
                    className="mt-7 w-full h-14 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#5B21B6] text-white text-[13px] font-bold shadow-[0_15px_35px_-15px_rgba(124,58,237,.75)] hover:-translate-y-0.5 transition-all"
                  >
                    Proceed to Secure Payment →
                  </button>


                  <button
                    type="button"
                    onClick={handleBack}
                    className="mt-3 w-full h-12 rounded-xl border border-[#DDD5E5] bg-white text-[#5E5668] text-[11px] font-bold hover:bg-[#FAF8FC] transition"
                  >
                    ← Back
                  </button>


                  <div className="flex items-center justify-center gap-2 mt-6">

                    <span className="text-[11px]">
                      🔒
                    </span>

                    <span className="text-[9px] text-[#8A8291]">
                      Secure payment powered by Stripe
                    </span>

                  </div>

                </div>

              )}

            </div>


            {/* =================================================
                RIGHT — PROGRAM SUMMARY
            ================================================= */}

            <div className="lg:sticky lg:top-24">

              <div className="rounded-[26px] overflow-hidden bg-white border border-[#E4DDEA] shadow-[0_25px_70px_-40px_rgba(45,20,75,.4)]">

                <div className="relative h-[170px] overflow-hidden">

                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85"
                    alt="Technology"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#160A22] via-[#160A22]/50 to-transparent" />

                  <div className="absolute bottom-5 left-6">

                    <span className="text-[9px] uppercase tracking-[2px] font-bold text-[#D8B4FE]">
                      PacketPros Academy
                    </span>

                    <h3 className="mt-1 text-[20px] font-black text-white">
                      Network Engineer Career Program
                    </h3>

                  </div>

                </div>


                <div className="p-7">

                  <div className="flex items-end justify-between">

                    <div>

                      <div className="text-[9px] uppercase tracking-[1.5px] font-bold text-[#81798A]">
                        Enrollment
                      </div>

                      <div className="mt-1 text-[44px] leading-none font-black tracking-[-2px]">
                        $XX
                      </div>

                    </div>

                    <span className="pb-1 text-[10px] text-[#81798A]">
                      one-time
                    </span>

                  </div>


                  <div className="h-px bg-[#ECE7F1] my-6" />


                  <h4 className="text-[12px] font-extrabold">
                    Your enrollment includes
                  </h4>


                  <div className="mt-5 space-y-3.5">

                    {[
                      'Structured networking curriculum',
                      'Hands-on Packet Tracer labs',
                      'Real-world troubleshooting',
                      'Technical resume guidance',
                      'Interview preparation',
                      'Career strategy',
                      'Student community',
                      'Learn at your own pace',
                    ].map((item) => (

                      <div
                        key={item}
                        className="flex items-center gap-3"
                      >

                        <span className="w-5 h-5 shrink-0 rounded-full bg-[#F0E9FC] text-[#7C3AED] grid place-items-center text-[9px] font-bold">
                          ✓
                        </span>

                        <span className="text-[10.5px] text-[#686170]">
                          {item}
                        </span>

                      </div>

                    ))}

                  </div>


                  <div className="mt-7 rounded-xl bg-[#F8F5FC] border border-[#E7E0EF] p-4">

                    <div className="flex items-start gap-3">

                      <div className="w-8 h-8 rounded-lg bg-white border border-[#E1D7EB] flex items-center justify-center">
                        🔒
                      </div>

                      <div>

                        <div className="text-[10px] font-bold text-[#41394B]">
                          Secure enrollment
                        </div>

                        <p className="mt-1 text-[9px] leading-4 text-[#81798A]">
                          Payment information is securely processed
                          through Stripe.
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>


              <div className="mt-5 text-center">

                <p className="text-[10px] text-[#81798A]">
                  Have questions before enrolling?
                </p>

                <Link
                  to="/contact"
                  className="inline-block mt-1 text-[11px] font-bold text-[#7C3AED] hover:text-[#5B21B6]"
                >
                  Contact PacketPros →
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHAT HAPPENS NEXT
      ===================================================== */}

      <section className="relative py-20 bg-[#100719] overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=80')",
          }}
        />

        <div className="absolute inset-0 bg-[#100719]/85" />

        <div className="relative z-10 max-w-[950px] mx-auto px-6">

          <div className="text-center">

            <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#C084FC]">
              What Happens Next
            </span>

            <h2 className="mt-4 text-[32px] sm:text-[42px] tracking-[-1.5px] font-black">
              You're closer than you think.
            </h2>

          </div>


          <div className="grid md:grid-cols-3 gap-5 mt-12">

            {[
              {
                number: '01',
                title: 'Complete Enrollment',
                text: 'Enter your information and complete your secure Stripe payment.',
              },
              {
                number: '02',
                title: 'Create Your Account',
                text: 'Receive access instructions for your PacketPros student account.',
              },
              {
                number: '03',
                title: 'Start Learning',
                text: 'Enter the Academy, follow the roadmap, and begin building your skills.',
              },
            ].map((stepItem) => (

              <div
                key={stepItem.number}
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-6"
              >

                <div className="text-[28px] font-black text-[#7C3AED]">
                  {stepItem.number}
                </div>

                <h3 className="mt-4 text-[14px] font-bold">
                  {stepItem.title}
                </h3>
                <p className="mt-2 text-[11px] leading-5 text-[#AFA5B7]">
                  {stepItem.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-20 bg-[#08040D] text-center overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 -top-40 w-[600px] h-[400px] rounded-full bg-[#7C3AED]/15 blur-[140px]" />

        <div className="relative z-10 max-w-[700px] mx-auto px-6">
          <h2 className="text-[32px] sm:text-[44px] tracking-[-2px] font-black">
            Build the skills.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#7C3AED]">
              Pursue the career.
            </span>
          </h2>
          <p className="mt-4 text-[12px] leading-6 text-[#8F849A]">
            Your Network Engineer journey starts with the right roadmap.
          </p>
        </div>
      </section>
    </div>
  )
}