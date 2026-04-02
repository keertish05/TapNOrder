import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, Info, Camera, Heart, Star, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Dish } from '../types';

interface DishModalProps {
  dish: Dish | null;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number, customizations: any) => void;
  onARClick: (dish: Dish) => void;
}

export default function DishModal({ dish, onClose, onAddToCart, onARClick }: DishModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [customs, setCustoms] = useState({
    extraSpicy: false,
    noOnion: false,
    isJain: false,
    lessOil: false,
    doubleCheese: false,
  });

  if (!dish) return null;

  const toggleCustom = (key: keyof typeof customs) => {
    setCustoms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AnimatePresence>
      {dish && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ y: '100%', opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl bg-bg rounded-t-[3rem] sm:rounded-[3.5rem] overflow-hidden deep-shadow border border-primary/5 max-h-[95vh] flex flex-col"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-6 right-6 z-20 bg-white/80 backdrop-blur-xl p-3 rounded-2xl text-ink border border-primary/5 soft-shadow hover:bg-white transition-colors"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Like Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => setIsLiked(!isLiked)}
              className="absolute top-6 left-6 z-20 bg-white/80 backdrop-blur-xl p-3 rounded-2xl border border-primary/5 soft-shadow hover:bg-white transition-colors"
            >
              <Heart className={`w-6 h-6 transition-colors ${isLiked ? 'fill-primary text-primary' : 'text-ink/20'}`} />
            </motion.button>

            <div className="flex flex-col md:flex-row h-full">
              {/* Image Section */}
              <div className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden bg-bg">
                {dish.videoUrl ? (
                  <motion.video
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src={dish.videoUrl}
                    poster={dish.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <motion.img
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent md:bg-gradient-to-r" />
                
                {/* AR Button */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onARClick(dish)}
                  className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-2xl text-ink text-[10px] font-display font-bold uppercase tracking-widest flex items-center gap-3 border border-primary/5 soft-shadow"
                >
                  <Camera className="w-4 h-4 text-primary" />
                  Experience in AR
                </motion.button>
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 sm:p-12 overflow-y-auto no-scrollbar flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      {dish.popularityBadge && (
                        <div className="bg-accent text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                          <Sparkles className="w-3 h-3 fill-white" />
                          <span className="text-[9px] font-display font-black uppercase tracking-widest">{dish.popularityBadge}</span>
                        </div>
                      )}
                      <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-display font-black uppercase tracking-widest">
                        {dish.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-ink/40 font-display font-bold text-[10px] uppercase tracking-widest">
                        <Star className="w-3 h-3 fill-primary text-primary" />
                        {dish.rating} <span className="opacity-40">(120+ reviews)</span>
                      </div>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl font-display font-black text-ink uppercase leading-[0.9] tracking-tight mb-4">
                      {dish.name}
                    </h2>

                    {/* Portion & Taste Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {dish.portionSize && (
                        <span className="text-[10px] font-display font-bold text-ink/40 uppercase tracking-widest bg-ink/5 px-3 py-1.5 rounded-xl">
                          {dish.portionSize}
                        </span>
                      )}
                      {dish.tasteTags?.map(tag => (
                        <span key={tag} className="text-[10px] font-display font-bold text-primary uppercase tracking-widest bg-primary/5 px-3 py-1.5 rounded-xl">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-ink/40 text-sm font-medium leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="space-y-10 flex-1">
                    {/* Customizations */}
                    <div>
                      <h3 className="text-[10px] font-display font-bold text-ink/20 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                        Tailor your taste <div className="h-px flex-1 bg-primary/5" />
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <CustomToggle
                          active={customs.extraSpicy}
                          onClick={() => toggleCustom('extraSpicy')}
                          label="Extra Spicy 🌶️"
                        />
                        <CustomToggle
                          active={customs.noOnion}
                          onClick={() => toggleCustom('noOnion')}
                          label="No Onion 🚫🧅"
                        />
                        {dish.isJain && (
                          <CustomToggle
                            active={customs.isJain}
                            onClick={() => toggleCustom('isJain')}
                            label="Jain 🟢"
                          />
                        )}
                        <CustomToggle
                          active={customs.lessOil}
                          onClick={() => toggleCustom('lessOil')}
                          label="Less Oil 🫗"
                        />
                        <CustomToggle
                          active={customs.doubleCheese}
                          onClick={() => toggleCustom('doubleCheese')}
                          label="Double Cheese 🧀"
                        />
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-primary/5 soft-shadow flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-12 h-12 rounded-2xl bg-bg border border-primary/5 flex items-center justify-center text-ink/40 hover:text-primary transition-colors"
                        >
                          <Minus className="w-5 h-5" />
                        </motion.button>
                        <span className="text-2xl font-display font-black text-ink w-8 text-center">{quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-12 h-12 rounded-2xl red-gradient flex items-center justify-center text-white deep-shadow"
                        >
                          <Plus className="w-5 h-5" />
                        </motion.button>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-ink/20 font-display font-bold uppercase tracking-widest mb-1">Total</p>
                        <p className="text-3xl font-display font-black text-ink tracking-tighter">₹{dish.price * quantity}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <motion.button
                      whileHover={{ 
                        scale: 1.02, 
                        y: -4,
                        boxShadow: "0 20px 25px -5px rgba(211, 47, 47, 0.4)"
                      }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      onClick={() => onAddToCart(dish, quantity, customs)}
                      className="w-full red-gradient text-white py-6 rounded-[2rem] font-display font-black text-lg uppercase tracking-widest deep-shadow flex items-center justify-center gap-4 transition-all duration-300"
                    >
                      <ShoppingBag className="w-6 h-6" />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CustomToggle({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`px-6 py-3 rounded-2xl text-[10px] font-display font-bold uppercase tracking-widest transition-all border ${
        active
          ? 'bg-primary/10 border-primary text-primary deep-shadow'
          : 'bg-white border-primary/5 text-ink/40 hover:border-primary/20 soft-shadow'
      }`}
    >
      {label}
    </motion.button>
  );
}
