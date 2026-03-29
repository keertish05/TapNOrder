import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import { Flame, Star, Sparkles, Gift, ArrowRight, MousePointer2, Search, Filter, Music } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DISHES, MOODS } from "../data";
import DishCard from "../components/DishCard";
import DishModal from "../components/DishModal";
import LiveOrderStatus, { OrderStep } from '../components/LiveOrderStatus';
import Billboard from '../components/Billboard';
import QuickButtons from '../components/QuickButtons';
import SongRequest from '../components/SongRequest';
import ARPreview from '../components/ARPreview';
import SurpriseWheel from '../components/SurpriseWheel';
import Magnetic from '../components/Magnetic';
import { Dish } from '../types';

interface MenuProps {
  onAddToCart: (dish: Dish, quantity: number, customs: any) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const moodParam = searchParams.get('mood');

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMood, setSelectedMood] = useState<string | null>(moodParam);
  
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [arDish, setArDish] = useState<Dish | null>(null);
  const [surpriseDish, setSurpriseDish] = useState<Dish | null>(null);
  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState<OrderStep>('preparing');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (orderStatus === 'preparing') setOrderStatus('cooking');
      else if (orderStatus === 'cooking') setOrderStatus('ready');
    }, 45000);
    return () => clearTimeout(timer);
  }, [orderStatus]);

  useEffect(() => {
    if (moodParam) {
      setSelectedMood(moodParam);
    }
  }, [moodParam]);

  const categories = ['All', ...Array.from(new Set(DISHES.map(d => d.category)))];

  const filteredDishes = useMemo(() => {
    return DISHES.filter(dish => {
      const categoryMatch = selectedCategory === 'All' || dish.category === selectedCategory;
      const moodMatch = !selectedMood || (dish.moods && dish.moods.includes(selectedMood));
      return categoryMatch && moodMatch;
    });
  }, [selectedCategory, selectedMood]);

  const handleSurprise = () => {
    setIsWheelOpen(true);
  };

  const handleWheelResult = (dish: Dish) => {
    setSurpriseDish(dish);
    setIsWheelOpen(false);
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const activeMood = MOODS.find(m => m.id === selectedMood);

  return (
    <div className="min-h-screen bg-bg pt-28 pb-32 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100] shadow-[0_0_15px_rgba(211,47,47,0.3)]"
        style={{ scaleX }}
      />

      <main className="max-w-7xl mx-auto px-4 space-y-20">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 text-primary mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-display font-bold uppercase tracking-[0.3em]">Spice Villa Menu</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-display font-black text-ink uppercase leading-[0.9] tracking-tight">
              Curated <br />
              <span className="text-primary italic font-serif lowercase tracking-normal">Flavors</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/20 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search your cravings..."
                className="bg-white border border-primary/5 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:outline-none focus:border-primary/20 soft-shadow w-64 transition-all"
              />
            </div>
            <button className="p-4 bg-white rounded-2xl border border-primary/5 soft-shadow hover:bg-primary/5 transition-colors">
              <Filter className="w-5 h-5 text-primary" />
            </button>
          </div>
        </header>

        {/* Live Order Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <LiveOrderStatus status={orderStatus} estimatedTime={12} />
        </motion.div>

        {/* Music & Now Playing Integration */}
        <section className="pt-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-3 text-primary">
              <Music className="w-5 h-5" />
              <span className="text-xs font-display font-black uppercase tracking-[0.4em]">Table Music</span>
            </div>
            <div className="h-px flex-1 bg-primary/5" />
          </div>
          <SongRequest />
        </section>

        {/* Mood Selection (Refined) */}
        <section className="relative">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-display font-bold text-ink/30 uppercase tracking-[0.4em]">
                Filter by Mood
              </h2>
              {selectedMood && (
                <button 
                  onClick={() => {
                    setSelectedMood(null);
                    setSearchParams({});
                  }}
                  className="text-[10px] font-display font-bold text-primary uppercase tracking-widest hover:underline"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {MOODS.map((mood) => (
              <motion.button
                key={mood.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedMood(mood.id);
                  setSearchParams({ mood: mood.id });
                }}
                className={`flex-shrink-0 px-6 py-4 rounded-2xl flex items-center gap-3 transition-all border ${
                  selectedMood === mood.id 
                    ? 'bg-primary border-primary text-white deep-shadow' 
                    : 'bg-white text-ink/40 border-primary/5 hover:border-primary/20 soft-shadow'
                }`}
              >
                <span className="text-xl">{mood.emoji}</span>
                <span className="text-[10px] font-display font-bold uppercase tracking-widest">{mood.label}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* Active Filter Indicator */}
        <AnimatePresence>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-primary/5 border border-primary/10 rounded-3xl p-8 flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <span className="text-5xl">{activeMood?.emoji}</span>
                <div>
                  <h3 className="text-xl font-display font-black text-ink uppercase tracking-tight">
                    Curating for your <span className="text-primary">{activeMood?.label}</span> mood
                  </h3>
                  <p className="text-xs text-ink/40 font-medium">We've handpicked these dishes just for you.</p>
                </div>
              </div>
              <Sparkles className="w-8 h-8 text-primary/20" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category Tabs */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-3.5 rounded-xl text-[10px] font-display font-bold uppercase tracking-[0.2em] transition-all border ${
                    selectedCategory === cat
                      ? 'red-gradient text-white border-transparent deep-shadow'
                      : 'bg-white text-ink/40 border-primary/5 hover:border-primary/20 soft-shadow'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
            
            <Magnetic>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSurprise}
                className="bg-accent text-white px-8 py-4 rounded-xl font-display font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-3 deep-shadow"
              >
                <Sparkles className="w-4 h-4" />
                Surprise Me
              </motion.button>
            </Magnetic>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredDishes.map((dish, index) => (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  <DishCard 
                    dish={dish} 
                    onClick={setSelectedDish} 
                    onAddToCart={onAddToCart}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredDishes.length === 0 && (
            <div className="py-32 text-center">
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-primary/20" />
              </div>
              <h3 className="text-2xl font-display font-black text-ink uppercase tracking-tight mb-2">No dishes found</h3>
              <p className="text-ink/40 text-sm font-medium">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </section>

        {/* Table Tools Section */}
        <section className="pt-24 border-t border-primary/5">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px flex-1 bg-primary/5" />
            <h2 className="text-[10px] font-display font-bold text-ink/20 uppercase tracking-[0.5em]">
              Table Services
            </h2>
            <div className="h-px flex-1 bg-primary/5" />
          </div>
          
          <QuickButtons />
        </section>

        {/* Billboard & Social */}
        <Billboard />

        <motion.div
          whileHover={{ y: -5 }}
          onClick={() => navigate('/rewards')}
          className="bg-white rounded-[3rem] p-10 soft-shadow border border-primary/5 flex flex-col md:flex-row items-center justify-between gap-8 cursor-pointer group"
        >
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Gift className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-display font-black text-ink tracking-tight uppercase">Spice Rewards</h3>
              <p className="text-ink/40 text-xs font-medium">Earn points for every order and photo you share!</p>
            </div>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 text-primary font-display font-black uppercase tracking-[0.2em] text-[10px]"
          >
            View Rewards <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </main>

      <DishModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={(d, q, c) => {
          onAddToCart(d, q, c);
          setSelectedDish(null);
        }}
        onARClick={(d) => setArDish(d)}
      />

      <ARPreview
        isOpen={!!arDish}
        onClose={() => setArDish(null)}
        dishName={arDish?.name || ''}
      />

      <SurpriseWheel
        isOpen={isWheelOpen}
        onClose={() => setIsWheelOpen(false)}
        onResult={handleWheelResult}
        dishes={DISHES}
      />

      {/* Surprise Popup */}
      <AnimatePresence>
        {surpriseDish && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSurpriseDish(null)}
              className="absolute inset-0 bg-ink/60 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative w-full max-w-sm bg-white rounded-[3rem] p-10 text-center deep-shadow border border-primary/5"
            >
              <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-3xl font-display font-black text-ink mb-3 tracking-tight uppercase">Chef Recommends!</h3>
              <p className="text-ink/40 text-sm mb-10 font-medium">How about trying our signature {surpriseDish.name}?</p>
              <div className="w-full aspect-square rounded-3xl overflow-hidden mb-10 soft-shadow">
                <img src={surpriseDish.image} className="w-full h-full object-cover" alt={surpriseDish.name} />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setSurpriseDish(null)}
                  className="flex-1 py-5 bg-bg text-ink/40 rounded-2xl font-display font-bold text-[10px] uppercase tracking-widest hover:bg-primary/5 transition-colors"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    setSelectedDish(surpriseDish);
                    setSurpriseDish(null);
                  }}
                  className="flex-1 py-5 red-gradient text-white rounded-2xl font-display font-bold text-[10px] uppercase tracking-widest deep-shadow"
                >
                  View Dish
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
