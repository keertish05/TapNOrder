import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, Box } from 'lucide-react';

export default function ARPreview({ isOpen, onClose, dishName }: { isOpen: boolean; onClose: () => void; dishName: string }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl aspect-[9/16] sm:aspect-video bg-ink rounded-[3rem] overflow-hidden deep-shadow border border-white/10"
          >
            {/* Mock Camera Feed */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-30 grayscale" />
            
            {/* AR Overlay UI */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative w-72 h-72"
              >
                <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-ping" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Box className="w-40 h-40 text-primary opacity-60" />
                </div>
                {/* Mock Dish Size Indicator */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 text-white text-[10px] font-black whitespace-nowrap tracking-[0.2em] uppercase">
                  ACTUAL SIZE: 12" PLATE
                </div>
              </motion.div>
            </div>

            {/* Camera UI Elements */}
            <div className="absolute top-10 left-10 right-10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white border border-white/10">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white text-xs font-black uppercase tracking-[0.3em]">AR Preview</p>
                  <p className="text-primary text-[10px] font-black uppercase tracking-widest">{dishName}</p>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose} 
                className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/10"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            <div className="absolute bottom-10 left-10 right-10 flex justify-center">
              <div className="bg-white/10 backdrop-blur-xl p-3 rounded-[2.5rem] border border-white/10 flex gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 red-gradient text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl"
                >
                  Capture
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] border border-white/10"
                >
                  360° View
                </motion.button>
              </div>
            </div>

            {/* Scanning Lines */}
            <motion.div
              animate={{ y: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-0.5 bg-primary/40 shadow-[0_0_20px_rgba(229,57,53,0.6)] z-10"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
