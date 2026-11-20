
import {Socials} from '../constants/constants'
const BG_IMAGE =
  "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=85')"
const youtubeBgUrl = "https://i.imgur.com/5OFebPP.jpeg"
const About = () => {
  return (
    <main className="bg-white text-[#171526]">
    {/**hero */}
      <section className="relative min-h-[700px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: BG_IMAGE }}/>
        <div className="absolute inset-0 bg-[#0D0918]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0918] via-[#0D0918]/88 to-[#0D0918]/65" />
        <div className="absolute -top-48 -right-32 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/15 blur-[150px]" />
        <div className="relative z-10 max-w-[1180px] w-full mx-auto px-6 lg:px-10 py-28">
          <div className="max-w-[850px]">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-sm mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
              <span className="text-[11px] uppercase tracking-[2px] font-semibold text-[#D9D3E4]">
                About PacketPros Academy
              </span>
            </div>
            <h1 className="text-[44px] sm:text-[56px] lg:text-[70px] leading-[1.02] font-bold tracking-[-3px] text-white">
              A better way to
              <br />
              <span className="text-[#A78BFA]">
                learn IT.
              </span>
            </h1>
            <p className="mt-7 max-w-[720px] text-[17px] sm:text-[18px] leading-8 text-[#D5D0DE]">
              PacketPros Academy helps aspiring IT professionals build
              practical skills, develop technical confidence, and prepare
              for real careers in networking, cybersecurity, cloud, and
              IT infrastructure.
            </p>
            <p className="mt-4 max-w-[680px] text-[14px] leading-7 text-[#AAA3B7]">
              We combine structured education, hands-on practice, and
              career preparation to create a clearer path from learning
              technical concepts to becoming job-ready.
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <a
                href="/signup"
                className="px-6 py-3.5 rounded-xl bg-[#7C3AED] text-white text-[13px] font-bold hover:bg-[#6D28D9] transition-colors">
                Start Learning
              </a>

              <a
                href="#mission"
                className="px-6 py-3.5 rounded-xl border border-white/15 bg-white/[0.06] text-white text-[13px] font-bold hover:bg-white/10 transition-colors">
                Why PacketPros?
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 mt-20 border-t border-white/10 pt-8">
            {[
              ['Practical', 'Hands-on learning'],
              ['Structured', 'Clear learning paths'],
              ['Career-Focused', 'Built around real jobs'],
              ['Industry-Based', 'Real-world technology'],
            ].map(([title, text]) => (
              <div
                key={title}
                className="py-4 lg:px-6 first:lg:pl-0 border-white/10 lg:border-l first:border-l-0">
                <div className="text-[15px] font-bold text-white">
                  {title}
                </div>
                <div className="mt-1 text-[12px] text-[#AAA3B7]">
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


     {/**mission */}
      <section
        id="mission"
        className="relative py-24 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: BG_IMAGE }}/>
        <div className="absolute inset-0 bg-white/[0.95]" />
        <div className="relative z-10 max-w-[1180px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-14 lg:gap-24">
            <div>
              <span className="text-[11px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                Our Mission
              </span>
              <h2 className="mt-4 text-[36px] sm:text-[44px] leading-[1.1] font-bold tracking-[-1.8px] text-[#171526]">
                Making IT education
                <br />
                easier to navigate.
              </h2>
              <div className="mt-6 w-12 h-1 rounded-full bg-[#7C3AED]" />
            </div>
            <div className="max-w-[650px]">
              <p className="text-[16px] leading-8 text-[#514C5F]">
                Getting started in IT can be overwhelming. There are
                thousands of courses, certifications, technologies, and
                opinions about what you should learn.
              </p>
              <p className="mt-6 text-[16px] leading-8 text-[#514C5F]">
                PacketPros Academy exists to simplify that process.
                We organize technical education into clear learning paths
                that help students understand what to learn, why it matters,
                and how to apply it.
              </p>
              <p className="mt-6 text-[16px] leading-8 text-[#514C5F]">
                Our focus isn't simply on helping students pass an exam.
                It's on helping them develop the knowledge, practical
                experience, and confidence needed to succeed in the real
                world.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mt-20">
            {[
              {
                number: '01',
                title: 'Learn',
                text: 'Build a strong technical foundation through structured lessons and clear explanations.',
              },
              {
                number: '02',
                title: 'Practice',
                text: 'Turn knowledge into skill through labs, troubleshooting, and realistic scenarios.',
              },
              {
                number: '03',
                title: 'Launch',
                text: 'Use your skills to prepare for certifications, interviews, and your next IT opportunity.',
              },
            ].map((item) => (

              <div
                key={item.number}
                className="rounded-2xl border border-[#E3DFEA] bg-white/90 backdrop-blur-sm p-7 shadow-[0_10px_30px_-25px_rgba(0,0,0,.4)] hover:border-[#C9B8F5] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#7C3AED]">
                    {item.number}
                  </span>
                  <span className="w-8 h-px bg-[#DDD6EA]" />
                </div>
                <h3 className="mt-7 text-[20px] font-bold text-[#201B2E]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-[#696275]">
                  {item.text}
                </p>
              </div>

            ))}

          </div>

        </div>

      </section>


      {/**what i teach */}
      <section className="relative py-24 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: BG_IMAGE }}/>
        <div className="absolute inset-0 bg-[#100B1F]/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#100B1F]/75 via-[#100B1F]/90 to-[#100B1F]" />
        <div className="relative z-10 max-w-[1180px] mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <span className="text-[11px] uppercase tracking-[2px] font-bold text-[#B9A3F4]">
              What We Teach
            </span>
            <h2 className="mt-4 text-[36px] sm:text-[44px] leading-[1.1] font-bold tracking-[-1.8px] text-white">
              Skills that translate
              <br />
              into real-world work.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-[#C2BBCB]">
              Our curriculum focuses on the technologies and skills
              professionals encounter in modern IT environments.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">

            {[
              {
                title: 'Networking',
                text: 'Routing, switching, VLANs, WAN technologies, network architecture, and troubleshooting.',
              },
              {
                title: 'Cybersecurity',
                text: 'Security fundamentals, network protection, threats, vulnerabilities, and defensive practices.',
              },
              {
                title: 'Cloud',
                text: 'Cloud infrastructure, networking, AWS fundamentals, and modern cloud environments.',
              },
              {
                title: 'Wireless',
                text: 'Enterprise wireless concepts, design, troubleshooting, and optimization.',
              },
              {
                title: 'IT Infrastructure',
                text: 'The systems and technologies that support modern organizations and IT operations.',
              },
              {
                title: 'Career Development',
                text: 'Certifications, resumes, technical interviews, job preparation, and career strategy.',
              },
            ].map((item) => (

              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[#171126]/80 backdrop-blur-md p-7 hover:border-[#8B5CF6]/50 hover:bg-[#1C1530]/90 transition-all"
              >

                <div className="w-10 h-10 rounded-xl bg-[#7C3AED]/20 border border-[#8B5CF6]/20 flex items-center justify-center mb-6">

                  <span className="text-[#B9A3F4] font-bold">
                    +
                  </span>

                </div>

                <h3 className="text-[17px] font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-[13px] leading-6 text-[#AAA3B7]">
                  {item.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/**learn with packetpros */}
      <section className="relative py-24 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: BG_IMAGE }}/>
        <div className="absolute inset-0 bg-white/[0.95]" />
        <div className="relative z-10 max-w-[1180px] mx-auto px-6 lg:px-10">
          {/* HEADER */}
          <div className="max-w-[700px] mb-16">
            <span className="text-[11px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
              Learn With PacketPros
            </span>
            <h2 className="mt-4 text-[36px] sm:text-[46px] leading-[1.08] font-bold tracking-[-2px] text-[#171526]">
              More ways to learn,
              <br />
              practice, and grow.
            </h2>
            <p className="mt-5 text-[16px] leading-7 text-[#625D6E] max-w-[650px]">
              PacketPros gives you more than courses. Learn through
              structured education, connect with other IT professionals,
              and discover practical tools and techniques you can use
              in the real world.
            </p>
          </div>


          {/**courses */}
          <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-12 lg:gap-20 items-center">

            <div className="relative">

              <div className="absolute -inset-5 rounded-[30px] bg-[#7C3AED]/10 blur-2xl" />

              <div className="relative rounded-2xl overflow-hidden border border-[#DED8E9] bg-white shadow-[0_25px_70px_-30px_rgba(30,20,50,.35)]">

                <img
                  src="https://i.imgur.com/LgYh2gB.jpeg"
                  alt="PacketPros Academy courses"
                  className="w-full h-auto object-cover"/>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#EEE8FC] text-[#7C3AED] mb-6">
                <span className="font-bold text-lg">
                  01
                </span>
              </div>
              <span className="block text-[11px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                PacketPros Academy
              </span>

              <h3 className="mt-3 text-[30px] sm:text-[36px] leading-[1.1] font-bold tracking-[-1.5px] text-[#171526]">
                Learn at your own pace.
              </h3>

              <p className="mt-5 text-[15px] leading-7 text-[#5F596A]">
                Follow structured courses designed to help you build a
                strong technical foundation and understand the technologies
                used in modern IT environments.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-[#5F596A]">
                From networking fundamentals to advanced concepts, each
                course is designed to help you understand the technology
                and apply it beyond the classroom.
              </p>

              <div className="mt-7 space-y-3">

                {[
                  'Structured learning paths',
                  'Practical networking concepts',
                  'Hands-on labs and exercises',
                  'Career-focused technical training',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EEE8FC] flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] text-[#7C3AED] font-bold">
                        ✓
                      </span>
                    </div>
                    <span className="text-[13px] font-medium text-[#4E485A]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <a
                href="/packetPros"
                className="inline-flex mt-8 px-6 py-3 rounded-xl bg-[#7C3AED] text-white text-[13px] font-bold hover:bg-[#6D28D9] transition-colors">
                Explore Courses
              </a>
            </div>
          </div>
          <div className="h-px bg-[#E5E0EA] my-24" />
          {/**discord */}
          <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#EEE8FC] text-[#7C3AED] mb-6">
                <span className="font-bold text-lg">
                  02
                </span>
              </div>
              <span className="block text-[11px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                TechyChris Community
              </span>
              <h3 className="mt-3 text-[30px] sm:text-[36px] leading-[1.1] font-bold tracking-[-1.5px] text-[#171526]">
                Get professional help
                <br />
                when you need it.
              </h3>

              <p className="mt-5 text-[15px] leading-7 text-[#5F596A]">
                Learning doesn't have to happen alone. Join the PacketPros
                Discord community to ask questions, troubleshoot problems,
                share your progress, and connect with other people building
                careers in IT.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-[#5F596A]">
                When you get stuck, you have a place to ask for help
                instead of spending hours trying to figure everything
                out by yourself.
              </p>

              <div className="mt-7 space-y-3">

                {[
                  'Get help with networking problems',
                  'Ask technical questions',
                  'Connect with other IT professionals',
                  'Share projects and career progress',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#EEE8FC] flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] text-[#7C3AED] font-bold">
                        ✓
                      </span>
                    </div>
                    <span className="text-[13px] font-medium text-[#4E485A]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
              <a
              target='_blank'
                href={Socials.discordLink}
                className="inline-flex mt-8 px-6 py-3 rounded-xl bg-[#171526] text-white text-[13px] font-bold hover:bg-[#29243A] transition-colors">
                Join the Community
              </a>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-5 rounded-[30px] bg-[#7C3AED]/10 blur-2xl" />
              <div className="relative rounded-2xl overflow-hidden border border-[#DED8E9] bg-white shadow-[0_25px_70px_-30px_rgba(30,20,50,.35)]">
                <img
                  src="https://i.imgur.com/4DX0y6g.png"
                  alt="PacketPros Discord community"
                  className="w-full h-auto object-cover"/>
              </div>
            </div>
          </div>


          <div className="h-px bg-[#E5E0EA] my-24" />
          {/**youtube */}
          <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div style={{backgroundImage:`url(${youtubeBgUrl})`}} className="absolute -inset-5 rounded-[30px] bg-[#7C3AED]/10 blur-2xl" />
              <div
                style={{ backgroundImage: `url(${youtubeBgUrl})` }}
                className="relative aspect-video rounded-2xl overflow-hidden border border-[#DED8E9] bg-[#171526] bg-cover bg-center shadow-[0_25px_70px_-30px_rgba(30,20,50,.35)]"          >
                <div className="absolute inset-0 bg-black/30" />         
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-red-400 flex items-center justify-center shadow-lg shadow-purple-950/30">
                      <a
                      aria-label='techychris youtube'
                      target='_blank' 
                      href='https://www.youtube.com/watch?v=cOqJCpOqFHk&t=3s' 
                      className="text-white text-2xl ml-1">
                        ▶
                      </a>
                    </div>
                    <p className="mt-5 text-white font-bold text-[16px]">
                      TechyChris on YouTube
                    </p>
                    <p className="mt-1 text-[#A9A3B2] text-[12px]">
                      Tools • Tips • Networking • IT
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#EEE8FC] text-[#7C3AED] mb-6">
                <span className="font-bold text-lg">
                  03
                </span>
              </div>
              <span className="block text-[11px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                TechyChris Content
              </span>
              <h3 className="mt-3 text-[30px] sm:text-[36px] leading-[1.1] font-bold tracking-[-1.5px] text-[#171526]">
                Learn the tools,
                <br />
                tricks, and concepts.
              </h3>
              <p className="mt-5 text-[15px] leading-7 text-[#5F596A]">
                Not everything needs to be a full course. Our educational
                content breaks down networking concepts, technical tools,
                troubleshooting techniques, and career advice into
                practical lessons you can consume wherever you are.
              </p>

              <p className="mt-4 text-[15px] leading-7 text-[#5F596A]">
                Follow PacketPros on YouTube and other platforms for
                explanations, demonstrations, tips, and technology
                insights designed to help you keep learning.
              </p>

              <div className="mt-7 flex flex-wrap gap-2">

                {[
                  'Networking Tips',
                  'Tools',
                  'Troubleshooting',
                  'IT Career Tips',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-2 rounded-lg bg-[#F1EDF8] text-[11px] font-semibold text-[#665B78]">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                target="_blank"
                href={Socials.youtubeLink}
                className="inline-flex mt-8 px-6 py-3 rounded-xl border border-[#DCD5E7] bg-white text-[#3E344F] text-[13px] font-bold hover:border-[#BBA9E5] hover:text-[#6D28D9] transition-colors">
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
