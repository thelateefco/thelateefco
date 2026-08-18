"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, Sparkles, Bot, Zap, ArrowRight } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  { icon: "💡", text: "What services do you offer?" },
  { icon: "⚡", text: "How fast can we launch a project?" },
  { icon: "🤖", text: "How can AI automations help my business?" },
];

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showTeaser, setShowTeaser] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendPrompt = async (promptText: string) => {
    if (isLoading) return;
    setInput("");
    setError(null);

    const userMessage: Message = { role: "user", content: promptText };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || "Failed to get response");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
    } catch (err) {
      console.error("Chat error:", err);
      setError(err instanceof Error ? err.message : "Failed to get response");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm having trouble responding right now. Feel free to reach out directly via WhatsApp for instant assistance!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;
    await handleSendPrompt(trimmedInput);
  };

  return (
    <>
      {/* Floating Curiosity Teaser Badge (Shows when closed) */}
      <AnimatePresence>
        {!isOpen && showTeaser && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-20 right-6 z-50 hidden sm:flex items-center gap-2 bg-[#140f0a] text-white px-3.5 py-2 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.3)] border border-white/15 text-[0.75rem] font-sans"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="font-medium text-white/90">Have questions? Ask AI!</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
              }}
              className="text-white/40 hover:text-white ml-1"
              aria-label="Dismiss message"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTeaser(false);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#140f0a] text-white shadow-[0_8px_25px_rgba(20,15,10,0.4)] border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
        aria-label={isOpen ? "Close chat" : "Open AI Assistant"}
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4 text-white" />
            <span className="text-[0.75rem] font-sans font-semibold tracking-wider uppercase">Close</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-[0.78rem] font-sans font-semibold tracking-wider uppercase">Ask AI</span>
          </>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-22 right-4 sm:right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-[#E0E0E4] overflow-hidden flex flex-col font-sans"
          >
            {/* Header */}
            <div className="bg-[#140f0a] px-5 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-sans text-[0.95rem] font-bold text-white! tracking-tight leading-none mb-1">
                    AI Assistant
                  </h3>
                  <div className="flex items-center gap-1.5 text-[0.65rem] text-white/60 font-light">
                    <span>The Lateef & Co. Intelligence</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Container */}
            <div className="h-[360px] overflow-y-auto px-4 py-4 bg-[#F8F8FA] space-y-3">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#140f0a] flex items-center justify-center mb-3 shadow-md border border-white/10">
                    <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
                  </div>
                  <h4 className="font-sans text-[1.05rem] font-bold text-[#140f0a]">
                    How can I help you today?
                  </h4>
                  <p className="text-[0.8125rem] text-[#4A4A4A] font-light mt-1 mb-5 max-w-[240px] leading-relaxed">
                    Ask me anything about web development, AI integrations, pricing, or timelines.
                  </p>

                  {/* Suggestion Prompt Chips */}
                  <div className="w-full space-y-2">
                    {QUICK_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendPrompt(prompt.text)}
                        className="w-full text-left p-2.5 rounded-xl bg-white border border-[#E0E0E4] hover:border-[#140f0a]/30 hover:bg-[#F0F0F4] text-[0.78rem] text-[#140f0a] font-normal transition-all duration-200 flex items-center justify-between group shadow-2xs"
                      >
                        <span className="flex items-center gap-2">
                          <span>{prompt.icon}</span>
                          <span>{prompt.text}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#140f0a]/40 group-hover:text-[#140f0a] group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[16px] px-4 py-2.5 text-[0.875rem] font-normal leading-[1.55] ${
                        msg.role === "user"
                          ? "bg-[#140f0a] text-white rounded-br-2xs"
                          : "bg-white text-[#140f0a] shadow-2xs border border-[#E0E0E4] rounded-bl-2xs"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-[16px] rounded-bl-2xs px-4 py-3 shadow-2xs border border-[#E0E0E4]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#140f0a]/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#140f0a]/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#140f0a]/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="text-center text-[0.75rem] text-red-600 font-medium mt-2">
                  ⚠️ {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-[#EAEAEF] p-3 flex items-center gap-2 bg-white"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, pricing, AI..."
                className="flex-1 px-3.5 py-2.5 text-[0.85rem] font-normal text-[#140f0a] bg-[#F5F5F7] border border-[#E0E0E4] rounded-xl focus:outline-none focus:border-[#140f0a] placeholder:text-[#8A8A8A] transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-xl bg-[#140f0a] text-white flex items-center justify-center hover:bg-[#251e18] transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Send className="w-4 h-4 text-white" />
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}