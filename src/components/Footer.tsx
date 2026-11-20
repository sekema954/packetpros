
export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#0D0918] text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=85')",
        }}/>
      {/* Overlays */}
      <div className="absolute inset-0 bg-[#0D0918]/90" />
      <div className="absolute -top-40 right-[-100px] w-[500px] h-[500px] rounded-full bg-[#7C3AED]/15 blur-[140px]" />
      <div className="absolute bottom-[-250px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[#5B21B6]/10 blur-[140px]" />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">
        {/**Top cta */}
        <div className="py-16 lg:py-20 border-b border-white/[0.08]">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-center">
            <div className="max-w-[700px]">
              <span className="text-[10px] uppercase tracking-[2px] font-bold text-[#B9A3F4]">
                Start Your Journey
              </span>
              <h2 className="mt-3 text-[30px] sm:text-[38px] leading-[1.1] font-bold tracking-[-1.5px]">
                Ready to build your
                <span className="text-[#A78BFA]"> IT career?</span>
              </h2>
              <p className="mt-4 text-[14px] sm:text-[15px] leading-7 text-[#A9A2B4] max-w-[600px]">
                Learn practical skills, connect with other IT professionals,
                and follow a clear path toward becoming job-ready.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#7C3AED] text-white text-[13px] font-bold hover:bg-[#6D28D9] hover:-translate-y-0.5 transition-all shadow-[0_12px_35px_-15px_rgba(124,58,237,.9)]">
                Start Learning
              </a>
              <a
                href="/packetPros"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl border border-white/10 bg-white/[0.05] text-[#E9E5EF] text-[13px] font-bold hover:bg-white/10 transition-all">
                Explore Academy
              </a>
            </div>
          </div>
        </div>
        {/**main router */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 lg:gap-16">
            {/* BRAND */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1">
              <a
                href="/"
                className="inline-flex items-center gap-3">
                {/* Logo */}
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#5B21B6] flex items-center justify-center shadow-[0_8px_25px_-10px_rgba(124,58,237,.9)]">
                  <span className="text-white font-black text-[18px]">
                    P
                  </span>
                </div>
                <div>
                  <div className="text-[17px] font-extrabold tracking-[-.5px]">
                    PacketPros
                  </div>
                  <div className="text-[9px] uppercase tracking-[2px] text-[#8F879B] font-bold">
                    Academy
                  </div>
                </div>
              </a>
              <p className="mt-6 text-[13px] leading-6 text-[#91899D] max-w-[320px]">
                Practical IT education designed to help aspiring
                technology professionals build skills, confidence,
                and careers.
              </p>
              {/* socials */}
              <div className="flex items-center gap-2 mt-7">
                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current">
                    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.5 3.9-6.5 3.9Z" />
                  </svg>
                </a>
                {/* Discord */}
                <a
                  href="/community"
                  aria-label="Discord Community"
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#A9A1B3] hover:text-white hover:bg-[#7C3AED] hover:border-[#7C3AED] transition-all">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current">
                    <path d="M19.5 5.2A16.2 16.2 0 0 0 15.6 4l-.5 1a14.7 14.7 0 0 0-6.2 0l-.5-1a16.2 16.2 0 0 0-3.9 1.2C1.9 8.2 1.2 11.1 1.5 14c1.6 1.2 3.3 2 5.2 2.6l1.3-1.7c-.7-.3-1.4-.7-2-1.1l.5-.4c3.8 1.8 7.9 1.8 11.7 0l.5.4c-.6.4-1.3.8-2 1.1l1.3 1.7c1.9-.6 3.6-1.4 5.2-2.6.3-3-.4-5.8-2.7-8.8ZM8.3 13.1c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm7.4 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z" />
                  </svg>
                </a>
                {/* TikTok */}
                <a
                  href="#"
                  aria-label="TikTok"
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#A9A1B3] hover:text-white hover:bg-[#7C3AED] hover:border-[#7C3AED] transition-all">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current">
                    <path d="M19.3 7.1a5.8 5.8 0 0 1-3.5-1.1v7.3a5.7 5.7 0 1 1-5.7-5.7c.3 0 .7 0 1 .1v3.2a2.5 2.5 0 1 0 1.5 2.3V2h3.2c.2 1.5 1.2 2.7 2.7 3.1.5.1.9.2 1.3.2v1.8h-.5Z" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-[#A9A1B3] hover:text-white hover:bg-[#7C3AED] hover:border-[#7C3AED] transition-all">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 fill-current">
                    <path d="M5.2 3.2A2.2 2.2 0 1 1 3 5.4a2.2 2.2 0 0 1 2.2-2.2ZM3.4 8.7h3.6V21H3.4V8.7Zm5.8 0h3.5v1.7h.1c.5-1 1.8-2.1 3.7-2.1 3.7 0 4.4 2.4 4.4 5.5V21h-3.6v-6.4c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21H9.2V8.7Z" />
                  </svg>
              </a>
              </div>
            </div>
            {/* learn */}
            <div>
              <h3 className="text-[12px] uppercase tracking-[1.5px] font-bold text-white">
                Learn
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href="/academy"
                    className="text-[13px] text-[#91899D] hover:text-[#C4B5FD] transition-colors">
                    Academy
                  </a>
                </li>
                <li>
                  <a
                    href="/academy"
                    className="text-[13px] text-[#91899D] hover:text-[#C4B5FD] transition-colors">
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href="/resources"
                    className="text-[13px] text-[#91899D] hover:text-[#C4B5FD] transition-colors">
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="/community"
                    className="text-[13px] text-[#91899D] hover:text-[#C4B5FD] transition-colors">
                    Community
                  </a>
                </li>
              </ul>
            </div>
            {/* company */}
            <div>
              <h3 className="text-[12px] uppercase tracking-[1.5px] font-bold text-white">
                Company
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href="/about"
                    className="text-[13px] text-[#91899D] hover:text-[#C4B5FD] transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-[13px] text-[#91899D] hover:text-[#C4B5FD] transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[13px] text-[#91899D] hover:text-[#C4B5FD] transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[13px] text-[#91899D] hover:text-[#C4B5FD] transition-colors" >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            {/* support */}
            <div>
              <h3 className="text-[12px] uppercase tracking-[1.5px] font-bold text-white">
                Support
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-[13px] text-[#91899D] hover:text-[#C4B5FD] transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-[13px] text-[#91899D] hover:text-[#C4B5FD] transition-colors">
                    Get Help
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[13px] text-[#91899D] hover:text-[#C4B5FD] transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-[13px] text-[#91899D] hover:text-[#C4B5FD] transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/**button bar */}
        <div className="border-t border-white/[0.08] py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-[#756D80] text-center md:text-left">
              © {new Date().getFullYear()} PacketPros Academy. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <a
                href="#"
                className="text-[11px] text-[#756D80] hover:text-[#B9A3F4] transition-colors">
                Privacy
              </a>
              <a
                href="#"
                className="text-[11px] text-[#756D80] hover:text-[#B9A3F4] transition-colors">
                Terms
              </a>
              <a
                href="/contact"
                className="text-[11px] text-[#756D80] hover:text-[#B9A3F4] transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}