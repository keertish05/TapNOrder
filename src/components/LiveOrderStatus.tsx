import { motion, AnimatePresence } from 'motion/react';
import { Clock, CheckCircle2, Utensils, ChefHat, Sparkles, Info, RefreshCw, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

import { toast } from 'sonner';

export type OrderStep = 'received' | 'preparing' | 'cooking' | 'ready';

interface LiveOrderStatusProps {
  status: OrderStep;
  estimatedTime: number;
}

const STEPS = [
  { 
    id: 'received', 
    label: 'Order Received', 
    icon: <CheckCircle2 className="w-6 h-6" />,
    details: 'Our kitchen has received your order and is reviewing the details.'
  },
  { 
    id: 'preparing', 
    label: 'Preparing', 
    icon: <ChefHat className="w-6 h-6" />,
    details: 'Chef is gathering fresh ingredients and prepping your dish.'
  },
  { 
    id: 'cooking', 
    label: 'Cooking', 
    icon: <Utensils className="w-6 h-6" />,
    details: 'Your meal is on the fire! Aromas are filling the kitchen.'
  },
  { 
    id: 'ready', 
    label: 'Ready to Serve', 
    icon: <Sparkles className="w-6 h-6" />,
    details: 'Plating is complete. Your server is bringing it to your table!'
  },
];

export default function LiveOrderStatus({ status: initialStatus, estimatedTime: initialTime }: LiveOrderStatusProps) {
  const [status, setStatus] = useState<OrderStep>(initialStatus);
  const [estimatedTime, setEstimatedTime] = useState(initialTime);
  const [showDetails, setShowDetails] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  useEffect(() => {
    setEstimatedTime(initialTime);
  }, [initialTime]);

  const currentStepIndex = STEPS.findIndex(s => s.id === status);

  // Simulate real-time updates for demo purposes
  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStepIndex < STEPS.length - 1) {
        // Occasionally update time or status
        if (Math.random() > 0.8) {
          setEstimatedTime(prev => Math.max(1, prev - 1));
        }
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [currentStepIndex]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.promise(new Promise(resolve => setTimeout(resolve, 1000)), {
      loading: 'Checking with kitchen...',
      success: 'Status updated!',
      error: 'Failed to refresh',
    });
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[4rem] p-10 mb-20 soft-shadow border border-primary/5 relative overflow-hidden group"
    >
      {/* Header Area */}
      <div className="flex items-center justify-between mb-12 relative z-10">
        <div className="space-y-1">
          <h2 className="text-2xl font-display font-black text-ink tracking-tight uppercase flex items-center gap-3 italic">
            <div className="w-1.5 h-8 red-gradient rounded-full" />
            Live Tracker
          </h2>
          <p className="text-ink/30 text-[10px] font-bold uppercase tracking-widest ml-4">Real-time culinary progress</p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRefresh}
            className="w-10 h-10 rounded-xl bg-bg flex items-center justify-center text-ink/20 hover:text-primary transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </motion.button>
          
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="bg-primary/5 backdrop-blur-xl px-5 py-2.5 rounded-xl flex items-center gap-2.5 border border-primary/10"
          >
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-display font-black text-primary uppercase tracking-widest">
              {estimatedTime}m left
            </span>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start relative px-4">
          {/* Progress Line */}
          <div className="absolute top-8 left-12 right-12 h-1 bg-bg -z-10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-full red-gradient shadow-[0_0_20px_rgba(229,57,53,0.4)]"
            />
          </div>

          {STEPS.map((step, index) => {
            const isActive = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div key={step.id} className="flex flex-col items-center gap-4 w-1/4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowDetails(!showDetails)}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 ${
                    isActive 
                      ? 'red-gradient border-transparent text-white shadow-lg shadow-primary/20' 
                      : 'bg-bg border-transparent text-ink/10'
                  } ${isCurrent ? 'ring-4 ring-primary/10' : ''}`}
                >
                  <motion.div
                    animate={isCurrent ? { 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    } : {}}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    {step.icon}
                  </motion.div>
                </motion.button>
                
                <div className="text-center">
                  <span className={`text-[9px] font-display font-black uppercase tracking-widest block transition-colors duration-700 ${
                    isActive ? 'text-ink' : 'text-ink/20'
                  }`}>
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Detail Section */}
        <AnimatePresence>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="mt-12 pt-8 border-t border-primary/5"
          >
            <div className="bg-bg/50 rounded-3xl p-6 flex items-start gap-5 border border-primary/5">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary soft-shadow">
                <Info className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="text-[10px] font-display font-black text-primary uppercase tracking-[0.2em] mb-2">Current Status</h4>
                <p className="text-sm text-ink/60 font-medium leading-relaxed">
                  {STEPS[currentStepIndex].details}
                </p>
              </div>
              <motion.button
                whileHover={{ x: 5 }}
                className="self-center w-10 h-10 rounded-full bg-white flex items-center justify-center text-ink/20 hover:text-primary transition-colors soft-shadow"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Decorative Background */}
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />
    </motion.div>
  );
}
