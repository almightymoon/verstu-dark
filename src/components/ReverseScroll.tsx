import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const IMAGES_LEFT = [
  "https://picsum.photos/seed/arch1/800/1200",
  "https://picsum.photos/seed/arch2/800/1200",
  "https://picsum.photos/seed/arch3/800/1200",
];

const IMAGES_RIGHT = [
  "https://picsum.photos/seed/tech1/800/1200",
  "https://picsum.photos/seed/tech2/800/1200",
  "https://picsum.photos/seed/tech3/800/1200",
];

export default function ReverseScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const yRight = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-zinc-950 overflow-hidden py-32">
      <div className="sticky top-0 h-screen flex gap-4 px-4 md:px-12 items-center">
        
        {/* Left Column - Scrolls Up */}
        <div className="flex-1 h-full overflow-hidden relative">
          <motion.div style={{ y: yLeft }} className="flex flex-col gap-4">
            {[...IMAGES_LEFT, ...IMAGES_LEFT].map((src, i) => (
              <div key={i} className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-zinc-900">
                <img src={src} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Center Text */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <h2 className="text-6xl md:text-9xl font-display font-bold tracking-tighter text-white mix-blend-difference text-center">
            REVERSE<br/>PERSPECTIVE
          </h2>
        </div>

        {/* Right Column - Scrolls Down */}
        <div className="flex-1 h-full overflow-hidden relative">
          <motion.div style={{ y: yRight }} className="flex flex-col gap-4">
            {[...IMAGES_RIGHT, ...IMAGES_RIGHT].map((src, i) => (
              <div key={i} className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-zinc-900">
                <img src={src} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
