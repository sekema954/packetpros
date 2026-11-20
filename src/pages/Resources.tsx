import { useState } from 'react'

const resources = [
  {
    icon: '▣',
    type: 'FREE DOWNLOAD',
    title: 'Network Engineer Resume Template',
    description:
      'A professional resume template designed specifically for aspiring Network Engineers and IT professionals.',
    button: 'Get the Resume',
  },
  {
    icon: '⌘',
    type: 'CHEAT SHEET',
    title: 'Subnetting Cheat Sheet',
    description:
      'Quickly understand subnet masks, CIDR notation, usable hosts, network ranges, and subnetting calculations.',
    button: 'Get the Cheat Sheet',
  },
  {
    icon: '◎',
    type: 'INTERVIEW GUIDE',
    title: 'Network Engineer Interview Guide',
    description:
      'Prepare for technical and behavioral interviews with common networking questions and preparation tips.',
    button: 'Get the Guide',
  },
  {
    icon: '↗',
    type: 'ROADMAP PDF',
    title: 'Network Engineer Roadmap',
    description:
      'See exactly what to learn, practice, and build as you work toward your first Network Engineer opportunity.',
    button: 'Get the Roadmap',
  },
]

const blogPosts = [
  {
    category: 'NETWORKING',
    title: 'How to Become a Network Engineer With No Experience',
    description:
      'A practical breakdown of the skills, projects, certifications, and experience you should focus on.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
  },
  {
    category: 'CAREER',
    title: 'What Does a Network Engineer Actually Do?',
    description:
      'Understand what network engineers work on every day and the technologies they use.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=85',
  },
  {
    category: 'TECHNICAL',
    title: 'Subnetting Explained for Beginners',
    description:
      'Learn subnetting without the confusion and understand why it matters in networking.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85',
  },
]

const videos = [
  {
    title: 'How to Start Your Network Engineering Career',
    duration: '12:34',
    image:
      'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&w=1000&q=85',
  },
  {
    title: 'Subnetting Made Simple',
    duration: '18:21',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85',
  },
  {
    title: 'Network Engineer Interview Tips',
    duration: '14:08',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=85',
  },
]

