import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Trophy, RotateCcw } from "lucide-react";

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Position {
  x: number;
  y: number;
}

interface HeartItem {
  id: number;
  x: number;
  y: number;
  collected: boolean;
  message: string;
}

const loveMessages = [
  "You make every day brighter! ✨",
  "Your smile is my favorite view 💕",
  "Forever grateful for you 🌟",
  "You're my best adventure 🎈",
  "Love you to the moon and back 🌙",
];

export function GameModal({ isOpen, onClose }: GameModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [playerPos, setPlayerPos] = useState<Position>({ x: 50, y: 450 });
  const [hearts, setHearts] = useState<HeartItem[]>([]);
  const [score, setScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const [currentMessage, setCurrentMessage] = useState("");
  
  const playerSize = 40;
  const heartSize = 30;
  const canvasWidth = 800;
  const canvasHeight = 500;

  // Initialize hearts
  useEffect(() => {
    if (isOpen) {
      const newHearts: HeartItem[] = loveMessages.map((message, i) => ({
        id: i,
        x: 100 + (i * 140),
        y: 100 + ((i % 2) * 200),
        collected: false,
        message,
      }));
      setHearts(newHearts);
      setPlayerPos({ x: 50, y: 450 });
      setScore(0);
      setGameWon(false);
      setCurrentMessage("");
    }
  }, [isOpen]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        e.preventDefault();
        setKeysPressed(prev => new Set(prev).add(e.key));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.key);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Game loop
  useEffect(() => {
    if (!isOpen || gameWon) return;

    const gameLoop = setInterval(() => {
      setPlayerPos(prev => {
        let newX = prev.x;
        let newY = prev.y;
        const speed = 5;

        if (keysPressed.has('ArrowLeft') || keysPressed.has('a')) newX -= speed;
        if (keysPressed.has('ArrowRight') || keysPressed.has('d')) newX += speed;
        if (keysPressed.has('ArrowUp') || keysPressed.has('w')) newY -= speed;
        if (keysPressed.has('ArrowDown') || keysPressed.has('s')) newY += speed;

        // Boundaries
        newX = Math.max(0, Math.min(canvasWidth - playerSize, newX));
        newY = Math.max(0, Math.min(canvasHeight - playerSize, newY));

        return { x: newX, y: newY };
      });

      // Check collisions with hearts
      setHearts(prevHearts => {
        const updatedHearts = prevHearts.map(heart => {
          if (!heart.collected) {
            const distance = Math.sqrt(
              Math.pow(playerPos.x + playerSize / 2 - heart.x, 2) +
              Math.pow(playerPos.y + playerSize / 2 - heart.y, 2)
            );

            if (distance < (playerSize / 2 + heartSize / 2)) {
              setScore(prev => prev + 1);
              setCurrentMessage(heart.message);
              setTimeout(() => setCurrentMessage(""), 2000);
              return { ...heart, collected: true };
            }
          }
          return heart;
        });

        // Check if all hearts collected
        if (updatedHearts.every(h => h.collected) && !gameWon) {
          setGameWon(true);
        }

        return updatedHearts;
      });
    }, 1000 / 60); // 60 FPS

    return () => clearInterval(gameLoop);
  }, [isOpen, keysPressed, playerPos, gameWon]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#1e1b4b';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw grid
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvasWidth; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvasHeight);
      ctx.stroke();
    }
    for (let i = 0; i < canvasHeight; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvasWidth, i);
      ctx.stroke();
    }

    // Draw hearts
    hearts.forEach(heart => {
      if (!heart.collected) {
        ctx.fillStyle = '#ec4899';
        ctx.beginPath();
        const x = heart.x;
        const y = heart.y;
        const size = heartSize;
        
        ctx.moveTo(x, y + size * 0.3);
        ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size * 0.3);
        ctx.bezierCurveTo(x - size / 2, y + size * 0.6, x, y + size * 0.9, x, y + size);
        ctx.bezierCurveTo(x, y + size * 0.9, x + size / 2, y + size * 0.6, x + size / 2, y + size * 0.3);
        ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size * 0.3);
        ctx.fill();

        // Glow effect
        ctx.shadowColor = '#ec4899';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    // Draw player (character)
    ctx.fillStyle = '#fbbf24';
    ctx.fillRect(playerPos.x, playerPos.y, playerSize, playerSize);
    
    // Draw player face
    ctx.fillStyle = '#000';
    ctx.fillRect(playerPos.x + 10, playerPos.y + 12, 6, 6); // Left eye
    ctx.fillRect(playerPos.x + 24, playerPos.y + 12, 6, 6); // Right eye
    ctx.fillRect(playerPos.x + 12, playerPos.y + 26, 16, 4); // Smile

    // Player glow
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#fbbf24';
    ctx.shadowBlur = 10;
    ctx.strokeRect(playerPos.x, playerPos.y, playerSize, playerSize);
    ctx.shadowBlur = 0;

  }, [playerPos, hearts, canvasWidth, canvasHeight]);

  const resetGame = () => {
    const newHearts: HeartItem[] = loveMessages.map((message, i) => ({
      id: i,
      x: 100 + (i * 140),
      y: 100 + ((i % 2) * 200),
      collected: false,
      message,
    }));
    setHearts(newHearts);
    setPlayerPos({ x: 50, y: 450 });
    setScore(0);
    setGameWon(false);
    setCurrentMessage("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-3xl p-6 max-w-4xl w-full relative border-4 border-pink-500/30"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-4">
              <h3 
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Niyati's Birthday Adventure
              </h3>
              <div className="flex items-center gap-6 text-pink-300" style={{ fontFamily: "'Lato', sans-serif" }}>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span>Hearts: {score}/{loveMessages.length}</span>
                </div>
                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            </div>

            <div className="relative">
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className="w-full border-4 border-purple-500/30 rounded-xl"
              />

              {currentMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-pink-500 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl"
                  style={{ fontFamily: "'Lato', sans-serif" }}
                >
                  {currentMessage}
                </motion.div>
              )}

              {gameWon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-black/80 rounded-xl flex items-center justify-center"
                >
                  <div className="text-center">
                    <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4" />
                    <h4 
                      className="text-4xl font-bold text-white mb-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      You Won! 🎉
                    </h4>
                    <p 
                      className="text-2xl text-pink-300 mb-6"
                      style={{ fontFamily: "'Lato', sans-serif" }}
                    >
                      Happy Birthday, Niyati! 💖
                    </p>
                    <button
                      onClick={resetGame}
                      className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold hover:scale-105 transition-transform"
                    >
                      Play Again
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <p 
              className="text-center text-pink-200 mt-4"
              style={{ fontFamily: "'Lato', sans-serif" }}
            >
              Use Arrow Keys or WASD to move • Collect all hearts to win!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
