import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, Suspense } from 'react';
import Navbar from './components/Navbar';
import AbstractHero from './components/AbstractHero';
import ProjectCard from './components/ProjectCard';
import SmoothScroll from './components/SmoothScroll';
import ReverseScroll from './components/ReverseScroll';
import AbstractScroll from './components/AbstractScroll';
import CustomCursor from './components/CustomCursor';
import ProcessSection from './components/ProcessSection';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { ArrowRight, Globe, Zap, Shield, Cpu } from 'lucide-react';

const PROJECTS = [
  {
    title: "Ethereal Dreams",
    category: "Digital Experience",
    image: "https://picsum.photos/seed/ethereal/800/1000"
  },
  {
    title: "Neon Pulse",
    category: "Brand Identity",
    image: "https://picsum.photos/seed/neon/800/1000"
  },
  {
    title: "Quantum Flow",
    category: "Web Application",
    image: "https://picsum.photos/seed/quantum/800/1000"
  },
  {
    title: "Silent Void",
    category: "3D Animation",
    image: "https://picsum.photos/seed/void/800/1000"
  }
];

const SERVICES = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Digital Strategy",
    description: "Crafting unique digital paths for forward-thinking brands."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Creative Design",
    description: "Immersive visual experiences that resonate and inspire."
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Tech Innovation",
    description: "Cutting-edge solutions using the latest web technologies."
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Brand Security",
    description: "Ensuring your digital presence is robust and future-proof."
  }
];

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  // Reverse Scroll Transformation
  // This will move the content DOWN while scrolling DOWN
  const reverseY = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  return (
    <SmoothScroll>
      <div ref={containerRef} className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black cursor-none overflow-hidden">
        <div className="noise-overlay" />
        
        <CustomCursor />
        <Navbar />
        
        {/* Global 3D Scroll Scene */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <Environment preset="city" />
              <AbstractScroll progress={smoothProgress} />
              <ContactShadows position={[0, -10, 0]} opacity={0.2} scale={20} blur={2} far={4.5} />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10">
          {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-black">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <Suspense fallback={null}>
                <AbstractHero />
                <Environment preset="city" />
              </Suspense>
            </Canvas>
          </div>
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 text-center px-6"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/60 uppercase tracking-[0.5em] text-xs mb-6"
            >
              Creative Digital Agency
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-display text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-8"
            >
              WE BUILD <br />
              <span className="text-stroke">FUTURE</span> SITES
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-px h-24 bg-gradient-to-b from-white to-transparent" />
              <p className="text-white/40 text-xs uppercase tracking-widest">Scroll to explore</p>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-6 md:px-24 relative z-10">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 leading-tight">
                CRAFTING <br />
                PURE <br />
                ESSENCE.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="text-white/60 text-lg md:text-xl font-light leading-relaxed"
            >
              <p className="mb-6">
                Our approach to design is like distilling a fine spirit. We remove the noise, 
                leaving only the pure essence of your brand. Every pixel is intentional, every motion is purposeful.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Product Showcase Section */}
        <section className="h-[200vh] relative z-10 px-6">
          <div className="sticky top-0 h-screen flex flex-col justify-center items-center">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center max-w-2xl"
            >
              <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter mb-8">
                THE FALL <br />
                OF <span className="text-stroke">PERFECTION</span>
              </h2>
              <p className="text-white/40 uppercase tracking-[0.3em] text-sm">
                Watch as gravity defines the form.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="py-32 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
              <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter">SELECTED WORK</h2>
              <p className="hidden md:block text-white/40 text-sm uppercase tracking-widest mb-4">/ 2024 - 2026</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Reverse Scroll Section */}
        <ReverseScroll />

        {/* Process Section */}
        <ProcessSection />

        {/* Services Section */}
        <section id="services" className="py-32 bg-zinc-950 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-24 text-center">OUR EXPERTISE</h2>
            <div className="grid md:grid-cols-4 gap-12">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="p-8 border border-white/5 hover:border-white/20 transition-colors group"
                >
                  <div className="mb-6 text-white/40 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    viewport={{ once: true }}
                    className="text-xl font-medium mb-4"
                  >
                    {service.title}
                  </motion.h3>
                  <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-32 px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-display text-6xl md:text-9xl font-bold tracking-tighter mb-12">
              HAVE AN <br />
              <span className="text-stroke">IDEA?</span>
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 bg-white text-black rounded-full font-bold uppercase tracking-widest text-lg hover:bg-zinc-200 transition-colors"
            >
              Let's Talk
            </motion.button>
            <div className="mt-32 flex flex-col md:flex-row justify-between items-center gap-8 text-white/40 text-sm uppercase tracking-widest">
              <p>© 2026 Verstu Agency. All rights reserved.</p>
              <div className="flex gap-8">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </SmoothScroll>
  );
}
