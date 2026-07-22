"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    setError(null);
    const userMessage: Message = { role: "user", content: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
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
    } catch (error) {
      console.error("Chat error:", error);
      setError(error instanceof Error ? error.message : "Failed to get response");
      setMessages((prev) => [
        ...prev,
        { 
          role: "assistant", 
          content: "I'm having trouble responding right now. Please try again later or contact us directly via WhatsApp." 
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button - Now with text instead of icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full bg-[#1e1006] text-[#FFFFFF] shadow-lg hover:bg-[#2d180a] transition-colors duration-300 flex items-center gap-2"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4" />
            <span className="text-[0.7rem] font-light tracking-[0.05em]">Close</span>
          </>
        ) : (
          <>
            <MessageCircle className="w-4 h-4" />
            <span className="text-[0.7rem] font-light tracking-[0.05em]">AI</span>
          </>
        )}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-[#FFFFFF] rounded-[16px] shadow-2xl border border-[#E8E8EC] overflow-hidden"
          >
            {/* ✅ Header - Now with white text */}
            <div className="bg-[#1e1006] px-5 py-4">
              <h3 className="font-serif text-[1.1rem] font-medium text-[#FFFFFF]!">
                The Lateef & Co.
              </h3>
              <p className="text-[0.6rem] text-[#8A8A8A] font-light tracking-[0.1em] uppercase">
                AI Agent
              </p>
            </div>

            {/* Messages */}
            <div className="h-[350px] overflow-y-auto px-4 py-4 bg-[#F5F5F7]">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-10 h-10 rounded-full bg-[#1e1006] flex items-center justify-center mb-3">
                    <MessageCircle className="w-5 h-5 text-[#FFFFFF]" />
                  </div>
                  <p className="font-serif text-[1rem] font-medium text-[#000000]">
                    Hello! 👋
                  </p>
                  <p className="text-[0.8125rem] text-[#4A4A4A] font-light mt-1 max-w-[220px]">
                    Ask me about our services or how we can help your business.
                  </p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    } mb-3`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[12px] px-4 py-2.5 ${
                        msg.role === "user"
                          ? "bg-[#1e1006] text-[#FFFFFF]"
                          : "bg-[#FFFFFF] text-[#000000] shadow-sm border border-[#E8E8EC]"
                      }`}
                    >
                      <p className="text-[0.875rem] font-light leading-[1.5] whitespace-pre-wrap">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start mb-3">
                  <div className="bg-[#FFFFFF] rounded-[12px] px-4 py-2.5 shadow-sm border border-[#E8E8EC]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-[#1e1006]/30 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-[#1e1006]/30 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-[#1e1006]/30 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              {error && (
                <div className="text-center text-[0.7rem] text-[#B91C1C] font-light mt-2">
                  ⚠️ {error}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-[#E8E8EC] p-3 flex gap-2 bg-[#FFFFFF]"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2.5 text-[0.875rem] font-light text-[#000000] bg-[#F5F5F7] border-none rounded-[8px] focus:outline-none focus:ring-1 focus:ring-[#1e1006] placeholder:text-[#8A8A8A]"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-3.5 py-2.5 rounded-[8px] bg-[#1e1006] text-[#FFFFFF] hover:bg-[#2d180a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center py-1.5 bg-[#F5F5F7] border-t border-[#E8E8EC]">
              <p className="text-[0.5rem] text-[#8A8A8A] font-light tracking-[0.05em]">
                AI-powered assistant · The Lateef & Co.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}