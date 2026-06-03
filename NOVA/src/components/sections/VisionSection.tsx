import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Target } from 'lucide-react'

const VisionSection: React.FC = () => {
  const [displayText, setDisplayText] = useState('')
  const fullText = "Empowering the Next Generation of Tech Innovators"

  useEffect(() => {
    let currentIndex = 0
    const intervalId = setInterval(() => {
      setDisplayText(fullText.slice(0, currentIndex))
      currentIndex++
      if (currentIndex > fullText.length) clearInterval(intervalId)
    }, 45)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <section id="vision" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Target size={14} />
            Our Vision
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">NOVA</span> Vision
          </h2>
        </motion.div>

        {/* Bento Box for Vision */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-full max-w-4xl mx-auto rounded-3xl p-8 md:p-12 bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 min-h-[80px] md:min-h-[40px] flex items-center justify-center md:justify-start">
              <span className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700 shadow-inner inline-block">
                {displayText}
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-3 h-8 bg-emerald-400 ml-1 translate-y-2"
                />
              </span>
            </h3>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20">
                <Lightbulb size={32} strokeWidth={2.5} />
              </div>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">
                "To build a Visionary network where aspiring innovators and technologists can connect,
                grow, and transform their ideas into impactful solutions — making NOVA a beacon of
                student-driven excellence and innovation."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default VisionSection
