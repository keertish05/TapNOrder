import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Star, Plus, Flame, Sparkles, Users, History } from 'lucide-react';
import { Dish } from '../types';

interface DishCardProps {
  dish: Dish;
  onClick: (dish: Dish) => void;
  onAddToCart: (dish: Dish, quantity: number, customizations: any) => void;
}

export default function DishCard({ dish, onClick, onAddToCart }: DishCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="bg-white rounded-[2.5rem] overflow-hidden soft-shadow border border-primary/5 group cursor-pointer relative flex flex-col h-full transition-shadow hover:shadow-2xl hover:shadow-primary/10"
      onClick={() => onClick(dish)}
    >
      {/* Image Section */}
      <div 
        style={{ transform: "translateZ(40px)" }}
        className="relative aspect-[4/5] overflow-hidden"
      >
        <motion.img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {dish.popularityBadge && (
            <div className="bg-accent text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
              <Sparkles className="w-3 h-3 fill-white" />
              <span className="text-[9px] font-display font-black uppercase tracking-widest">{dish.popularityBadge}</span>
            </div>
          )}
          {dish.isTrending && (
            <div className="bg-primary text-white px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
              <Flame className="w-3 h-3 fill-white" />
              <span className="text-[9px] font-display font-black uppercase tracking-widest">Trending</span>
            </div>
          )}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm border border-white/20">
          <Star className="w-3 h-3 fill-primary text-primary" />
          <span className="text-[10px] font-display font-black text-ink tracking-tighter">{dish.rating}</span>
        </div>

        {/* Veg/Non-Veg Indicator */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md p-1.5 rounded-lg shadow-sm border border-white/20">
          <div className={`w-3 h-3 border-2 ${dish.isVeg ? 'border-green-600' : 'border-red-600'} flex items-center justify-center`}>
            <div className={`w-1.5 h-1.5 ${dish.isVeg ? 'bg-green-600' : 'bg-red-600'} rounded-full`} />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="p-6 flex flex-col flex-1"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-display font-black text-xl text-ink leading-[1.1] uppercase tracking-tight group-hover:text-primary transition-colors">
            {dish.name}
          </h3>
        </div>

        {/* Portion & Taste Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {dish.portionSize && (
            <span className="text-[9px] font-display font-bold text-ink/40 uppercase tracking-widest bg-ink/5 px-2 py-1 rounded-lg">
              {dish.portionSize}
            </span>
          )}
          {dish.tasteTags?.map(tag => (
            <span key={tag} className="text-[9px] font-display font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-1 rounded-lg">
              {tag}
            </span>
          ))}
        </div>

        {/* Activity Indicators */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="w-3 h-3 text-ink/20" />
            <span className="text-[8px] font-display font-bold text-ink/30 uppercase tracking-widest">
              {Math.floor(Math.random() * 5) + 2} at your table ordered this
            </span>
          </div>
          <div className="w-1 h-1 rounded-full bg-ink/10" />
          <div className="flex items-center gap-1.5">
            <History className="w-3 h-3 text-ink/20" />
            <span className="text-[8px] font-display font-bold text-ink/30 uppercase tracking-widest">
              Ordered 12m ago
            </span>
          </div>
        </div>
        
        <p className="text-xs text-ink/40 font-medium line-clamp-2 mb-6 flex-1 leading-relaxed">
          {dish.description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-display font-bold text-ink/20 uppercase tracking-widest mb-0.5">Price</span>
            <span className="text-2xl font-display font-black text-ink tracking-tighter">₹{dish.price}</span>
          </div>
          
          <motion.button
            whileHover={{ 
              scale: 1.1, 
              y: -4,
              boxShadow: "0 20px 25px -5px rgba(211, 47, 47, 0.4)"
            }}
            whileTap={{ scale: 0.95, y: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(dish, 1, {
                extraSpicy: false,
                noOnion: false,
                isJain: false,
                lessOil: false,
                doubleCheese: false,
              });
            }}
            className="red-gradient text-white p-4 rounded-2xl shadow-lg shadow-primary/20 transition-all duration-300"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
