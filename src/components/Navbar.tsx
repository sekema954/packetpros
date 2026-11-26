import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Academy', path: '/academy' },
  { name: 'PacketPros', path: '/packetpros' },
  { name: 'Community', path: '/community' },
  { name: 'Resources', path: '/resources' },
  { name: 'Contact', path: '/contact' },
]
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  )
}
function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${
        open ? 'rotate-180' : ''
      }`}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}
export const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const closeMenu = () => {
    setIsOpen(false)
    setResourcesOpen(false)
  }
  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-[100]
        transition-all duration-300 ease-out
        ${
          scrolled
            ? 'bg-[#0B0712]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)]'
            : 'bg-transparent border-b border-transparent'
        }
      `}>
      <nav className="w-full">
        <div className="max-w-[1250px] mx-auto px-5 sm:px-6 lg:px-10">
          <div
            className={`
              h-[76px]
              flex items-center justify-between
              transition-all duration-300
            `}>
            <a
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 group">
              {/**<img className='w-20 h-10' src={logo} alt="Packet pros logo" />**/}
              <div className="hidden sm:block">
                <div className="text-[15px] font-bold tracking-[-0.2px] text-white leading-none">
                  PacketPros
                </div>
                <div className="text-[9px] uppercase tracking-[1.7px] text-[#B9A9D2] mt-1">
                  Academy
                </div>
              </div>
            </a>
            {/**desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                /* resources dropdown tab */
                if (link.name === 'Resources') {
                  return (
                    <div
                      key={link.path}
                      className="relative"
                      onMouseEnter={() => setResourcesOpen(true)}
                      onMouseLeave={() => setResourcesOpen(false)}>
                      <button
                        type="button"
                        onClick={() =>
                          setResourcesOpen(!resourcesOpen)
                        }
                        className={`
                          relative
                          flex items-center gap-1.5
                          px-3.5 py-2
                          text-[13px] font-medium
                          transition-colors duration-200
                          ${
                            resourcesOpen
                              ? 'text-white'
                              : 'text-[#BEB5D0] hover:text-white'
                          }`}>
                        Resources
                        <ChevronIcon open={resourcesOpen} />
                        {resourcesOpen && (
                          <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-1 h-1 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
                        )}
                      </button>
                      {/* dropdown */}
                      <div
                        className={`
                          absolute top-full left-1/2 -translate-x-1/2 pt-4
                          transition-all duration-200
                          ${
                            resourcesOpen
                              ? 'opacity-100 visible translate-y-0'
                              : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                          }
                        `}>
                        <div className="w-[230px] rounded-2xl border border-white/[0.1] bg-[#12091D]/95 backdrop-blur-2xl shadow-[0_25px_70px_-20px_rgba(0,0,0,.8)] overflow-hidden p-2">
                          {/* blogs */}
                          <a
                            href="/blogs"
                            onClick={closeMenu}
                            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.06] transition-all">
                            <div className="w-9 h-9 rounded-lg bg-[#7C3AED]/15 border border-[#A855F7]/20 flex items-center justify-center text-[#C084FC]">
                              ✦
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-white">
                                Blog
                              </div>
                              <div className="text-[10px] text-[#9589A4] mt-0.5">
                                Networking insights
                              </div>
                            </div>
                          </a>
                          {/* vids */}
                          <a
                            href="/videos"
                            onClick={closeMenu}
                            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.06] transition-all">
                            <div className="w-9 h-9 rounded-lg bg-[#7C3AED]/15 border border-[#A855F7]/20 flex items-center justify-center text-[#C084FC]">
                              ▶
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-white">
                                Videos
                              </div>
                              <div className="text-[10px] text-[#9589A4] mt-0.5">
                                Free networking videos
                              </div>
                            </div>
                          </a>
                          {/* resources */}
                          <a
                            href="/resources"
                            onClick={closeMenu}
                            className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.06] transition-all">                         
                          </a>
                        </div>
                      </div>
                    </div>
                  )
                }
               /**normal nav links */
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    link.name === 'PacketPros'
                      ? `
                        relative mx-1 px-4 py-2 rounded-lg
                        text-[13px] font-bold
                        text-[#E9D5FF]
                        bg-[#7C3AED]/10
                        border border-[#A855F7]/30
                        shadow-[0_0_20px_rgba(168,85,247,.15)]
                        hover:bg-[#7C3AED]/20
                        hover:border-[#C084FC]/50
                        hover:shadow-[0_0_25px_rgba(168,85,247,.3)]
                        hover:-translate-y-0.5
                        transition-all duration-200
                      `
                      : `
                        relative px-3.5 py-2
                        text-[13px] font-medium
                        transition-colors duration-200
                        ${
                          isActive
                            ? 'text-white'
                            : 'text-[#BEB5D0] hover:text-white'
                        }
                      `
                  }>
                  {({ isActive }) => (
                    <>
                      {link.name === 'PacketPros' && (
                        <span className="absolute -top-1.5 -right-1.5 w-2 h-2 rounded-full bg-[#C084FC] shadow-[0_0_10px_#C084FC]" />
                      )}
                      {link.name}
                      {isActive && link.name !== 'PacketPros' && (
                        <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-1 h-1 rounded-full bg-[#A855F7] shadow-[0_0_8px_#A855F7]" />
                      )}
                    </>
                  )}
                </NavLink>
)
              })}
            </div>
            {/**desktop actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/signin"
                className="px-4 py-2.5 text-[13px] font-semibold text-[#D6CEE3] hover:text-white transition-colors">
                Login
              </a>
              <a
                href="/signup"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-[9px] bg-gradient-to-r from-[#9333EA] to-[#6D28D9] text-white text-[13px] font-bold shadow-[0_8px_25px_-8px_rgba(147,51,234,.75)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(147,51,234,.9)]">
                Get Started
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowIcon />
                </span>
              </a>
            </div>
            {/**mobile menu btn */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="lg:hidden w-10 h-10 rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-md text-white grid place-items-center transition-colors hover:bg-white/[0.1]">
              <MenuIcon open={isOpen} />
            </button>
          </div>
        </div>
      {/**mobile meny */}
        <div
          className={`
            lg:hidden overflow-hidden
            transition-all duration-300 ease-in-out
            ${
              isOpen
                ? 'max-h-[600px] opacity-100'
                : 'max-h-0 opacity-0 pointer-events-none'
            }`}>
          <div className="mx-4 mb-4 rounded-2xl border border-white/[0.12] bg-[#120625]/95 backdrop-blur-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,.7)]">
            <div className="p-3">
              {/* mobile links */}
              <div className="flex flex-col">
                {navLinks.map((link) => {
                  if (link.name === 'Resources') {
                    return (
                      <div key={link.path}>
                        <button
                          type="button"
                          onClick={() =>
                            setResourcesOpen(!resourcesOpen)
                          }
                          className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-[14px] font-medium text-[#BEB5D0] hover:bg-white/[0.05] hover:text-white transition-all">
                          <span>Resources</span>
                          <ChevronIcon open={resourcesOpen} />
                        </button>
                        {resourcesOpen && (
                          <div className="ml-3 pl-3 border-l border-white/[0.08] mb-2">
                            <a
                              href="/resources"
                              onClick={closeMenu}
                              className="block px-4 py-2.5 text-[13px] text-[#BEB5D0] hover:text-white">
                              All Resources
                            </a>
                            <a
                              href="/blog"
                              onClick={closeMenu}
                              className="block px-4 py-2.5 text-[13px] text-[#BEB5D0] hover:text-white">
                              Blog
                            </a>
                            <a
                              href="/videos"
                              onClick={closeMenu}
                              className="block px-4 py-2.5 text-[13px] text-[#BEB5D0] hover:text-white">
                              Videos
                            </a>
                          </div>
                        )}
                      </div>
                    )
                  }
                  return (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `
                        flex items-center justify-between
                        px-4 py-3.5 rounded-xl
                        text-[14px] font-medium
                        transition-all duration-150
                        ${
                          isActive
                            ? 'bg-[#7C3AED]/15 text-white'
                            : 'text-[#BEB5D0] hover:bg-white/[0.05] hover:text-white'
                        }`
                      }>
                      {({ isActive }) => (
                        <>
                          <span>{link.name}</span>

                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_10px_#A855F7]" />
                          )}
                        </>
                      )}
                    </NavLink>
                  )
                })}
              </div>
              {/* divider */}
              <div className="h-px bg-white/[0.08] my-3" />
              {/* mobile actions */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/signin"
                  onClick={closeMenu}
                  className="flex items-center justify-center rounded-xl px-4 py-3 text-[13px] font-semibold text-[#D6CEE3] border border-white/[0.1] hover:bg-white/[0.05] transition-colors">
                  Login
                </a>
                <a
                  href="/signup"
                  onClick={closeMenu}
                  className="flex items-center justify-center rounded-xl px-4 py-3 text-[13px] font-bold text-white bg-gradient-to-r from-[#9333EA] to-[#6D28D9] shadow-[0_8px_20px_-8px_rgba(147,51,234,.7)]">
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}