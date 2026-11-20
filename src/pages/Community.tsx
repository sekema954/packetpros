import { Socials } from "../constants/constants"
export const Community = () => {
  return (
    <main className="relative overflow-hidden bg-[#F7F5FC] text-[#181526]">
      <section className="relative min-h-[780px] flex items-center overflow-hidden">
        {/* real background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=85')",
          }}/>

        {/* Overlays */}
        <div className="absolute inset-0 bg-[#0D0918]/90" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0D0918] via-[#0D0918]/90 to-[#0D0918]/55" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0918] via-transparent to-[#0D0918]/40" />

        {/* Purple glow */}
        <div className="absolute -top-40 -left-40 w-[550px] h-[550px] rounded-full bg-[#7C3AED]/20 blur-[140px]" />
        <div className="absolute bottom-[-250px] right-[-100px] w-[600px] h-[600px] rounded-full bg-[#5B21B6]/20 blur-[150px]" />
        <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6 lg:px-10 py-24">
          <div className="grid lg:grid-cols-[.95fr_1.05fr] gap-14 items-center">
          {/**hero text */}
            <div>

              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md">

                <span className="w-2 h-2 rounded-full bg-[#A78BFA] shadow-[0_0_12px_#A78BFA]" />

                <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#D8CCFF]">
                  TechyChris Community
                </span>

              </div>


              <h1 className="mt-7 text-[42px] sm:text-[52px] lg:text-[60px] leading-[1.03] font-extrabold tracking-[-2.5px] text-white">

                Learn together.
                <br />

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C4B5FD] via-[#A78BFA] to-[#7C3AED]">
                  Grow together.
                </span>

              </h1>


              <p className="mt-6 text-[16px] leading-8 text-[#C4BECC] max-w-[570px]">
                Join a community of aspiring and experienced IT
                professionals where you can ask questions, get help,
                share knowledge, and stay motivated throughout your
                career journey.
              </p>


              <div className="flex flex-wrap gap-3 mt-8">
                <a
                  href={Socials.discordLink}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#7C3AED] text-white text-[13px] font-bold hover:bg-[#6D28D9] hover:-translate-y-0.5 transition-all shadow-[0_15px_35px_-15px_rgba(124,58,237,.9)]">
                  Join the Community
                  <span className="text-[16px]">
                    →
                  </span>
                </a>
                <a
                  href={Socials.youtubeLink}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md text-[#ECE8F2] text-[13px] font-bold hover:bg-white/10 transition-all">
                  Watch & Learn
                </a>
              </div>
              {/* Mini stats */}
              <div className="flex flex-wrap gap-7 mt-10">
                <div>
                  <div className="text-[20px] font-bold text-white">
                    24/7
                  </div>
                  <div className="text-[10px] uppercase tracking-[1px] text-[#827A8F] mt-1">
                    Community
                  </div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <div className="text-[20px] font-bold text-white">
                    IT
                  </div>
                  <div className="text-[10px] uppercase tracking-[1px] text-[#827A8F] mt-1">
                    Focused
                  </div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <div className="text-[20px] font-bold text-white">
                    Free
                  </div>
                  <div className="text-[10px] uppercase tracking-[1px] text-[#827A8F] mt-1">
                    To Join
                  </div>
                </div>
              </div>
            </div>


            {/**discord image */}
            <div
              id="discord"
              className="relative">
              {/* Glow */}
              <div className="absolute -inset-8 rounded-[35px] bg-[#7C3AED]/20 blur-[60px]" />
              <div className="relative rounded-[25px] border border-white/15 bg-[#171126]/70 backdrop-blur-md p-2 shadow-[0_40px_100px_-30px_rgba(0,0,0,.9)]">
                <div className="rounded-[19px] overflow-hidden bg-[#1B1429]">

                  <img
                    src="https://i.imgur.com/4DX0y6g.png"
                    alt="techychris Discord Community"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-7 -left-5 sm:-left-8 rounded-2xl border border-white/10 bg-[#171126]/95 backdrop-blur-xl px-5 py-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,.8)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 border border-[#5865F2]/30 flex items-center justify-center">
                    <span className="text-[#AEB5FF] font-black text-[13px]">
                      DC
                    </span>
                  </div>
                  <div>
                    <div className="text-[12px] font-bold text-white">
                      TechyChris Discord
                    </div>
                    <div className="text-[10px] text-[#8E879A] mt-0.5">
                      Ask questions • Get help • Connect
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     {/**community values */}
      <section className="relative py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="max-w-[680px]">
            <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
              Why Join?
            </span>
            <h2 className="mt-3 text-[35px] sm:text-[43px] leading-tight font-extrabold tracking-[-1.5px] text-[#181526]">
              More than just a place to chat.
            </h2>
            <p className="mt-4 text-[14px] leading-7 text-[#6C6678]">
              IT can be difficult to navigate alone. The PacketPros
              community gives you a place to learn, ask questions,
              troubleshoot problems, and stay accountable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {/* card 1 */}
            <div className="group rounded-2xl border border-[#E5DFEC] bg-[#FBFAFD] p-6 hover:-translate-y-1 hover:border-[#CDBCF2] hover:shadow-[0_20px_45px_-25px_rgba(70,40,110,.25)] transition-all">

              <div className="w-11 h-11 rounded-xl bg-[#EEE8FC] text-[#7C3AED] flex items-center justify-center font-bold">
                ?
              </div>

              <h3 className="mt-5 text-[16px] font-bold">
                Ask Questions
              </h3>

              <p className="mt-2 text-[12.5px] leading-6 text-[#777080]">
                Stuck on a networking concept, lab, certification topic,
                or technical problem? Ask the community.
              </p>

            </div>


            {/* card 2 */}
            <div className="group rounded-2xl border border-[#E5DFEC] bg-[#FBFAFD] p-6 hover:-translate-y-1 hover:border-[#CDBCF2] hover:shadow-[0_20px_45px_-25px_rgba(70,40,110,.25)] transition-all">

              <div className="w-11 h-11 rounded-xl bg-[#EEE8FC] text-[#7C3AED] flex items-center justify-center font-bold">
                +
              </div>

              <h3 className="mt-5 text-[16px] font-bold">
                Share Knowledge
              </h3>

              <p className="mt-2 text-[12.5px] leading-6 text-[#777080]">
                Share what you've learned, help others solve problems,
                and grow your technical confidence.
              </p>

            </div>


            {/* card 3 */}
            <div className="group rounded-2xl border border-[#E5DFEC] bg-[#FBFAFD] p-6 hover:-translate-y-1 hover:border-[#CDBCF2] hover:shadow-[0_20px_45px_-25px_rgba(70,40,110,.25)] transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#EEE8FC] text-[#7C3AED] flex items-center justify-center font-bold">
                !
              </div>
              <h3 className="mt-5 text-[16px] font-bold">
                Stay Motivated
              </h3>
              <p className="mt-2 text-[12.5px] leading-6 text-[#777080]">
                Certification studying and career preparation are easier
                when you're surrounded by people working toward similar goals.
              </p>
            </div>
            {/* card 4 */}
            <div className="group rounded-2xl border border-[#E5DFEC] bg-[#FBFAFD] p-6 hover:-translate-y-1 hover:border-[#CDBCF2] hover:shadow-[0_20px_45px_-25px_rgba(70,40,110,.25)] transition-all">
              <div className="w-11 h-11 rounded-xl bg-[#EEE8FC] text-[#7C3AED] flex items-center justify-center font-bold">
                ↗
              </div>
              <h3 className="mt-5 text-[16px] font-bold">
                Build Connections
              </h3>
              <p className="mt-2 text-[12.5px] leading-6 text-[#777080]">
                Meet people interested in networking, cybersecurity,
                cloud, IT support, and technology careers.
              </p>
            </div>
          </div>
        </div>
      </section>
     {/**discord feature */}
      <section className="relative overflow-hidden bg-[#100B20] py-24">

        <div className="absolute inset-0">

          <div className="absolute -top-40 right-[-100px] w-[550px] h-[550px] rounded-full bg-[#7C3AED]/15 blur-[140px]" />

          <div className="absolute bottom-[-300px] left-[-150px] w-[600px] h-[600px] rounded-full bg-[#5B21B6]/15 blur-[150px]" />

        </div>


        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">

          <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-14 items-center">


            {/* IMAGE */}
            <div className="order-2 lg:order-1">

              <div className="relative">

                <div className="absolute -inset-5 rounded-[30px] bg-[#7C3AED]/15 blur-[40px]" />

                <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-[#171126] shadow-[0_35px_90px_-30px_rgba(0,0,0,.9)]">

                  <img
                    src="https://i.imgur.com/4DX0y6g.png"
                    alt="TechyChris Discord server"
                    className="w-full h-auto"
                  />

                </div>

              </div>

            </div>


            {/* CONTENT */}
            <div className="order-1 lg:order-2">

              <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#A78BFA]">
                The TechyChris Community
              </span>

              <h2 className="mt-4 text-[35px] sm:text-[43px] leading-tight font-extrabold tracking-[-1.5px] text-white">
                Get help when you
                <span className="text-[#A78BFA]"> need it.</span>
              </h2>

              <p className="mt-5 text-[14px] leading-7 text-[#A39BAB]">
                Our Discord community is where learning becomes
                interactive. Ask questions, troubleshoot labs, discuss
                certifications, and connect with people who understand
                the journey.
              </p>


              <div className="mt-8 space-y-4">
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#C4B5FD] font-bold">
                    01
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-white">
                      Get technical help
                    </h3>
                    <p className="mt-1 text-[12px] leading-5 text-[#8F8798]">
                      Get another perspective when you're stuck on a concept.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#C4B5FD] font-bold">
                    02
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-white">
                      Meet other learners
                    </h3>
                    <p className="mt-1 text-[12px] leading-5 text-[#8F8798]">
                      Connect with people working toward similar IT careers.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-[#C4B5FD] font-bold">
                    03
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-white">
                      Stay accountable
                    </h3>
                    <p className="mt-1 text-[12px] leading-5 text-[#8F8798]">
                      Keep learning and stay on track with your goals.
                    </p>
                  </div>
                </div>
              </div>
              <a
                href={Socials.discordLink}
                className="inline-flex items-center justify-center gap-2 mt-9 px-6 py-3.5 rounded-xl bg-[#7C3AED] text-white text-[13px] font-bold hover:bg-[#6D28D9] hover:-translate-y-0.5 transition-all">
                Join Discord
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/**youtube */}
      <section
        id="youtube"
        className="relative bg-[#F7F5FC] py-24 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[.9fr_1.1fr] gap-14 items-center">
            {/* content */}
            <div>
              <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
                Learn Beyond The Academy
              </span>

              <h2 className="mt-4 text-[35px] sm:text-[43px] leading-tight font-extrabold tracking-[-1.5px] text-[#181526]">
                Keep learning
                <br />
                wherever you are.
              </h2>

              <p className="mt-5 text-[14px] leading-7 text-[#6C6678] max-w-[520px]">
                The PacketPros community doesn't stop at Discord. Follow
                along on YouTube for networking tutorials, certification
                tips, troubleshooting walkthroughs, career advice, and
                practical IT content.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-8 max-w-[480px]">
                <div className="rounded-2xl border border-[#E4DFEA] bg-white p-5">
                  <div className="text-[19px] font-extrabold text-[#7C3AED]">
                    Tutorials
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-[#777080]">
                    Practical technical walkthroughs.
                  </p>
                </div>
                <div className="rounded-2xl border border-[#E4DFEA] bg-white p-5">
                  <div className="text-[19px] font-extrabold text-[#7C3AED]">
                    Career Tips
                  </div>
                  <p className="mt-1 text-[11px] leading-5 text-[#777080]">
                    Advice for breaking into IT.
                  </p>
                </div>
              </div>
              <a
                href={Socials.youtubeLink}
                className="inline-flex items-center gap-2 mt-7 text-[13px] font-bold text-[#6D28D9] hover:text-[#4C1D95] transition-colors">
                Visit the YouTube Channel
                <span>→</span>
              </a>

            </div>


            {/* utube visual */}
            <div>

              <div className="relative">

                <div className="absolute -inset-6 rounded-[30px] bg-[#7C3AED]/10 blur-[45px]" />

                <div className="relative overflow-hidden rounded-[24px] border border-[#DED8E8] bg-white shadow-[0_30px_70px_-30px_rgba(50,30,80,.25)]">

                  {/* YouTube-style placeholder */}
                  <div className="aspect-video bg-[#171126] relative overflow-hidden">

                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-60"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=85')",
                      }}/>
                    <div className="absolute inset-0 bg-[#0D0918]/55" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,.35)] hover:scale-105 transition-transform">
                        <div className="ml-1 w-0 h-0 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent border-l-[14px] border-l-[#7C3AED]" />
                      </div>
                    </div>
                    <div className="absolute bottom-5 left-5 right-5">
                      <div className="inline-flex px-2.5 py-1 rounded-md bg-[#7C3AED] text-white text-[9px] uppercase tracking-[1.5px] font-bold">
                        PacketPros
                      </div>
                      <h3 className="mt-2 text-[18px] font-bold text-white">
                        Practical IT. Explained Simply.
                      </h3>
                    </div>
                  </div>
                  {/* Video info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[12px] font-bold text-[#282234]">
                          Networking • Cybersecurity • IT Careers
                        </p>
                        <p className="text-[10px] text-[#898291] mt-1">
                          Learn tools, concepts, and career strategies.
                        </p>
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-[#F0EAFB] flex items-center justify-center text-[#7C3AED]">
                        ▶
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/**community path */}
      <section className="bg-white py-24">

        <div className="max-w-[1000px] mx-auto px-6 text-center">

          <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#7C3AED]">
            Your Community Journey
          </span>

          <h2 className="mt-3 text-[34px] sm:text-[42px] font-extrabold tracking-[-1.5px]">
            Learn. Practice. Connect. Grow.
          </h2>

          <p className="mt-4 text-[14px] leading-7 text-[#706979] max-w-[620px] mx-auto">
            Use each part of the PacketPros ecosystem to support a
            different part of your learning journey.
          </p>


          <div className="grid md:grid-cols-3 gap-5 mt-12">


            <div className="relative">

              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#EEE8FC] text-[#7C3AED] flex items-center justify-center font-black">
                01
              </div>

              <h3 className="mt-5 text-[16px] font-bold">
                Learn
              </h3>

              <p className="mt-2 text-[12px] leading-6 text-[#777080]">
                Build your technical foundation through PacketPros Academy
                and educational content.
              </p>

            </div>


            <div className="relative">

              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#EEE8FC] text-[#7C3AED] flex items-center justify-center font-black">
                02
              </div>

              <h3 className="mt-5 text-[16px] font-bold">
                Practice
              </h3>

              <p className="mt-2 text-[12px] leading-6 text-[#777080]">
                Apply what you learn through labs, projects, troubleshooting,
                and real-world scenarios.
              </p>

            </div>


            <div className="relative">

              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#EEE8FC] text-[#7C3AED] flex items-center justify-center font-black">
                03
              </div>

              <h3 className="mt-5 text-[16px] font-bold">
                Connect
              </h3>

              <p className="mt-2 text-[12px] leading-6 text-[#777080]">
                Get help, meet other learners, and stay motivated inside
                the PacketPros community.
              </p>

            </div>

          </div>

        </div>

      </section>
     {/**final CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#24104B] via-[#3B176D] to-[#160B2C] py-20">
        <div className="absolute -top-40 -right-20 w-[500px] h-[500px] rounded-full bg-[#A78BFA]/15 blur-[120px]" />

        <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">

          <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#C4B5FD]">
            Join PacketPros
          </span>

          <h2 className="mt-4 text-[34px] sm:text-[45px] leading-tight font-extrabold tracking-[-1.5px] text-white">
            You don't have to figure it
            <br />
            all out alone.
          </h2>

          <p className="mt-5 text-[14px] leading-7 text-[#C9BEDD] max-w-[600px] mx-auto">
            Join the community, learn from others, ask questions, and
            take the next step toward your IT career.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href={Socials.discordLink}
              className="px-7 py-3.5 rounded-xl bg-white text-[#4C1D95] font-bold text-[13px] hover:-translate-y-0.5 transition-all shadow-xl">
              Join Discord
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Community

