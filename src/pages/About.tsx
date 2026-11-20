import { Socials } from "../constants/constants"
import chris from '../assets/images/chris.jpg'
export const About = () => {
  return (
    <main className="bg-[#F7F5FB] text-[#181526] overflow-hidden">
      <section className="relative min-h-[680px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=85')",
          }} />
        {/* Readability overlays */}
        <div className="absolute inset-0 bg-[#0B0715]/68" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0715]/95 via-[#0B0715]/72 to-[#0B0715]/38" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0715] via-transparent to-[#0B0715]/25" />
        {/* Purple ambient glow */}
        <div className="absolute -top-48 -left-40 w-[600px] h-[600px] rounded-full bg-[#7C3AED]/20 blur-[150px]" />
        <div className="absolute bottom-[-300px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[#5B21B6]/20 blur-[150px]" />
        <div className="relative z-10 max-w-[1200px] mx-auto w-full px-6 lg:px-10 py-24">
          <div className="max-w-[780px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/15 bg-white/[0.07] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#A78BFA] shadow-[0_0_12px_#A78BFA]" />
              <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#DDD4F0]">
                About PacketPros
              </span>
            </div>
            {/* Heading */}
            <h1 className="mt-7 text-[43px] sm:text-[55px] lg:text-[66px] leading-[1.02] font-extrabold tracking-[-3px] text-white">
              Building better
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#DDD0FF] via-[#A78BFA] to-[#7C3AED]">
                IT professionals.
              </span>

            </h1>


            {/* Description */}
            <p className="mt-7 text-[16px] sm:text-[18px] leading-8 text-[#D4CEDC] max-w-[690px]">
              PacketPros is an IT education platform built to help
              aspiring technology professionals develop practical skills,
              gain confidence, and prepare for real careers in networking,
              cybersecurity, cloud, and IT infrastructure.
            </p>
            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mt-9">
              <a
                href="/packetPros"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#7C3AED] text-white text-[13px] font-bold hover:bg-[#6D28D9] hover:-translate-y-0.5 transition-all">
                Explore the Academy
              </a>
              <a
                href={Socials.discordLink}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-white/15 bg-white/[0.07] backdrop-blur-md text-white text-[13px] font-bold hover:bg-white/10 transition-all">
                Join the Community
              </a>
            </div>
          </div>
          {/* Hero information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-20">
            {[
              ['Practical', 'Hands-on learning'],
              ['Career', 'Focused education'],
              ['Community', 'Learn together'],
              ['IT', 'Built for the industry'],
            ].map(([title, text]) => (

              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-black/25 backdrop-blur-md px-5 py-5">
                <div className="text-[18px] font-extrabold text-white">
                  {title}
                </div>
                <div className="mt-1 text-[11px] text-[#B1A9BB]">
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =========================================================
          WHO WE ARE
      ========================================================= */}
      <section className="relative py-24 bg-white overflow-hidden">

        {/* Subtle background image */}
        <div
          className="absolute right-0 top-0 w-[42%] h-full bg-cover bg-center opacity-[0.09]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/93 to-white/70" />


        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-16 items-start">

            {/* Left */}
            <div>

              <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                Who We Are
              </span>

              <h2 className="mt-4 text-[36px] sm:text-[44px] leading-[1.08] font-extrabold tracking-[-1.8px]">
                Education built around
                <br />
                the real world.
              </h2>

              <div className="mt-6 w-14 h-1 rounded-full bg-[#7C3AED]" />

            </div>


            {/* Right */}
            <div className="text-[15px] leading-8 text-[#625D6D]">

              <p>
                PacketPros was created around a simple idea: learning IT
                should prepare you for more than just passing an exam.
              </p>

              <p className="mt-5">
                Certifications can help open doors, but successful IT
                professionals also need to understand how technology
                works in real environments, how to troubleshoot problems,
                and how to communicate their knowledge.
              </p>

              <p className="mt-5">
                That's why PacketPros focuses on practical education.
                Our courses, labs, resources, community, and content are
                designed to help learners move from understanding a
                concept to actually being able to use it.
              </p>

              <p className="mt-5">
                Whether you're preparing for your first networking role,
                working toward a certification, or expanding your
                technical skill set, PacketPros is designed to give you
                a clearer path forward.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          MISSION
      ========================================================= */}
      <section className="relative min-h-[470px] flex items-center overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-[#100B20]/70" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#100B20]/90 via-[#100B20]/68 to-[#100B20]/45" />

        <div className="absolute -top-40 right-[-100px] w-[550px] h-[550px] rounded-full bg-[#7C3AED]/20 blur-[140px]" />


        <div className="relative z-10 max-w-[1000px] mx-auto px-6 py-24 text-center">

          <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#B9A3F4]">
            Our Mission
          </span>

          <h2 className="mt-5 text-[36px] sm:text-[48px] leading-tight font-extrabold tracking-[-2px] text-white">
            Make technology education
            <br />
            more practical and accessible.
          </h2>

          <p className="mt-6 text-[15px] leading-8 text-[#D0C8D8] max-w-[700px] mx-auto">
            We believe aspiring IT professionals shouldn't have to piece
            together their education from hundreds of disconnected
            resources. PacketPros brings structured learning, practical
            experience, community support, and career preparation together
            in one place.
          </p>

        </div>

      </section>


      {/* =========================================================
          BY THE NUMBERS (small connective section)
      ========================================================= */}
      <section className="relative py-14 bg-white overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E7E1EF]">
            {[
              ['40+', 'Learners supported'],
              ['10+', 'Hands-on labs'],
              ['5', 'Certification tracks'],
              ['24/7', 'Community access'],
            ].map(([stat, label]) => (
              <div key={label} className="text-center px-4 first:pl-0 last:pr-0">
                <div className="text-[30px] sm:text-[36px] font-extrabold tracking-[-1px] text-[#181526]">
                  {stat}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[1px] text-[#847E90]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/** *
      <section className="relative py-24 bg-[#F7F5FB] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#F7F5FB]/92 via-[#F7F5FB]/87 to-[#F7F5FB]/94" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="max-w-[700px]">
            <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
              The PacketPros Ecosystem
            </span>
            <h2 className="mt-4 text-[36px] sm:text-[45px] leading-tight font-extrabold tracking-[-1.8px]">
              Everything you need to
              <br />
              keep moving forward.
            </h2>
            <p className="mt-5 text-[14px] leading-7 text-[#6C6678]">
              Learning doesn't happen in one format. PacketPros brings
              together several ways to learn, practice, and connect.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">

            <div className="group overflow-hidden rounded-2xl border border-[#E3DEE9] bg-white shadow-sm hover:border-[#C9B8F2] hover:-translate-y-1 hover:shadow-[0_25px_60px_-35px_rgba(55,30,90,.3)] transition-all">

              <div className="h-[190px] overflow-hidden">

                <img
                  src="https://i.imgur.com/LgYh2gB.jpeg"
                  alt="PacketPros Academy courses"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />

              </div>

              <div className="p-6">

                <span className="text-[10px] uppercase tracking-[1.5px] font-bold text-[#7C3AED]">
                  Academy
                </span>

                <h3 className="mt-2 text-[19px] font-bold">
                  Structured learning
                </h3>

                <p className="mt-2 text-[12.5px] leading-6 text-[#706A79]">
                  Follow organized learning paths designed around practical
                  IT skills and career goals.
                </p>

                <a
                  href="/packetPros"
                  className="inline-block mt-5 text-[12px] font-bold text-[#6D28D9]">
                  Explore Academy →
                </a>
              </div>
            </div>


            <div className="group overflow-hidden rounded-2xl border border-[#E3DEE9] bg-white shadow-sm hover:border-[#C9B8F2] hover:-translate-y-1 hover:shadow-[0_25px_60px_-35px_rgba(55,30,90,.3)] transition-all">
              <div className="h-[190px] overflow-hidden bg-[#171126]">
                <img
                  src="https://i.imgur.com/4DX0y6g.png"
                  alt="PacketPros Discord community"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"/>
              </div>
              <div className="p-6">
                <span className="text-[10px] uppercase tracking-[1.5px] font-bold text-[#7C3AED]">
                  Community
                </span>

                <h3 className="mt-2 text-[19px] font-bold">
                  Learn with others
                </h3>

                <p className="mt-2 text-[12.5px] leading-6 text-[#706A79]">
                  Ask questions, troubleshoot problems, share knowledge,
                  and connect with other IT professionals.
                </p>

                <a
                  href={Socials.discordLink}
                  className="inline-block mt-5 text-[12px] font-bold text-[#6D28D9]">
                  Join Community →
                </a>
              </div>
            </div>
            <div className="group overflow-hidden rounded-2xl border border-[#E3DEE9] bg-white shadow-sm hover:border-[#C9B8F2] hover:-translate-y-1 hover:shadow-[0_25px_60px_-35px_rgba(55,30,90,.3)] transition-all">
              <div className="relative h-[190px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=85"
                  alt="Technology resources"
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-[#171126]/20" />

              </div>

              <div className="p-6">

                <span className="text-[10px] uppercase tracking-[1.5px] font-bold text-[#7C3AED]">
                  Resources
                </span>

                <h3 className="mt-2 text-[19px] font-bold">
                  Keep exploring
                </h3>

                <p className="mt-2 text-[12.5px] leading-6 text-[#706A79]">
                  Discover tools, guides, references, and useful resources
                  to support your technical journey.
                </p>

                <a
                  href="/resources"
                  className="inline-block mt-5 text-[12px] font-bold text-[#6D28D9]"
                >
                  Browse Resources →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      **/}


      {/* =========================================================
          OUR APPROACH
      ========================================================= */}
      <section className="relative min-h-[650px] flex items-center overflow-hidden">

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-[#0E0918]/70" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0918]/90 via-[#0E0918]/70 to-[#0E0918]/42" />


        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10 py-24 w-full">

          <div className="max-w-[700px]">

            <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#B9A3F4]">
              Our Approach
            </span>

            <h2 className="mt-4 text-[36px] sm:text-[47px] leading-tight font-extrabold tracking-[-2px] text-white">
              Learn it.
              <br />
              Practice it.
              <br />

              <span className="text-[#A78BFA]">
                Understand it.
              </span>

            </h2>

            <p className="mt-5 text-[14px] leading-7 text-[#C8C0D0] max-w-[600px]">
              We focus on helping learners develop skills they can
              actually use—not simply information they can memorize.
            </p>

          </div>


          {/* Approach cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">

            {/* Card 1 */}
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6">

              <div className="text-[38px] font-black text-white/10">
                01
              </div>

              <h3 className="mt-1 text-[17px] font-bold text-white">
                Understand
              </h3>

              <p className="mt-2 text-[12px] leading-6 text-[#AAA2B3]">
                Start with clear explanations that make difficult
                technical concepts easier to understand.
              </p>

            </div>


            {/* Card 2 */}
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6">

              <div className="text-[38px] font-black text-white/10">
                02
              </div>

              <h3 className="mt-1 text-[17px] font-bold text-white">
                Practice
              </h3>

              <p className="mt-2 text-[12px] leading-6 text-[#AAA2B3]">
                Reinforce your knowledge through labs, troubleshooting,
                exercises, and realistic scenarios.
              </p>

            </div>


            {/* Card 3 */}
            <div className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-6">
              <div className="text-[38px] font-black text-white/10">
                03
              </div>
              <h3 className="mt-1 text-[17px] font-bold text-white">
                Apply
              </h3>

              <p className="mt-2 text-[12px] leading-6 text-[#AAA2B3]">
                Connect your skills to real-world technology environments
                and the career you're working toward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/**background image */}
      <section className="relative py-24 bg-white overflow-hidden">
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[.8fr_1.2fr] gap-14 items-center">
            {/* Founder image */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[30px] bg-[#7C3AED]/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[25px] border border-[#E1DBEA] bg-white shadow-[0_30px_70px_-35px_rgba(45,25,70,.3)]">
                <img
                  src={chris}
                  alt="Chris Quashie, founder of PacketPros"
                  className="w-full aspect-[4/5] object-cover object-center"
                />
              </div>
            </div>
            {/* Founder content */}
            <div>

              <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                The Founder
              </span>

              <h2 className="mt-4 text-[36px] sm:text-[45px] leading-tight font-extrabold tracking-[-1.8px]">
                Built from real
                <br />
                IT experience.
              </h2>

              <p className="mt-6 text-[14px] leading-7 text-[#625D6D]">
                PacketPros was founded by Chris Quashie, a network
                engineer and technology educator with experience across
                enterprise networking, cybersecurity, wireless, SD-WAN,
                cloud technologies, and IT infrastructure.
              </p>

              <p className="mt-4 text-[14px] leading-7 text-[#625D6D]">
                Through working with technology and teaching others,
                Chris saw a common problem: aspiring professionals often
                have access to plenty of information, but lack a clear
                path for turning that information into practical skills.
              </p>

              <p className="mt-4 text-[14px] leading-7 text-[#625D6D]">
                PacketPros was built to solve that problem by bringing
                structured education, hands-on practice, community, and
                career development together.
              </p>


              {/* Certifications */}
              <div className="flex flex-wrap gap-2 mt-7">

                {[
                  'CCNA',
                  'Security+',
                  'Network+',
                  'A+',
                  'AWS Cloud Practitioner',
                ].map((cert) => (

                  <span
                    key={cert}
                    className="px-3 py-2 rounded-lg bg-[#F5F1FB] border border-[#E2DBED] text-[10px] font-bold text-[#625A70]"
                  >
                    {cert}
                  </span>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          VALUES
      ========================================================= */}
      <section className="relative py-24 overflow-hidden bg-[#F7F5FB]">

        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2200&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-[#F7F5FB]/88" />


        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-[.7fr_1.3fr] gap-14">

            {/* Heading */}
            <div>

              <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                What We Believe
              </span>

              <h2 className="mt-4 text-[36px] sm:text-[44px] leading-tight font-extrabold tracking-[-1.8px]">
                Education should
                <br />
                move you forward.
              </h2>

            </div>


            {/* Values */}
            <div className="grid sm:grid-cols-2 gap-4">

              {/* Value 1 */}
              <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E2DCE9] p-6">

                <div className="w-9 h-9 rounded-lg bg-[#EEE8FC] text-[#7C3AED] flex items-center justify-center font-bold">
                  01
                </div>

                <h3 className="mt-5 text-[17px] font-bold">
                  Practical over theoretical
                </h3>

                <p className="mt-2 text-[12.5px] leading-6 text-[#716B7A]">
                  Knowing a definition isn't enough. We focus on whether
                  you can actually apply what you've learned.
                </p>

              </div>


              {/* Value 2 */}
              <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E2DCE9] p-6">

                <div className="w-9 h-9 rounded-lg bg-[#EEE8FC] text-[#7C3AED] flex items-center justify-center font-bold">
                  02
                </div>

                <h3 className="mt-5 text-[17px] font-bold">
                  Clarity over complexity
                </h3>

                <p className="mt-2 text-[12.5px] leading-6 text-[#716B7A]">
                  Technical subjects can be complicated. Good education
                  should make them easier to understand.
                </p>

              </div>


              {/* Value 3 */}
              <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E2DCE9] p-6">

                <div className="w-9 h-9 rounded-lg bg-[#EEE8FC] text-[#7C3AED] flex items-center justify-center font-bold">
                  03
                </div>

                <h3 className="mt-5 text-[17px] font-bold">
                  Community matters
                </h3>

                <p className="mt-2 text-[12.5px] leading-6 text-[#716B7A]">
                  Learning alongside others creates accountability,
                  perspective, and opportunities to grow.
                </p>

              </div>


              {/* Value 4 */}
              <div className="rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E2DCE9] p-6">

                <div className="w-9 h-9 rounded-lg bg-[#EEE8FC] text-[#7C3AED] flex items-center justify-center font-bold">
                  04
                </div>

                <h3 className="mt-5 text-[17px] font-bold">
                  Careers, not just certificates
                </h3>

                <p className="mt-2 text-[12.5px] leading-6 text-[#716B7A]">
                  Certifications matter, but the ultimate goal is building
                  skills that create real career opportunities.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}