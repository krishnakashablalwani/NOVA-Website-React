import React from 'react'
import EventBook from '../EventBook/EventBook'

const AboutSection: React.FC = (): React.JSX.Element => {
  return (
    <section id="about" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Do</span>
          </h2>
        </div>

        <div className="w-full flex justify-center" data-aos="fade-up">
          <EventBook />
        </div>
      </div>
    </section>
  )
}

export default AboutSection
