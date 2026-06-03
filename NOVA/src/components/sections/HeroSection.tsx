import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SplineScene } from '../SplineScene'
import { ArrowRight, Sparkles } from 'lucide-react'

const HeroSection: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-slate-950">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column Content */}
          <motion.div 
            className="flex flex-col items-start text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-sm font-medium mb-6">
              <Sparkles size={16} />
              <span>Welcome to the Future</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                NOVA
              </span>
            </motion.h1>
            
            <motion.h2 variants={itemVariants} className="text-xl md:text-3xl font-bold text-slate-300 mb-6">
              Network of Visionary Aspirants
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg text-slate-400 mb-10 max-w-xl leading-relaxed">
              Empowering students to innovate, collaborate, and excel in the world of technology through dynamic hackathons and collaborative sprints.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('about')}
                className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Now
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <Link 
                to="/register" 
                className="px-8 py-4 rounded-full font-bold text-lg text-white border border-slate-700 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                Join Us
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column Spline 3D Scene */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900/30 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-cyan-500/10 z-0" />
            <div className="relative z-10 w-full h-full">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection
