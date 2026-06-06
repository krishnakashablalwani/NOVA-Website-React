import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

// Initialize the official Gemini SDK
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

export default function MvsrChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: 'initial',
    role: 'bot',
    text: 'Hello! I am the MVSR Engineering College AI Assistant. How can I help you today?'
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [knowledgeBase, setKnowledgeBase] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch the knowledge baseline asset
    fetch('/mvsr-knowledge.md')
      .then(res => res.text())
      .then(text => setKnowledgeBase(text))
      .catch(err => console.error('Failed to load knowledge base:', err));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (overrideText?: string | React.MouseEvent) => {
    const userText = (typeof overrideText === 'string' ? overrideText : input).trim();
    if (!userText) return;
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: userText,
    };

    setMessages(prev => [...prev, userMessage]);
    if (typeof overrideText !== 'string') {
      setInput('');
    }
    setIsLoading(true);

    try {
      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: userText,
        config: {
          systemInstruction: `You are an expert AI assistant specialized in Maturi Venkata Subba Rao Engineering College (MVSR). Answer user prompts accurately using ONLY the provided knowledge text matrix. If it cannot be answered using this baseline file data, politely say you don't know. Keep your response concise and strictly limit your answer to a maximum of 200 words.\n\nKnowledge Text Matrix:\n${knowledgeBase}`,
        }
      });

      const botMessageId = (Date.now() + 1).toString();
      
      // Append an empty bot message first so we can stream into it
      setMessages(prev => [...prev, { id: botMessageId, role: 'bot', text: '' }]);
      
      // Turn off the general loading indicator since streaming has started
      setIsLoading(false);

      let accumulatedText = '';
      for await (const chunk of responseStream) {
        if (chunk.text) {
          accumulatedText += chunk.text;
          setMessages(prev => 
            prev.map(msg => 
              msg.id === botMessageId ? { ...msg, text: accumulatedText } : msg
            )
          );
        }
      }

    } catch (error) {
      console.error('Error generating content:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: "I encountered an error while trying to process your request. Please ensure the API key is properly configured.",
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-[600px] bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] shadow-blue-900/20">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 text-blue-400">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-100">MVSR AI Assistant</h2>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth">
        {messages.map((message) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={message.id}
            className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
              message.role === 'user' 
                ? 'bg-purple-500/20 text-purple-400' 
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
              message.role === 'user'
                ? 'bg-purple-600/20 border border-purple-500/30 text-purple-50 rounded-tr-sm'
                : 'bg-slate-800/50 border border-slate-700/50 text-slate-200 rounded-tl-sm'
            }`}>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 bg-blue-500/20 text-blue-400">
              <Bot size={16} />
            </div>
            <div className="max-w-[80%] rounded-2xl px-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-tl-sm flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Queries */}
      <div className="px-4 pb-3 bg-slate-900/50">
        <div className="flex flex-wrap gap-2">
          {["What clubs are there?", "What is the next event?", "How can I join?", "Tell me about MVSR"].map((query, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(query)}
              disabled={isLoading || !knowledgeBase}
              className="text-xs px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-100 disabled:opacity-50 disabled:hover:bg-slate-800 disabled:hover:text-slate-300 transition-colors text-left"
            >
              {query}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={knowledgeBase ? "Ask about MVSR..." : "Loading knowledge base..."}
            disabled={isLoading || !knowledgeBase}
            className="w-full bg-slate-950 border border-slate-700 text-slate-100 rounded-full pl-5 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-slate-500 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim() || !knowledgeBase}
            className="absolute right-2 p-2 rounded-full text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors"
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
