import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, GraduationCap, Users, HeartHandshake, Zap } from 'lucide-react'

const MissionSection: React.FC = () => {
  const missions = [
    {
      icon: <GraduationCap size={28} />,
      title: "Bridge Academic & Practical",
      desc: "To bridge the gap between academic learning and practical application through workshops, seminars, events and real-time projects."
    },
    {
      icon: <Zap size={28} />,
      title: "Platform for Ideas",
      desc: "To provide a platform for every student to share, represent, and develop their breakthrough ideas."
    },
    {
      icon: <Users size={28} />,
      title: "Foster Collaboration",
      desc: "To encourage collaboration across domains and foster a spirit of teamwork, leadership, and innovation."
    },
    {
      icon: <HeartHandshake size={28} />,
      title: "Learning Community",
      desc: "To create a community that celebrates curiosity, experimentation, and continuous learning."
    }
  ]

  return (
    <section id="mission" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Rocket size={14} />
            Our Mission
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Driving <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Innovation</span> Forward
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-4 md:gap-6">
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="group relative p-8 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 hover:border-slate-700 transition-colors duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 group-hover:bg-emerald-400/10 transition-all duration-300">
                  {mission.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{mission.title}</h3>
                <p className="text-slate-400 leading-relaxed">
                  {mission.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MissionSection
