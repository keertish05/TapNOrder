import { motion } from 'motion/react';
import { QrCode, ArrowRight, Sparkles, Clock, Users, Flame } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MOODS } from '../data';

export default function Home() {
  const navigate = useNavigate();

  const handleMoodSelect = (moodId: string) => {
    navigate(`/menu?mood=${moodId}`);
  };

  return (
    <div className="min-h-screen bg-bg relative overflow-hidden flex flex-col items-center">
      {/* Premium Hero Section */}
      <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center px-6 pt-24 pb-12">
        {/* Background Pattern/Gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(229,57,53,0.08)_0%,transparent_60%)]" />
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] mix-blend-multiply" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center max-w-6xl w-full"
        >
          {/* Restaurant Name Styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 flex flex-col items-center"
          >
            <span className="text-primary text-[10px] font-display font-black uppercase tracking-[0.5em] mb-4">Est. 2024</span>
            <h2 className="font-serif italic text-3xl text-ink/80 tracking-[0.2em] uppercase">Spice Villa</h2>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/30 to-transparent mt-4" />
          </motion.div>

          {/* Table Info Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-xl px-6 py-2.5 rounded-full border border-primary/10 soft-shadow mb-12"
          >
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-75" />
            </div>
            <span className="text-[10px] font-display font-black text-ink/40 uppercase tracking-[0.3em]">Table #12 • Active Session</span>
          </motion.div>

          <motion.h1
            className="text-7xl sm:text-[10rem] font-display font-black text-ink tracking-tighter mb-10 leading-[0.85] uppercase"
          >
            Scan. Order.<br />
            <span className="text-primary italic font-serif lowercase tracking-normal pr-4">Relax.</span>
          </motion.h1>

          <motion.p
            className="text-ink/50 text-xl sm:text-2xl mb-16 max-w-3xl mx-auto font-medium leading-relaxed tracking-tight"
          >
            Experience modern Indian dining redefined. Curated flavors, seamless ordering, and memories that linger long after the meal.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-24">
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="red-gradient text-white px-14 py-6 rounded-[2rem] font-display font-black text-xl flex items-center gap-5 group deep-shadow border border-white/20"
              >
                Start Ordering
                <QrCode className="w-6 h-6 group-hover:rotate-12 transition-transform duration-500" />
              </motion.button>
            </Link>
            
            <Link to="/menu">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-ink px-14 py-6 rounded-[2rem] font-display font-black text-xl border border-primary/5 flex items-center gap-5 hover:bg-primary/5 transition-all soft-shadow"
              >
                Browse Menu
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
              </motion.button>
            </Link>
          </div>

          {/* Real-world touches: People at table */}
          <div className="flex flex-col items-center gap-6 mb-12">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div 
                  key={i} 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="w-12 h-12 rounded-full border-4 border-bg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs overflow-hidden soft-shadow"
                >
                  <img src={`https://i.pravatar.cc/100?img=${i + 15}`} alt="user" className="w-full h-full object-cover" />
                </motion.div>
              ))}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="w-12 h-12 rounded-full border-4 border-bg red-gradient text-white flex items-center justify-center font-black text-sm soft-shadow"
              >
                +2
              </motion.div>
            </div>
            <p className="text-[10px] font-display font-black text-ink/20 uppercase tracking-[0.4em]">6 People at your table</p>
          </div>
        </motion.div>
      </section>

      {/* Mood Curate Section */}
      <section className="w-full max-w-7xl px-6 py-32 bg-white/40 border-y border-primary/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 text-primary mb-6">
              <Sparkles className="w-6 h-6" />
              <span className="text-xs font-display font-black uppercase tracking-[0.4em]">Curated for you</span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-display font-black text-ink uppercase leading-[0.9] tracking-tighter">
              What's your <span className="text-primary italic font-serif lowercase tracking-normal">mood</span> today?
            </h2>
          </div>
          <p className="text-ink/40 text-lg font-medium max-w-xs md:text-right leading-relaxed">
            Select a mood and let our AI curate the perfect selection of dishes for your palate.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6">
          {MOODS.map((mood, idx) => (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              whileHover={{ y: -12, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelect(mood.id)}
              className="group relative flex flex-col items-center gap-6 p-10 bg-white rounded-[3rem] border border-primary/5 soft-shadow hover:border-primary/20 transition-all duration-500"
            >
              <span className="text-5xl group-hover:scale-125 transition-transform duration-700 ease-out drop-shadow-xl">{mood.emoji}</span>
              <span className="text-[10px] font-display font-black text-ink/30 uppercase tracking-[0.2em] group-hover:text-primary transition-colors">{mood.label}</span>
              
              {/* Subtle indicator */}
              <div className="absolute bottom-6 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100" />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="w-full max-w-7xl px-6 py-32">
        <div className="flex items-center gap-6 mb-16">
          <div className="flex items-center gap-3 bg-primary/5 text-primary px-6 py-2 rounded-full border border-primary/10">
            <Flame className="w-5 h-5" />
            <span className="text-[10px] font-display font-black uppercase tracking-[0.3em]">Trending Now</span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/10 to-transparent" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div 
              whileHover={{ y: -10 }}
              className="h-80 rounded-[3rem] overflow-hidden relative group cursor-pointer deep-shadow"
            >
              <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="trending" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-10 left-10">
                <p className="text-primary text-[10px] font-display font-black uppercase tracking-[0.3em] mb-2">Most Ordered</p>
                <h3 className="text-white text-3xl font-display font-black uppercase tracking-tight">Chicken Tikka Masala</h3>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10 }}
              className="h-80 rounded-[3rem] overflow-hidden relative group cursor-pointer deep-shadow"
            >
              <img src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="trending" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-10 left-10">
                <p className="text-primary text-[10px] font-display font-black uppercase tracking-[0.3em] mb-2">Chef's Choice</p>
                <h3 className="text-white text-3xl font-display font-black uppercase tracking-tight">Paneer Butter Masala</h3>
              </div>
            </motion.div>
          </div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white rounded-[3rem] p-12 flex flex-col justify-between text-ink soft-shadow relative overflow-hidden group border border-primary/5"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 blur-[80px] rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-1000" />
            <div>
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center mb-10 text-primary">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-display font-black uppercase leading-tight mb-6 tracking-tighter">Join the<br />Spice Circle</h3>
              <p className="text-ink/40 text-base font-medium leading-relaxed mb-8">Get 15% off on your first order and unlock exclusive table perks.</p>
            </div>
            <Link to="/rewards">
              <motion.button
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-[10px] font-display font-black uppercase tracking-[0.3em] text-primary group"
              >
                Join Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer-like info */}
      <footer className="w-full max-w-7xl px-6 py-20 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-10">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 text-ink/30">
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-display font-black uppercase tracking-[0.3em]">Avg. Wait: 15m</span>
          </div>
          <div className="flex items-center gap-3 text-ink/30">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-display font-black uppercase tracking-[0.3em]">24 Active Tables</span>
          </div>
        </div>
        <p className="text-[10px] font-display font-black text-ink/10 uppercase tracking-[0.5em]">TapNOrder © 2026</p>
      </footer>
    </div>
  );
}
