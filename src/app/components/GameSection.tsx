import { motion } from "motion/react";
import { Gamepad2, Play, Trophy } from "lucide-react";
import { useState } from "react";
import { GameModal } from "./GameModal";

export function GameSection() {
  const [isGameOpen, setIsGameOpen] = useState(false);

  return (
    <>
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Pixel Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '30px 30px'
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Gamepad2 className="w-12 h-12 text-pink-400" />
              <h2 
                className="text-5xl md:text-6xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Niyati's World: The Video Game
              </h2>
            </div>
            
            <p 
              className="text-xl md:text-2xl text-pink-200 mb-12 max-w-2xl mx-auto"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              A custom level created just for you. Collect hearts and unlock special memories!
            </p>

            {/* Game Preview Card */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 mb-8 border-4 border-pink-500/30 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-video bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                {/* Game Thumbnail Graphics */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      y: [0, -20, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Trophy className="w-32 h-32 text-yellow-300" />
                  </motion.div>
                </div>
                
                {/* Floating pixels */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-pink-300 rounded-sm"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      opacity: [0.2, 1, 0.2],
                      scale: [0.8, 1.2, 0.8],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-8">
                  <span 
                    className="text-white text-3xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    LEVEL: NIYATI'S BIRTHDAY
                  </span>
                </div>
              </div>

              <motion.button
                onClick={() => setIsGameOpen(true)}
                className="px-12 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-full text-2xl font-bold shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 inline-flex items-center gap-3"
                style={{ fontFamily: "'Lato', sans-serif" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-8 h-8 fill-white" />
                Play Now
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20">
                <h3 
                  className="text-xl font-bold text-pink-300 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Collect Hearts
                </h3>
                <p 
                  className="text-pink-100"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Gather all the hearts scattered throughout the level
                </p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20">
                <h3 
                  className="text-xl font-bold text-pink-300 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Unlock Memories
                </h3>
                <p 
                  className="text-pink-100"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Each heart reveals a special message just for you
                </p>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20">
                <h3 
                  className="text-xl font-bold text-pink-300 mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Beat the Score
                </h3>
                <p 
                  className="text-pink-100"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  Complete the level to see your birthday surprise
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <GameModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
    </>
  );
}
