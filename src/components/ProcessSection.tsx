import { motion, useScroll, useTransform } from 'motion/react';

const STEPS = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your brand's DNA to uncover unique opportunities."
  },
  {
    number: "02",
    title: "Strategy",
    description: "Mapping out a digital roadmap that aligns with your business goals."
  },
  {
    number: "03",
    title: "Design",
    description: "Crafting immersive visual languages that speak to your audience."
  },
  {
    number: "04",
    title: "Development",
    description: "Building robust, high-performance digital products with precision."
  }
];

export default function ProcessSection() {
  return (
    <section className="py-32 px-6 md:px-24 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-8">
          <h2 className="font-display text-5xl md:text-8xl font-bold tracking-tighter">OUR PROCESS</h2>
          <p className="max-w-md text-white/50 text-lg font-light">
            A systematic approach to creativity. We combine rigorous strategy with boundary-pushing design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-32">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <span className="font-display text-8xl md:text-[12rem] font-bold text-white/5 absolute -top-16 -left-8 group-hover:text-white/10 transition-colors duration-500">
                {step.number}
              </span>
              <div className="relative z-10 pl-4 border-l border-white/10 group-hover:border-white transition-colors duration-500">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">{step.title}</h3>
                <p className="text-white/60 text-lg leading-relaxed max-w-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
