import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import WhyPacketPros from '../sections/whypacketPros'
import About from '../sections/About'
import { Book } from 'lucide-react';
const VIDEO_URL =
  'https://storage.googleapis.com/video_bucket_20/Website%20testimonials%20correction.mp4'

export function Icon({
  type,
  size = 24,
}: {
  type: string
  size?: number
}) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (type) {
    case 'roadmap':
      return (
        <svg {...common}>
          <path d="M4 6h16" />
          <path d="M4 12h16" />
          <path d="M4 18h16" />
          <circle cx="7" cy="6" r="1.5" />
          <circle cx="15" cy="12" r="1.5" />
          <circle cx="10" cy="18" r="1.5" />
        </svg>
      )

    case 'lab':
      return (
        <svg {...common}>
          <path d="M9 3h6" />
          <path d="M10 3v6l-5 8.5A2.3 2.3 0 0 0 7 21h10a2.3 2.3 0 0 0 2-3.5L14 9V3" />
          <path d="M8 16h8" />
        </svg>
      )

    case 'career':
      return (
        <svg {...common}>
          <path d="M4 19V5" />
          <path d="M4 5c4-2 8 2 16 0v10c-8 2-12-2-16 0" />
        </svg>
      )

    case 'foundation':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
          <path d="m15 15 3 3" />
        </svg>
      )

    case 'engineering':
      return (
        <svg {...common}>
          <path d="M12 2 5 5v6c0 4.7 2.9 8.4 7 11 4.1-2.6 7-6.3 7-11V5l-7-3Z" />
          <path d="m10 13 2-4 2 2-2 4-2-2Z" />
        </svg>
      )

    case 'realworld':
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 7h6" />
          <path d="M9 11h6" />
          <path d="M9 15h3" />
          <circle cx="16" cy="16" r="2" />
        </svg>
      )

    case 'resume':
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <circle cx="12" cy="9" r="2" />
          <path d="M9 15c.8-1.3 1.8-2 3-2s2.2.7 3 2" />
        </svg>
      )

    case 'launch':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m12 7 3 5-3 5-3-5 3-5Z" />
        </svg>
      )

    case 'play':
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8 5.2v13.6c0 .8.9 1.3 1.6.9l10.2-6.8c.6-.4.6-1.3 0-1.7L9.6 4.3C8.9 3.9 8 4.4 8 5.2Z" />
        </svg>
      )

    case 'arrow':
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      )

    case 'check':
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      )

    default:
      return null
  }
}

