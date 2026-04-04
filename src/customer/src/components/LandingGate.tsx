import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, UtensilsCrossed, Sparkles, ArrowRight, Camera } from 'lucide-react';
import QRScanner from './QRScanner';

interface LandingGateProps {
  onScan: (tableId: string) => void;
}

export default function LandingGate({ onScan }: LandingGateProps) {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleScan = (data: string) => {
    // In a real app, we'd validate the QR data
    // For now, any scan unlocks the app
    onScan(data || "12"); 
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[#FDFCF0] flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-xl px-8 text-center">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="red-gradient p-8 rounded-[3rem] shadow-[0_20px_80px_rgba(234,88,12,0.4)] mb-16 relative group"
          >
            <div className="absolute inset-0 bg-white/20 rounded-[3rem] blur-xl group-hover:blur-2xl transition-all" />
            <UtensilsCrossed className="w-16 h-16 text-white relative z-10" />
          </motion.div>

          <h1 className="text-7xl md:text-9xl font-display font-black tracking-tighter uppercase leading-[0.8] mb-12">
            Taste<br />
            <span className="text-accent italic font-serif lowercase tracking-normal">the</span><br />
            Future
          </h1>

          <p className="text-white/40 text-xl font-medium leading-relaxed mb-20 max-w-md mx-auto">
            Your table is ready. Scan the QR code to unlock a curated dining experience.
          </p>

          <div className="flex flex-col gap-6 w-full max-w-sm">
            <motion.button
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsScannerOpen(true)}
              className="bg-white text-black px-8 py-6 rounded-[2rem] flex items-center justify-center gap-4 shadow-2xl group transition-all"
            >
              <div className="bg-black/5 p-2 rounded-xl group-hover:bg-accent group-hover:text-white transition-colors">
                <QrCode className="w-6 h-6" />
              </div>
              <span className="font-display font-black uppercase tracking-[0.2em] text-sm">Scan Table QR</span>
              <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-2 transition-transform" />
            </motion.button>

            <div className="flex items-center gap-4 p-6 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-md">
              <Sparkles className="w-6 h-6 text-accent" />
              <p className="text-[10px] text-white/30 font-display font-black uppercase tracking-[0.2em] text-left">
                Instant access to digital menu, quick service, and exclusive rewards.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-0 right-0 text-center"
        >
          <p className="text-[10px] font-display font-black text-white/10 uppercase tracking-[0.5em]">
            Powered by TapNOrder Smart Dining
          </p>
        </motion.div>
      </div>

      <QRScanner 
        isOpen={isScannerOpen} 
        onClose={() => setIsScannerOpen(false)} 
        onScan={handleScan} 
      />
    </div>
  );
}
