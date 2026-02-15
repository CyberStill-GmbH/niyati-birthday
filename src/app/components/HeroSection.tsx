import { motion } from "motion/react";
import { Heart } from "lucide-react";

interface HeroSectionProps {
  onStartAdventure: () => void;
}

export function HeroSection({ onStartAdventure }: HeroSectionProps) {
  const heroImage = new URL("../../assets/images/hero-niyati.jpeg", import.meta.url).href;
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroImage}')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-pink-900/60 via-rose-900/50 to-pink-800/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-16 h-16 mx-auto mb-6 text-rose-200 fill-rose-200" />
          
          <h1 
            className="text-6xl md:text-8xl font-bold text-white mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Happy Birthday, Niyati
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-rose-100 mb-12 max-w-2xl mx-auto"
            style={{ fontFamily: "'Lato', sans-serif" }}
          >
            Celebrating the love of my life and our journey together
          </p>

          <motion.button
            onClick={onStartAdventure}
            className="px-10 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full text-lg font-semibold shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 hover:scale-105"
            style={{ fontFamily: "'Lato', sans-serif" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start the Adventure
          </motion.button>
        </motion.div>

        {/* Floating Hearts Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + 50,
                opacity: 0 
              }}
              animate={{ 
                y: -100,
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                delay: i * 0.8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Heart className="w-6 h-6 text-rose-300 fill-rose-300/40" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}