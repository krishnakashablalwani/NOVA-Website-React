import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import MvsrChatbot from './MvsrChatbot';

export default function GlobalChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-[400px] shadow-2xl origin-bottom-right"
          >
            <div className="relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 p-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-full transition-colors backdrop-blur-md"
              >
                <X size={16} />
              </button>
              {/* Force the chatbot to fit the container perfectly without its own huge margins if any */}
              <div className="[&>div]:mx-0 [&>div]:shadow-none [&>div]:border-slate-700/50">
                <MvsrChatbot />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-14 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-transform hover:scale-110 active:scale-95"
      >
        {isOpen ? <X size={26} /> : <Bot size={28} />}
      </button>
    </div>
  );
}
