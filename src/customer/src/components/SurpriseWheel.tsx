import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Sparkles, X } from "lucide-react";

export default function SurpriseWheel({ isOpen, onClose, onResult, dishes = [] }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);

  // safety check (prevents crash)
  if (!dishes || dishes.length === 0) return null;

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const randomOffset = Math.floor(Math.random() * 360);
    const finalRotation = rotation + extraSpins * 360 + randomOffset;

    setRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);

      const normalizedRotation = finalRotation % 360;
      const index =
        Math.floor((360 - normalizedRotation) / (360 / dishes.length)) %
        dishes.length;

      onResult && onResult(dishes[index]);
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
        {/* Background overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="relative w-full max-w-md bg-white rounded-[3rem] p-8 text-center shadow-2xl overflow-hidden"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-red-500"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Spice Wheel
            </h2>
            <p className="text-red-500 text-xs uppercase tracking-widest">
              Let fate decide your meal
            </p>
          </div>

          {/* Wheel */}
          <div className="relative w-72 h-72 mx-auto mb-10">
            {/* Pointer */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[14px] border-t-white translate-y-2" />
            </div>

            {/* Rotating wheel */}
            <motion.div
              ref={wheelRef}
              animate={{ rotate: rotation }}
              transition={{ duration: 4, ease: [0.15, 0, 0.15, 1] }}
              className="w-full h-full rounded-full border-8 border-white shadow-xl relative overflow-hidden bg-gray-100"
            >
              {dishes.map((dish, i) => (
                <div
                  key={dish.id || i}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 origin-bottom flex flex-col items-center pt-6"
                  style={{
                    transform: `translateX(-50%) rotate(${
                      i * (360 / dishes.length)
                    }deg)`
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 rounded-xl overflow-hidden shadow-md mb-2"
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <span className="text-[10px] font-semibold text-gray-700 truncate max-w-[60px]">
                    {dish.name}
                  </span>
                </div>
              ))}

              {/* Divider lines */}
              {dishes.map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-1/2 bg-gray-300 origin-bottom"
                  style={{
                    transform: `translateX(-50%) rotate(${
                      i * (360 / dishes.length) + 180 / dishes.length
                    }deg)`
                  }}
                />
              ))}
            </motion.div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{ scale: isSpinning ? [1, 1.2, 1] : 1 }}
                transition={{
                  duration: 0.5,
                  repeat: isSpinning ? Infinity : 0
                }}
                className="w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-gray-100"
              >
                <Sparkles className="w-8 h-8 text-red-500" />
              </motion.div>
            </div>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={spin}
            disabled={isSpinning}
            className={`w-full py-4 rounded-full font-semibold text-lg transition ${
              isSpinning
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
            }`}
          >
            {isSpinning ? "Spinning..." : "Spin the Wheel"}
          </motion.button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}