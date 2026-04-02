import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { motion, AnimatePresence } from 'motion/react';
import { X, QrCode, Sparkles } from 'lucide-react';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (decodedText: string) => void;
}

export default function QRScanner({ isOpen, onClose, onScan }: QRScannerProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );
      
      scanner.render(
        (decodedText) => {
          onScan(decodedText);
          scanner.clear();
          onClose();
        },
        (errorMessage) => {
          // Silent errors are common during scanning
          console.log(errorMessage);
        }
      );

      scannerRef.current = scanner;

      return () => {
        if (scannerRef.current) {
          scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
        }
      };
    }
  }, [isOpen, onScan, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[3rem] overflow-hidden deep-shadow border border-primary/5"
          >
            <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-white/50 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="red-gradient p-3 rounded-2xl text-white shadow-lg shadow-primary/20">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-black text-ink uppercase tracking-tight">Scan Table QR</h3>
                  <p className="text-[10px] font-display font-black text-ink/20 uppercase tracking-[0.2em]">Point camera at table code</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-3 hover:bg-primary/5 rounded-2xl transition-colors text-ink/20 hover:text-primary"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8">
              <div id="qr-reader" className="rounded-[2rem] overflow-hidden border-4 border-primary/10 soft-shadow" />
              
              <div className="mt-8 flex items-center gap-4 p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                <Sparkles className="w-6 h-6 text-primary" />
                <p className="text-xs text-ink/60 font-medium leading-relaxed">
                  Scanning your table QR will automatically link your session and unlock curated recommendations.
                </p>
              </div>
            </div>

            <div className="p-8 bg-bg/50 border-t border-primary/5 text-center">
              <p className="text-[10px] font-display font-black text-ink/10 uppercase tracking-[0.4em]">Secure Session Linking</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