export const Resources = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setSubmitted(true)
  }

  return (
    <div className="bg-[#08050D] text-white overflow-hidden">
      <section className="relative min-h-[650px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2200&q=90')",
          }}/>
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-[#08050D]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08050D] via-[#08050D]/85 to-[#180629]/60" />
        {/* Purple glow */}
        <div className="absolute -top-40 right-0 w-[650px] h-[650px] rounded-full bg-[#7C3AED]/20 blur-[150px]" />
        <div className="absolute bottom-[-200px] left-1/3 w-[600px] h-[500px] rounded-full bg-[#A855F7]/10 blur-[150px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}/>
        <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 lg:px-10 py-28">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.07] border border-white/15 backdrop-blur-md text-[#D8B4FE] text-[10px] font-bold tracking-[2px] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_15px_#A855F7]" />
              PacketPros Resources
            </div>
            <h1 className="mt-7 text-[48px] sm:text-[62px] lg:text-[76px] leading-[.98] tracking-[-3px] font-black">
              Free resources to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] via-[#C084FC] to-[#9333EA]">
                accelerate your career.
              </span>
            </h1>
            <p className="mt-7 text-[16px] sm:text-[18px] leading-8 text-[#C5B9D1] max-w-[650px]">
              Download practical networking resources, career guides,
              interview preparation materials, and technical cheat sheets
              designed to help you become a stronger IT professional.
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <a
                href="#downloads"
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#6D28D9] text-white text-[14px] font-bold shadow-[0_15px_40px_-12px_rgba(124,58,237,.8)] hover:-translate-y-1 transition-all">
                Explore Free Resources →
              </a>
              <a
                href="#newsletter"
                className="inline-flex items-center justify-center px-7 py-4 rounded-xl border border-white/20 bg-white/[0.06] backdrop-blur-md text-white text-[14px] font-semibold hover:bg-white/[0.1] transition-all">
                Get Free Resources
              </a>
            </div>
            <div className="flex flex-wrap gap-x-7 gap-y-3 mt-9 text-[11px] text-[#A99CB5]">
              <span>✓ 100% Free</span>
              <span>✓ Practical Resources</span>
              <span>✓ Career Focused</span>
              <span>✓ No Experience Required</span>
            </div>
          </div>
        </div>
      </section>
      {/**downloads */}
      <section
        id="downloads"
        className="relative py-24 sm:py-28 bg-[#F7F4FA] text-[#181526]">
        <div className="max-w-[1150px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                Free Downloads
              </span>
              <h2 className="mt-4 text-[40px] sm:text-[52px] leading-[1] tracking-[-2.5px] font-black">
                Tools you can
                <br />
                <span className="text-[#7C3AED]">
                  actually use.
                </span>
              </h2>
            </div>
            <p className="text-[13px] leading-6 text-[#6D6675] max-w-[420px]">
              Skip the fluff. These resources are built around the
              technical skills and career decisions aspiring Network
              Engineers actually need.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="group relative rounded-[22px] bg-white border border-[#E3DDE9] p-6 overflow-hidden hover:-translate-y-1 hover:border-[#CDBCE8] hover:shadow-[0_25px_60px_-35px_rgba(76,38,110,.45)] transition-all">
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#7C3AED]/5 blur-2xl group-hover:bg-[#7C3AED]/10 transition-all" />
                <div className="relative">
                  <div className="w-11 h-11 rounded-xl bg-[#F0E9FC] border border-[#E1D5F3] grid place-items-center text-[#7C3AED] font-bold group-hover:bg-[#7C3AED] group-hover:text-white transition-all">
                    {resource.icon}
                  </div>
                  <span className="inline-block mt-6 text-[9px] tracking-[1.6px] uppercase font-bold text-[#8A7A9B]">
                    {resource.type}
                  </span>
                  <h3 className="mt-2 text-[16px] font-extrabold leading-5">
                    {resource.title}
                  </h3>
                  <p className="mt-3 text-[11px] leading-5 text-[#777080]">
                    {resource.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      document
                        .getElementById('newsletter')
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="mt-6 text-[11px] font-bold text-[#7C3AED] group-hover:text-[#5B21B6] transition-colors">
                    {resource.button} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="newsletter"
        className="relative py-24 sm:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=90')",
          }}/>

        <div className="absolute inset-0 bg-[#0B0612]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#130820]/95 via-[#130820]/85 to-[#4C1D95]/60" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#7C3AED]/20 blur-[150px]" />
        <div className="relative z-10 max-w-[1000px] mx-auto px-6 lg:px-10">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.055] backdrop-blur-xl p-8 sm:p-12 lg:p-14">
            <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#C084FC]">
                  Get the Free Roadmap
                </span>
                <h2 className="mt-4 text-[38px] sm:text-[48px] leading-[1.03] tracking-[-2px] font-black">
                  Know exactly what to
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] to-[#9333EA]">
                    {' '}learn next.
                  </span>
                </h2>
                <p className="mt-5 text-[13px] leading-7 text-[#B9ADBF] max-w-[520px]">
                  Get the PacketPros Network Engineer Roadmap delivered
                  directly to your inbox. See the skills, technologies,
                  projects, and career steps you should focus on.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mt-7">
                  {[
                    'Networking fundamentals',
                    'Technical skills',
                    'Hands-on projects',
                    'Career preparation',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-[11px] text-[#D3C8DA]">
                      <span className="w-5 h-5 rounded-full bg-[#7C3AED]/20 border border-[#A855F7]/30 text-[#C084FC] grid place-items-center text-[9px]">
                        ✓
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>


              <div className="rounded-[22px] bg-white p-7 sm:p-8 text-[#181526] shadow-[0_30px_80px_-30px_rgba(0,0,0,.7)]">
                {!submitted ? (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-[#F0E9FC] text-[#7C3AED] grid place-items-center text-xl font-bold">
                      ↗
                    </div>
                    <h3 className="mt-5 text-[21px] font-black">
                      Get the free roadmap
                    </h3>
                    <p className="mt-2 text-[11px] leading-5 text-[#777080]">
                      Enter your email and we'll send you the free
                      Network Engineer Roadmap.
                    </p>
                    <form
                      onSubmit={handleSubmit}
                      className="mt-6">
                      <label className="block text-[10px] font-bold text-[#5F586B] mb-2">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3.5 rounded-xl border border-[#DDD5E5] bg-[#FBFAFD] text-[12px] outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10 transition-all"/>
                      <button
                        type="submit"
                        className="mt-3 w-full py-4 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white text-[12px] font-bold shadow-[0_15px_30px_-15px_rgba(124,58,237,.7)] hover:-translate-y-0.5 transition-all">
                        Send Me the Roadmap →
                      </button>
                    </form>
                    <p className="mt-4 text-center text-[9px] text-[#8A8291]">
                      No spam. Just useful networking and career resources.
                    </p>
                  </>
                ) : (
                  <div className="py-8 text-center">
                    <div className="mx-auto w-14 h-14 rounded-full bg-[#F0E9FC] text-[#7C3AED] grid place-items-center text-xl font-bold">
                      ✓
                    </div>
                    <h3 className="mt-5 text-[22px] font-black">
                      You're on the list.
                    </h3>
                    <p className="mt-3 text-[12px] leading-6 text-[#777080]">
                      Check your inbox for your Network Engineer
                      Roadmap.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/**blog */}
      <section className="relative py-24 sm:py-28 bg-[#F7F4FA] text-[#181526]">
        <div className="max-w-[1150px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                From the Blog
              </span>
              <h2 className="mt-4 text-[38px] sm:text-[50px] tracking-[-2px] font-black">
                Learn beyond
                <span className="text-[#7C3AED]"> the classroom.</span>
              </h2>
            </div>
            <button
              type="button"
              className="text-[11px] font-bold text-[#7C3AED]">
              View All Articles →
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {blogPosts.map((post) => (
              <article
                key={post.title}
                className="group rounded-[22px] overflow-hidden bg-white border border-[#E3DDE9] hover:-translate-y-1 hover:shadow-[0_25px_60px_-35px_rgba(76,38,110,.4)] transition-all">
                <div className="relative h-[210px] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12071F]/60 to-transparent" />
                  <span className="absolute bottom-4 left-5 px-2.5 py-1 rounded-full bg-white/90 text-[#6D28D9] text-[8px] font-bold tracking-[1.2px]">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-[16px] leading-6 font-extrabold">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-[11px] leading-5 text-[#777080]">
                    {post.description}
                  </p>
                  <button
                    type="button"
                    className="mt-5 text-[10px] font-bold text-[#7C3AED]">
                    Read Article →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/**videos */}

      <section className="relative py-24 sm:py-28 bg-[#0B0712] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#7C3AED]/10 blur-[140px]" />
        <div className="relative z-10 max-w-[1150px] mx-auto px-6 lg:px-10">
          <div className="text-center max-w-[700px] mx-auto">
            <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#A855F7]">
              Free Training
            </span>
            <h2 className="mt-4 text-[38px] sm:text-[50px] tracking-[-2px] font-black">
              Watch. Learn.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] to-[#9333EA]">
                Build your skills.
              </span>
            </h2>
            <p className="mt-5 text-[13px] leading-7 text-[#AFA5B7]">
              Get practical networking and career advice through
              free PacketPros training videos.
            </p>
          </div>


          <div className="grid md:grid-cols-3 gap-5 mt-14">
            {videos.map((video) => (
              <div
                key={video.title}
                className="group cursor-pointer">

                <div className="relative aspect-video rounded-[18px] overflow-hidden border border-white/10">

                <img
                    src={video.image}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                  <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-all" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white text-[#7C3AED] grid place-items-center shadow-[0_10px_30px_rgba(0,0,0,.4)] group-hover:scale-110 transition-transform">
                      <span className="ml-1 text-xl">
                        ▶
                      </span>
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/70 text-white text-[9px] font-bold">
                    {video.duration}
                  </span>
                </div>
                <h3 className="mt-4 text-[14px] font-bold text-white">
                  {video.title}
                </h3>
                <p className="mt-2 text-[10px] text-[#82758F]">
                  PacketPros Free Training
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/**academy */}
      <section className="relative py-28 overflow-hidden bg-[#12071F]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=85')",
          }}/>
        <div className="absolute inset-0 bg-gradient-to-b from-[#12071F]/95 via-[#18082A]/90 to-[#12071F]" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#7C3AED]/20 blur-[150px]" />
        <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
          <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#C084FC]">
            Ready to Go Further?
          </span>
          <h2 className="mt-5 text-[40px] sm:text-[56px] leading-[1] tracking-[-2.5px] font-black">
            Free resources are just
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9D5FF] to-[#9333EA]">
              the beginning.
            </span>
          </h2>
          <p className="mt-6 text-[14px] sm:text-[16px] leading-7 text-[#BDB1C9] max-w-[620px] mx-auto">
            If you're ready for a structured path, hands-on labs,
            technical training, and career preparation, take the next
            step with PacketPros Academy.
          </p>
          <a
            href="/packetPros"
            className="mt-9 inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#6D28D9] text-white text-[14px] font-bold shadow-[0_15px_45px_-12px_rgba(124,58,237,.9)] hover:-translate-y-1 transition-all">
            Explore PacketPros Academy →
          </a>
          <p className="mt-5 text-[10px] text-[#82758F]">
            Build skills. Gain confidence. Pursue your career.
          </p>
        </div>
      </section>
    </div>
  )
}