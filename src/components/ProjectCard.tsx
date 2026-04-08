import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  index: number;
}

export default function ProjectCard({ title, category, image, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative aspect-[4/5] overflow-hidden bg-zinc-900 cursor-pointer"
    >
      <motion.img
        src={image}
        alt={title}
        referrerPolicy="no-referrer"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full object-cover opacity-80 group-hover:opacity-100"
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" 
      />
      
      <motion.div 
        initial={{ y: 20 }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 w-full p-8"
      >
        <p className="text-white/50 text-xs uppercase tracking-[0.3em] mb-2">{category}</p>
        <div className="flex justify-between items-end">
          <h3 className="text-white text-3xl font-light tracking-tight">{title}</h3>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500">
            <ArrowUpRight size={20} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