export const Home = () => {
  const videoRef = useRef<HTMLDivElement | null>(null)
  const videoElementRef = useRef<HTMLVideoElement | null>(null)

  const [isMuted, setIsMuted] = useState(true)

  const toggleMute = () => {
    if (!videoElementRef.current) return

    videoElementRef.current.muted = !videoElementRef.current.muted
    setIsMuted(videoElementRef.current.muted)
  }

  return (
    /**Hero section */
    <div className="bg-white">
      <section className="relative overflow-hidden min-h-[775px] bg-[#090014]">
         {/**background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        {/* Dark purple overlay */}
        <div className="absolute inset-0 bg-[#10001f]/75" />
        {/* Purple atmospheric glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/10 blur-[140px]" />
        <div className="absolute -bottom-60 right-0 w-[650px] h-[650px] rounded-full bg-[#9333EA]/10 blur-[160px]" />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '55px 55px',
          }}/>
        <div className="relative z-10 w-full max-w-[1250px] mx-auto px-6 lg:px-10 py-20">
          <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">
            {/**hero content */}
            <div className="max-w-[590px]">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.08] border border-white/[0.14] text-[#D7B9FF] text-[12px] font-semibold mb-6 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_12px_#A855F7]" />
                NETWORK ENGINEERING ACADEMY
              </div>
              <h1 className="text-[42px] sm:text-[52px] lg:text-[60px] font-extrabold tracking-[-2px] leading-[1.02] text-white">
                Become
                <br />
                <span className="text-white">
                  Job-Ready for a
                </span>
                <br />
                <span className="bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">
                  Network Engineer Career
                </span>
              </h1>
              <p className="mt-6 text-[15px] md:text-[16px] leading-[1.8] text-[#C9C0DC] max-w-[540px]">
                Learn networking through structured lessons, hands-on labs,
                enterprise experience, and career coaching designed to help
                you confidently pursue your first Network Engineer role.
              </p>
              {/* buttons */}
              <div className="flex flex-wrap gap-3.5 mt-8">
                <Link
                  to="/signup"
                  className="group inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 bg-gradient-to-r from-[#9333EA] to-[#6D28D9] text-white text-[14px] font-bold shadow-[0_10px_30px_-8px_rgba(147,51,234,.8)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_-8px_rgba(147,51,234,.9)]">
                  Enroll Now
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    <Icon type="arrow" size={16} />
                  </span>
                </Link>
                <Link to={"https://api.leadconnectorhq.com/widget/form/eeFl3bbUna9r48PmceIG"}
                  type="button"
                  onClick={() => {
                    videoRef.current?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    })
                  }}
                  className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3.5 border border-[#A855F7]/60 bg-white/[0.05] backdrop-blur-md text-white text-[14px] font-semibold transition-all duration-200 hover:bg-white/[0.1] hover:border-[#C084FC]">
                  <span className="w-6 h-6 rounded-full bg-[#7C3AED] grid place-items-center">
                    <Book/>
                  </span>
                  Apply Now
                </Link>
              </div>
              {/* trust */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-9 text-[12px] text-[#AAA0C0]">
                <div className="flex items-center gap-2">
                  <span className="text-[#C084FC]">
                    <Icon type="check" size={15} />
                  </span>
                  Beginner Friendly
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#C084FC]">
                    <Icon type="check" size={15} />
                  </span>
                  Hands-On Labs
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#C084FC]">
                    <Icon type="check" size={15} />
                  </span>
                  Career Focused
                </div>
              </div>
            </div>
            {/* video */}
            <div
              ref={videoRef}
              className="relative">
              {/* glow behind video */}
              <div className="absolute -inset-5 rounded-[28px] bg-[#7C3AED]/25 blur-3xl" />
              <div className="relative rounded-[18px] overflow-hidden border border-white/[0.16] bg-black shadow-[0_30px_80px_-25px_rgba(0,0,0,.9)]">
                <video
                  ref={videoElementRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full aspect-video object-cover">
                  <source
                    src={VIDEO_URL}
                    type="video/mp4"/>
                  Your browser does not support the video tag.
                </video>
                {/* video overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#090014]/70 via-transparent to-transparent" />
                {/* mute button */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs hover:bg-black/80 transition"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}>
                  {isMuted ? '🔇' : '🔊'}
                </button>
              </div>
              {/* small floating card *
              <div className="absolute -bottom-7 -left-5 hidden sm:flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#E6E0F1] shadow-[0_15px_45px_-15px_rgba(0,0,0,.45)]">
                <div className="w-9 h-9 rounded-lg bg-[#F0E7FF] grid place-items-center text-[#7C3AED]">
                  <Icon type="lab" size={19} />
                </div>
                
                <div>
                  <div className="text-[11px] font-bold text-[#20183C]">
                    Hands-On Learning
                  </div>
                  <div className="text-[10px] text-[#7B7393]">
                    Real networking labs
                  </div>
                </div>
              </div>
              **/}
            </div>
          </div>
        </div>
      </section>
      <WhyPacketPros />
      <About />
      {/**pricing section *
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=90')",
          }}/>
          <div className="absolute inset-0 bg-[#12091F]/80" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#160B27]/90 via-[#241039]/70 to-[#090511]/90" />
          <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/20 blur-[150px]" />
          <div className="absolute -bottom-60 right-0 w-[650px] h-[650px] rounded-full bg-[#A855F7]/15 blur-[170px]" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}/>
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-10">

          <div className="text-center max-w-[700px] mx-auto">
          <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#7C3AED]/15 border border-[#A855F7]/30 text-[10px] uppercase tracking-[2px] font-bold text-[#D8B4FE] backdrop-blur-md">
            Start Your Journey
          </span>
          <h2 className="mt-5 text-[36px] sm:text-[48px] leading-[1.08] font-extrabold tracking-[-2px] text-white">
            Invest in your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#A855F7]">
              career, not just a course.
            </span>
          </h2>
          <p className="mt-5 text-[14px] leading-7 text-[#C9C0D6] max-w-[620px] mx-auto">
            Get the technical training, hands-on practice, and career support
            you need to move from learning networking to pursuing your first
            Network Engineer opportunity.
          </p>
        </div>
    <div className="relative max-w-[1000px] mx-auto mt-14">
      <div className="absolute -inset-8 rounded-[36px] bg-[#7C3AED]/25 blur-3xl" />
      <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white shadow-[0_30px_90px_-35px_rgba(0,0,0,.8)]">
        <div className="h-1.5 bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#C084FC]" />
        <div className="p-8 sm:p-10 lg:p-12">
          <div className="grid lg:grid-cols-[1fr_320px] gap-10 items-center">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#5B21B6] flex items-center justify-center text-white shadow-lg shadow-purple-200">
                  <span className="text-lg">
                    ◆
                  </span>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[2px] font-bold text-[#806F99]">
                    PacketPros Academy
                  </div>
                  <h3 className="mt-1 text-[23px] sm:text-[26px] font-extrabold text-[#181526]">
                    Network Engineer Career Program
                  </h3>
                </div>
              </div>
              <p className="mt-6 text-[14px] leading-7 text-[#676171] max-w-[600px]">
                A complete learning path designed to help you build
                networking fundamentals, develop real troubleshooting
                skills, and prepare for the Network Engineer job market.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7">
                {[
                  'Structured roadmap',
                  'Hands-on labs',
                  'Career focused',
                  'Student community',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-[11px] font-semibold text-[#5F586B]">
                    <span className="w-5 h-5 rounded-full bg-[#F0E9FC] text-[#7C3AED] grid place-items-center text-[10px] font-bold">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[22px] bg-gradient-to-br from-[#F8F5FC] to-[#F1EBF9] border border-[#E2D9EC] p-7">
              <div className="inline-flex px-3 py-1.5 rounded-full bg-white border border-[#DED3EA] text-[9px] uppercase tracking-[1.5px] font-extrabold text-[#6D28D9]">
                Full Program Access
              </div>
              <div className="mt-6">
                <div className="text-[10px] uppercase tracking-[1.5px] font-bold text-[#81778C]">
                  Enrollment
                </div>
                <div className="flex items-end gap-2 mt-2">
                  <span className="text-[46px] leading-none font-black tracking-[-2px] text-[#181526]">
                    $XX
                  </span>
                  <span className="pb-1.5 text-[11px] text-[#81798A]">
                    one-time
                  </span>
                </div>
              </div>
              <p className="mt-4 text-[11px] leading-5 text-[#746C7D]">
                One enrollment. Full access to the PacketPros learning
                experience.
              </p>
              <Link
                to="/signup"
                className="mt-6 w-full flex items-center justify-center py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white text-[13px] font-bold shadow-[0_15px_30px_-15px_rgba(124,58,237,.7)] hover:-translate-y-0.5 hover:shadow-[0_20px_35px_-15px_rgba(124,58,237,.8)] transition-all">
                Enroll Now
              </Link>
              <Link
                to="/contact"
                className="mt-3 w-full flex items-center justify-center py-3.5 rounded-xl bg-white border border-[#DDD5E5] text-[#51485F] text-[11px] font-bold hover:bg-[#FAF8FC] transition-all">
                Have Questions?
              </Link>
              <div className="flex items-center justify-center gap-2 mt-4">
                <span className="text-[#7C3AED] text-[11px]">
                  ✓
                </span>
                <span className="text-[9px] text-[#8A8291]">
                  Start learning at your own pace
                </span>
              </div>
            </div>
          </div>
          <div className="h-px bg-[#ECE7F1] my-10" />
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                  What's Included
                </span>
                <h3 className="mt-2 text-[25px] font-extrabold tracking-[-.8px] text-[#181526]">
                  Everything you need to move forward.
                </h3>
              </div>
              <p className="text-[11px] leading-5 text-[#81798A] max-w-[300px] sm:text-right">
                Built around the skills, tools, and support aspiring
                Network Engineers actually need.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-7">
              {[
                {
                  icon: '▣',
                  title: 'Course Modules',
                  text: 'Structured lessons that take you through the networking roadmap.',
                },
                {
                  icon: '⌘',
                  title: 'Packet Tracer Labs',
                  text: 'Practice configuration, troubleshooting, and network design.',
                },
                {
                  icon: '◈',
                  title: 'Enterprise Scenarios',
                  text: 'Work through realistic networking and troubleshooting situations.',
                },
                {
                  icon: '✓',
                  title: 'Resume Templates',
                  text: 'Professional templates designed for technical IT roles.',
                },
                {
                  icon: '◎',
                  title: 'Interview Preparation',
                  text: 'Prepare for technical questions and real interview scenarios.',
                },
                {
                  icon: '↗',
                  title: 'Career Guidance',
                  text: 'Get direction on applications, positioning, and career strategy.',
                },
                {
                  icon: '◷',
                  title: 'Weekly Office Hours',
                  text: 'Get help, ask questions, and work through difficult concepts.',
                },
                {
                  icon: '♧',
                  title: 'Student Community',
                  text: 'Connect with other students learning and pursuing IT careers.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-[#E7E1ED] bg-[#FBFAFD] p-5 hover:bg-white hover:border-[#CDBCE8] hover:shadow-[0_15px_40px_-25px_rgba(76,38,110,.35)] transition-all">
                  <div className="w-9 h-9 rounded-xl bg-[#F0E9FC] border border-[#E1D5F3] grid place-items-center text-[#7C3AED] text-sm font-bold group-hover:bg-[#7C3AED] group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <h4 className="mt-4 text-[13px] font-bold text-[#272130]">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-[10.5px] leading-5 text-[#777080]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-9 rounded-2xl bg-[#F8F5FC] border border-[#E8E1EF] px-5 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[#7C3AED]">✓</span>
                <span className="text-[10px] font-semibold text-[#686170]">
                  Learn at your own pace
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-[#DDD5E5]" />
                <div className="flex items-center gap-2">
                <span className="text-[#7C3AED]">✓</span>
                <span className="text-[10px] font-semibold text-[#686170]">
                  Practical learning
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-[#DDD5E5]" />
              <div className="flex items-center gap-2">
                <span className="text-[#7C3AED]">✓</span>
                <span className="text-[10px] font-semibold text-[#686170]">
                  Career focused
                </span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-[#DDD5E5]" />
              <div className="flex items-center gap-2">
                <span className="text-[#7C3AED]">✓</span>
                <span className="text-[10px] font-semibold text-[#686170]">
                  Community support
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </section>
    **/}
</div>
  )
}