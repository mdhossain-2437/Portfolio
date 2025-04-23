import { useState, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

// Implement code splitting for sections that are below the fold
// Only load components when they're needed using React.lazy
const About = lazy(() => import("@/components/sections/About"));
const Skills = lazy(() => import("@/components/sections/Skills"));
const Projects = lazy(() => import("@/components/sections/Projects"));
const Services = lazy(() => import("@/components/sections/Services"));
const Dream = lazy(() => import("@/components/sections/Dream"));
const Testimonials = lazy(() => import("@/components/sections/Testimonials"));
const Contact = lazy(() => import("@/components/sections/Contact"));

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        
        {/* Load these components only when they're about to be viewed */}
        <Suspense fallback={<div className="h-screen flex items-center justify-center">
          <div className="animate-pulse-glow bg-primary/20 rounded-full h-12 w-12"></div>
        </div>}>
          <About />
        </Suspense>
        
        <Suspense fallback={<div className="h-screen flex items-center justify-center">
          <div className="animate-pulse-glow bg-primary/20 rounded-full h-12 w-12"></div>
        </div>}>
          <Skills />
        </Suspense>
        
        <Suspense fallback={<div className="h-screen flex items-center justify-center">
          <div className="animate-pulse-glow bg-primary/20 rounded-full h-12 w-12"></div>
        </div>}>
          <Projects />
        </Suspense>
        
        <Suspense fallback={<div className="h-screen flex items-center justify-center">
          <div className="animate-pulse-glow bg-primary/20 rounded-full h-12 w-12"></div>
        </div>}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<div className="h-screen flex items-center justify-center">
          <div className="animate-pulse-glow bg-primary/20 rounded-full h-12 w-12"></div>
        </div>}>
          <Dream />
        </Suspense>
        
        <Suspense fallback={<div className="h-screen flex items-center justify-center">
          <div className="animate-pulse-glow bg-primary/20 rounded-full h-12 w-12"></div>
        </div>}>
          <Testimonials />
        </Suspense>
        
        <Suspense fallback={<div className="h-screen flex items-center justify-center">
          <div className="animate-pulse-glow bg-primary/20 rounded-full h-12 w-12"></div>
        </div>}>
          <Contact onChatOpen={() => setShowChat(true)} />
        </Suspense>
      </main>
      <Footer />
      <ChatBot show={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
}
