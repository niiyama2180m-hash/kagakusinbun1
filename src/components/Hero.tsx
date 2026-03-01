import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/architecture/1920/1080"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 font-display"
        >
          未知への入口
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto opacity-90"
        >
          想像と現実の架け橋となる、インタラクティブな体験を創造します。
        </motion.p>
        
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12"
        >
            <a href="#pick-up" className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 rounded-full text-sm tracking-widest uppercase">
                実績を見る
            </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-widest uppercase opacity-70">Scroll</span>
        <div className="w-[1px] h-12 bg-white/50 relative overflow-hidden">
            <motion.div 
                animate={{ y: [0, 50] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
        </div>
      </motion.div>
    </section>
  );
}
