import React from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { ExecutiveMember } from './types'

const executiveBoard: ExecutiveMember[] = [
  { name: 'Eshank',    role: 'President',                       image: '/images/hero/eshank.jpeg' },
  { name: 'Sana',      role: 'Strategies & Planning Lead',      image: '/images/hero/sana.jpeg' },
  { name: 'Shruthi',   role: 'Human Resources Lead',            image: '/images/hero/shruti.jpeg' },
  { name: 'Archita',   role: 'Content Writer Lead',             image: '/images/hero/archita.jpeg' },
  { name: 'Varshitha', role: 'Social Media Management Lead',    image: '/images/hero/varshitha.jpeg' },
  { name: 'Hetal',     role: 'Marketing Lead',                  image: '/images/hero/hetal.jpeg' },
  { name: 'Zayed Ali', role: 'Graphic Design Lead',             image: '/images/hero/zayed.jpeg' },
  { name: 'Shivani',   role: 'Photography Lead',                image: '/images/hero/shivani.jpeg' },
  { name: 'Lalasa',    role: 'SPA Co-Lead',                     image: '/images/hero/lalasa.jpeg' },
  { name: 'Ashmitha',  role: 'Treasurer & Logistics Lead',      image: '/images/hero/ashmita.jpeg' },
]

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Users size={14} />
            The Team
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Executive Board</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {executiveBoard.map((member, index) => (
            <motion.div
              key={`${member.name}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, type: "spring", stiffness: 100 }}
              className="group flex flex-col w-64 rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-300"
            >
              <div className="w-full relative overflow-hidden shrink-0" style={{ aspectRatio: '1/1' }}>
                {/* Fallback gradient if image fails or is loading */}
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              
              {/* Frosted Glass Text Footer */}
              <div className="w-full p-5 flex flex-col items-start justify-center grow bg-slate-800/40 backdrop-blur-xl border-t border-slate-700/50 z-20 transition-colors duration-300 group-hover:bg-slate-800/60 relative">
                {/* Subtle gradient glow inside the footer */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors relative z-10">{member.name}</h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed relative z-10">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamSection
