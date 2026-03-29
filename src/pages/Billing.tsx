import { motion } from 'motion/react';
import { CreditCard, Smartphone, Wallet, Split, Users, Receipt, ArrowRight, Heart, Sparkles, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Billing({ total }: { total: number }) {
  const [splitType, setSplitType] = useState('equal');
  const [tip, setTip] = useState(0);

  const tax = Math.round(total * 0.05);
  const serviceCharge = Math.round(total * 0.1);
  const grandTotal = total + tax + serviceCharge + tip;

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Bill Details */}
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[4rem] p-12 soft-shadow border border-primary/5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="space-y-1">
                <h2 className="text-3xl font-display font-black text-ink tracking-tight uppercase flex items-center gap-4">
                  <Receipt className="w-8 h-8 text-primary" />
                  Live Bill
                </h2>
                <p className="text-ink/30 text-xs font-bold uppercase tracking-widest ml-12">Table #12 • Order #8842</p>
              </div>
              <div className="bg-primary/5 text-primary px-6 py-2 rounded-full text-[10px] font-display font-black uppercase tracking-[0.2em] border border-primary/10">
                Active
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex justify-between text-ink/40 font-bold text-lg uppercase tracking-widest">
                <span>Subtotal</span>
                <span className="text-ink">₹{total}</span>
              </div>
              <div className="flex justify-between text-ink/40 font-bold text-lg uppercase tracking-widest">
                <span>GST (5%)</span>
                <span className="text-ink">₹{tax}</span>
              </div>
              <div className="flex justify-between text-ink/40 font-bold text-lg uppercase tracking-widest">
                <span>Service Charge (10%)</span>
                <span className="text-ink">₹{serviceCharge}</span>
              </div>
              {tip > 0 && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex justify-between text-primary font-black text-lg uppercase tracking-widest"
                >
                  <span className="flex items-center gap-2">Tip Jar <Heart className="w-4 h-4 fill-primary" /></span>
                  <span>₹{tip}</span>
                </motion.div>
              )}
              <div className="pt-8 border-t border-dashed border-primary/10 flex justify-between text-5xl font-display font-black text-ink tracking-tighter">
                <span className="text-lg uppercase tracking-widest text-ink/20 self-center">Total</span>
                <span>₹{grandTotal}</span>
              </div>
            </div>

            {/* Tip Selection */}
            <div className="space-y-6">
              <p className="text-[10px] font-display font-black text-ink/20 uppercase tracking-[0.4em]">Add a Tip for the Team</p>
              <div className="grid grid-cols-4 gap-4">
                {[20, 50, 100, 200].map((amount) => (
                  <motion.button
                    key={amount}
                    whileHover={{ y: -5, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setTip(amount)}
                    className={`py-5 rounded-[2rem] font-display font-black text-sm transition-all border-2 ${
                      tip === amount 
                        ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' 
                        : 'bg-bg border-transparent text-ink/40 hover:bg-white hover:soft-shadow hover:text-primary'
                    }`}
                  >
                    ₹{amount}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Split Options */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[4rem] p-12 soft-shadow border border-primary/5"
          >
            <div className="space-y-2 mb-10">
              <h3 className="text-2xl font-display font-black text-ink uppercase tracking-tight flex items-center gap-4">
                <Split className="w-7 h-7 text-primary" />
                Split Options
              </h3>
              <p className="text-ink/40 text-sm font-medium ml-11">Choose how you'd like to share the bill.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SplitButton
                active={splitType === 'equal'}
                onClick={() => setSplitType('equal')}
                icon={<Users className="w-8 h-8" />}
                label="Equal Split"
                description="Divide total by 4 people"
              />
              <SplitButton
                active={splitType === 'items'}
                onClick={() => setSplitType('items')}
                icon={<Receipt className="w-8 h-8" />}
                label="By Items"
                description="Pay for what you ordered"
              />
            </div>
          </motion.div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-12">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-ink rounded-[4rem] p-12 text-white deep-shadow relative overflow-hidden border border-white/5"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-display font-black tracking-tight uppercase italic">Secure Checkout</h2>
                <Sparkles className="w-6 h-6 text-accent" />
              </div>
              
              <div className="space-y-4">
                <PaymentMethod icon={<Smartphone className="w-6 h-6" />} label="UPI (GPay, PhonePe)" />
                <PaymentMethod icon={<CreditCard className="w-6 h-6" />} label="Credit / Debit Card" />
                <PaymentMethod icon={<Wallet className="w-6 h-6" />} label="Digital Wallets" />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="w-full red-gradient text-white py-7 rounded-[2.5rem] font-display font-black text-xl mt-16 shadow-2xl shadow-primary/30 flex items-center justify-center gap-4 group uppercase tracking-[0.2em]"
              >
                Complete Payment
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </motion.button>
              
              <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mt-8">
                Encrypted & Secure Payment Processing
              </p>
            </div>
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
          </motion.div>

          {/* Group Tip Jar UI */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[4rem] p-12 soft-shadow border border-primary/5 relative overflow-hidden"
          >
            <div className="flex items-center gap-8 mb-8">
              <div className="red-gradient p-5 rounded-[2rem] text-white shadow-xl shadow-primary/20">
                <Heart className="w-8 h-8 fill-white" />
              </div>
              <div>
                <h4 className="text-2xl font-display font-black text-ink uppercase tracking-tight">Community Jar</h4>
                <p className="text-sm text-ink/40 font-medium">Join others in thanking our amazing staff</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ y: -5, zIndex: 10 }}
                    className="w-12 h-12 rounded-2xl bg-bg border-4 border-white flex items-center justify-center text-xl soft-shadow"
                  >
                    {['👨‍🍳', '👩‍🍳', '🤵', '🤵‍♀️', '✨'][i-1]}
                  </motion.div>
                ))}
                <div className="w-12 h-12 rounded-2xl red-gradient text-white flex items-center justify-center text-xs font-black border-4 border-white soft-shadow">
                  +12
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-display font-black text-primary tracking-tighter">₹4,250</p>
                <p className="text-[10px] font-black text-ink/20 uppercase tracking-widest">Tipped Today</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function SplitButton({ active, onClick, icon, label, description }: any) {
  return (
    <motion.button
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-10 rounded-[3rem] border-2 transition-all flex flex-col items-center text-center gap-4 ${
        active 
          ? 'border-primary bg-primary/5 text-primary shadow-2xl shadow-primary/10' 
          : 'border-transparent bg-bg text-ink/20 hover:bg-white hover:soft-shadow hover:text-ink/40'
      }`}
    >
      <div className={`p-4 rounded-2xl transition-colors ${active ? 'bg-primary text-white' : 'bg-white text-ink/10'}`}>
        {icon}
      </div>
      <div className="space-y-1">
        <span className="text-xs font-display font-black uppercase tracking-[0.2em] block">{label}</span>
        <span className="text-[10px] font-medium opacity-60 block">{description}</span>
      </div>
    </motion.button>
  );
}

function PaymentMethod({ icon, label }: any) {
  return (
    <motion.button 
      whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
      className="w-full p-7 bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-between transition-all group"
    >
      <div className="flex items-center gap-6">
        <div className="text-accent group-hover:scale-110 transition-transform group-hover:text-white">{icon}</div>
        <span className="font-display font-black text-sm text-white/50 group-hover:text-white transition-colors uppercase tracking-[0.2em]">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-white/10 group-hover:text-accent group-hover:translate-x-1 transition-all" />
    </motion.button>
  );
}
