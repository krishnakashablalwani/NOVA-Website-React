import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserButton, SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredPath, setHoveredPath] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Ideaprint', path: '/ideasprint' }, // User spelled it Ideaprint in their snippet, but I'll link to /ideasprint
    { name: 'Sprints', path: '/sprints' },
  ]

  // Track the active or hovered path for the sliding pill
  const activeOrHoveredPath = hoveredPath ?? location.pathname

  return (
    <>
      <motion.header
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{
          width: isScrolled ? '92%' : '100%',
          maxWidth: isScrolled ? '1100px' : '100%',
          top: isScrolled ? '1.25rem' : '0rem',
          borderRadius: isScrolled ? '9999px' : '0px',
        }}
        className={cn(
          "fixed left-1/2 z-[1000] flex items-center justify-between px-6 py-3 border border-slate-800/80 backdrop-blur-md transition-all duration-300 ease-out",
          isScrolled 
            ? "shadow-[0_0_40px_rgba(99,102,241,0.15)] border-indigo-500/20 py-2.5 bg-slate-950/70" 
            : "shadow-none border-t-0 border-l-0 border-r-0 border-b-white/5 bg-slate-950/40"
        )}
      >
        {/* Brand Logo / Identity */}
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3 shrink-0">
          <img 
            src="/images/hero/NOVA LOGo.jpg" 
            alt="NOVA Logo" 
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shrink-0 shadow-md border border-slate-700/50" 
          />
          <div className="text-white font-bold text-sm sm:text-md md:text-lg text-xl">NOVA</div>
        </Link>

        {/* Center Navigation Links with Sliding Indicator */}
        <nav 
          className="hidden md:flex relative items-center gap-1 bg-slate-900/40 p-1 rounded-full border border-slate-800/40"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path
            const isHovered = activeOrHoveredPath === link.path
            
            return (
              <Link
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHoveredPath(link.path)}
                className={cn(
                  "relative px-4 py-1.5 text-sm font-semibold tracking-wide transition-colors duration-300 rounded-full",
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                )}
              >
                {isHovered && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            )
          })}
          
          <SignedIn>
            {(() => {
              const isActive = location.pathname === '/dashboard'
              const isHovered = activeOrHoveredPath === '/dashboard'
              return (
                <Link
                  to="/dashboard"
                  onMouseEnter={() => setHoveredPath('/dashboard')}
                  className={cn(
                    "relative px-4 py-1.5 text-sm font-semibold tracking-wide transition-colors duration-300 rounded-full",
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  {isHovered && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">Dashboard</span>
                </Link>
              )
            })()}
          </SignedIn>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Link
              to="/register"
              className="text-sm font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-5 py-2 rounded-full transition duration-200 inline-flex items-center justify-center h-[36px]"
            >
              Join Us
            </Link>
          </div>
          
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-bold bg-white text-slate-950 px-5 py-2 rounded-full hover:bg-slate-200 transition duration-200 shadow-md inline-flex items-center justify-center h-[36px]">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          
          <SignedIn>
            <div className="flex items-center">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: '32px',
                      height: '32px',
                      border: '2px solid rgba(99,102,241,0.5)',
                    },
                    userButtonPopoverCard: {
                      backgroundColor: '#020617',
                      border: '1px solid #1e293b',
                      borderRadius: '12px',
                    },
                    userButtonPopoverActionItem: { color: '#f8fafc' },
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </SignedIn>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-300 hover:text-white p-1"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 inset-x-4 z-[990] bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-[0_10px_40px_-10px_rgba(99,102,241,0.15)] p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={closeMenu}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium",
                  location.pathname === link.path ? "bg-indigo-600 text-white" : "text-slate-300"
                )}
              >
                {link.name}
              </Link>
            ))}
            <SignedIn>
              <Link 
                to="/dashboard" 
                onClick={closeMenu}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium",
                  location.pathname === "/dashboard" ? "bg-indigo-600 text-white" : "text-slate-300"
                )}
              >
                Dashboard
              </Link>
            </SignedIn>
            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <Link
                to="/register"
                onClick={closeMenu}
                className="w-full text-center py-3 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 font-bold transition-all"
              >
                Join Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
