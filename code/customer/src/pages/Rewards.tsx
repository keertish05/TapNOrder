import { motion, AnimatePresence } from 'motion/react';
import { Award, Star, Gift, TrendingUp, Heart, MessageSquare, ChevronRight, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Rewards() {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleRedeem = () => {
    toast.info("Redemption Center", {
      description: "Our rewards store is updating. Check back in 15 minutes!",
      icon: '🎁'
    });
  };

  const handleTaskClick = (label: string) => {
    toast.success(`Task: ${label}`, {
      description: "Points will be added after verification.",
      icon: '✨'
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
      {/* Points Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="red-gradient rounded-[4rem] p-12 text-white deep-shadow relative overflow-hidden group"
      >
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-16">
            <div className="bg-white/20 p-5 rounded-[2rem] backdrop-blur-xl border border-white/20 shadow-2xl">
              <Award className="w-12 h-12" />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50 mb-2">Membership Tier</p>
              <div className="flex items-center gap-2 justify-end">
                <Sparkles className="w-5 h-5 text-accent" />
                <p className="text-3xl font-display font-black tracking-tighter uppercase italic">Gold Member</p>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between gap-8 flex-wrap">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-50">Available Points</p>
              <h2 className="text-8xl font-display font-black tracking-tighter leading-none">2,450</h2>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRedeem}
              className="bg-white text-primary px-10 py-5 rounded-[2rem] font-display font-black text-sm uppercase tracking-widest shadow-2xl flex items-center gap-3"
            >
              Redeem Rewards <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

          <div className="mt-16 space-y-6">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
              />
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] opacity-50">
              <span>550 points to reach PLATINUM</span>
              <span>75% Complete</span>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-[100px] group-hover:bg-white/20 transition-colors duration-700" />
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Earn Points */}
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[4rem] p-10 soft-shadow border border-primary/5 space-y-10"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-display font-black text-ink uppercase tracking-tight flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              Earn More Points
            </h3>
            <p className="text-ink/40 text-sm font-medium ml-14">Complete simple tasks to unlock premium rewards.</p>
          </div>
          
          <div className="space-y-4">
            <EarnTask icon={<Star className="w-5 h-5" />} label="Review your meal" points="+50" onClick={() => handleTaskClick("Review your meal")} />
            <EarnTask icon={<Gift className="w-5 h-5" />} label="Refer a friend" points="+200" onClick={() => handleTaskClick("Refer a friend")} />
            <EarnTask icon={<Heart className="w-5 h-5" />} label="Like a table photo" points="+10" onClick={() => handleTaskClick("Like a table photo")} />
          </div>
        </motion.div>

        {/* Feedback System */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[4rem] p-10 soft-shadow border border-primary/5 space-y-10"
        >
          <div className="space-y-2">
            <h3 className="text-2xl font-display font-black text-ink uppercase tracking-tight flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-primary/5 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              Rate the Vibe
            </h3>
            <p className="text-ink/40 text-sm font-medium ml-14">How was your experience today?</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { emoji: '😍', label: 'Loved it', id: 'love' },
              { emoji: '🙂', label: 'Good', id: 'good' },
              { emoji: '😐', label: 'Okay', id: 'ok' },
              { emoji: '😡', label: 'Bad', id: 'bad' },
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setFeedback(item.id);
                  toast.success("Feedback Received!", {
                    description: `You rated us: ${item.label}`,
                    icon: item.emoji
                  });
                }}
                className={`flex flex-col items-center gap-3 p-6 rounded-[2.5rem] transition-all border-2 ${
                  feedback === item.id 
                    ? 'bg-primary/5 border-primary shadow-xl shadow-primary/10' 
                    : 'bg-bg border-transparent hover:bg-white hover:soft-shadow'
                }`}
              >
                <span className="text-4xl">{item.emoji}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${feedback === item.id ? 'text-primary' : 'text-ink/30'}`}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
          
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10 text-primary text-sm font-black text-center uppercase tracking-widest flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Thanks for your feedback! +20 points added.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function EarnTask({ icon, label, points, onClick }: any) {
  return (
    <motion.div 
      whileHover={{ x: 10 }}
      onClick={onClick}
      className="flex items-center justify-between p-6 bg-bg rounded-[2.5rem] group cursor-pointer hover:bg-white hover:soft-shadow transition-all border border-transparent hover:border-primary/5"
    >
      <div className="flex items-center gap-6">
        <div className="bg-white p-4 rounded-2xl soft-shadow text-ink/20 group-hover:text-primary group-hover:scale-110 transition-all duration-500">
          {icon}
        </div>
        <span className="text-sm font-black text-ink uppercase tracking-widest">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-black text-primary tracking-tighter">{points}</span>
        <ChevronRight className="w-4 h-4 text-ink/10 group-hover:text-primary transition-colors" />
      </div>
    </motion.div>
  );
}
