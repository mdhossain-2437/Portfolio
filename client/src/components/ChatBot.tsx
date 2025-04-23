import { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User } from "lucide-react";
import { chatBotResponses } from "@/utils/chatBotResponses";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "user";
}

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Helper function to find the closest matching response
const findResponse = (input: string): string => {
  const normalizedInput = input.toLowerCase().trim();
  
  // Check for keyword matches in the input
  for (const [keyword, response] of Object.entries(chatBotResponses)) {
    if (normalizedInput.includes(keyword.toLowerCase())) {
      return response;
    }
  }
  
  // Default response if no keywords match
  return chatBotResponses.default;
};

interface ChatBotProps {
  show: boolean;
  onClose: () => void;
}

export default memo(function ChatBot({ show, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: generateId(),
      text: "Hi there! I'm Delowar's virtual assistant. How can I help you today?",
      sender: "bot"
    }
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle user message submission
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: generateId(),
      text: input,
      sender: "user"
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate bot "typing" with a delay
    setIsBotTyping(true);
    
    // Delayed bot response to simulate thinking
    setTimeout(() => {
      const botMessage: Message = {
        id: generateId(),
        text: findResponse(input),
        sender: "bot"
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsBotTyping(false);
    }, 1500);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 w-80 md:w-96 h-96 rounded-xl shadow-2xl overflow-hidden flex flex-col neo-brutal-lg bg-gray-900 border border-gray-800"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Chat Header */}
          <div className="bg-primary text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="w-6 h-6 mr-2" />
              <h3 className="font-medium">Delowar's Assistant</h3>
            </div>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-950/50">
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className={`max-w-3/4 rounded-lg p-3 ${
                      message.sender === "user" 
                        ? "bg-primary/20 text-white ml-8" 
                        : "bg-gray-800 text-white mr-8"
                    }`}
                  >
                    <div className="flex items-start mb-1">
                      {message.sender === "bot" ? (
                        <Bot className="w-4 h-4 mr-1 mt-1 text-primary" />
                      ) : (
                        <User className="w-4 h-4 mr-1 mt-1 text-primary" />
                      )}
                      <span className="text-xs text-gray-400">
                        {message.sender === "bot" ? "Assistant" : "You"}
                      </span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {/* Bot typing indicator */}
              {isBotTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-gray-800 text-white rounded-lg p-3 mr-8">
                    <div className="flex items-center">
                      <Bot className="w-4 h-4 mr-1 text-primary" />
                      <span className="text-xs text-gray-400 mr-2">Assistant</span>
                      <span className="flex space-x-1">
                        <motion.span 
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
                          animate={{ y: [0, -3, 0] }} 
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.span 
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
                          animate={{ y: [0, -3, 0] }} 
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.span 
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full" 
                          animate={{ y: [0, -3, 0] }} 
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Chat Input */}
          <div className="p-3 bg-gray-900 border-t border-gray-800">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-l-lg focus:outline-none"
                disabled={isBotTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isBotTyping}
                className={`bg-primary text-white px-4 py-2 rounded-r-lg ${
                  !input.trim() || isBotTyping ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90"
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});