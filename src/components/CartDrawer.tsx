import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Trash2, Users, Table, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onPlaceOrder: () => void;
}

export default function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQuantity, onPlaceOrder }: CartDrawerProps) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 35, stiffness: 300 }}
            className="relative w-full max-w-md bg-bg h-full deep-shadow flex flex-col border-l border-primary/5"
          >
            {/* Header */}
            <div className="p-8 border-b border-primary/5 flex items-center justify-between bg-white/50 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <motion.div 
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  className="red-gradient p-3 rounded-2xl text-white shadow-lg shadow-primary/20"
                >
                  <ShoppingBag className="w-6 h-6" />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-display font-black text-ink tracking-tight uppercase">Your Order</h2>
                  <div className="flex items-center gap-3 text-[10px] font-display font-bold text-primary uppercase tracking-[0.2em]">
                    <Table className="w-3 h-3" /> Table #12 <span className="opacity-20">•</span> <Users className="w-3 h-3" /> 4 People
                  </div>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose} 
                className="p-3 hover:bg-primary/5 rounded-2xl transition-all border border-primary/5"
              >
                <X className="w-6 h-6 text-ink/40" />
              </motion.button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-20">
                  <div className="w-24 h-24 bg-primary/5 rounded-[2.5rem] flex items-center justify-center border border-primary/10">
                    <ShoppingCart className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <p className="text-ink font-display font-black uppercase tracking-widest text-sm mb-2">Your cart is empty</p>
                    <p className="text-ink text-xs font-medium">Add some delicious dishes to get started!</p>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-6 group"
                  >
                    <div className="w-24 h-24 rounded-[2rem] overflow-hidden soft-shadow relative border border-primary/5">
                      <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.name} />
                      <div className="absolute -top-1 -right-1 w-7 h-7 red-gradient rounded-xl flex items-center justify-center text-[10px] font-black text-white shadow-xl border-2 border-bg">
                        {item.addedBy}
                      </div>
                    </div>
                    <div className="flex-1 py-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-display font-black text-ink text-lg tracking-tight uppercase leading-none">{item.name}</h4>
                        <motion.button 
                          whileHover={{ scale: 1.2, color: '#ef4444' }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => onRemove(item.id)}
                          className="text-ink/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                      <p className="text-[10px] text-ink/30 font-bold mb-4 uppercase tracking-widest">
                        {Object.entries(item.customizations)
                          .filter(([_, v]) => v)
                          .map(([k]) => k.replace(/([A-Z])/g, ' $1').trim())
                          .join(', ') || 'Standard Preparation'}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-primary/5 soft-shadow">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)} 
                            className="text-ink/20 hover:text-primary transition-colors font-black text-lg"
                          >-</button>
                          <span className="text-xs font-display font-black text-ink w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)} 
                            className="text-ink/20 hover:text-primary transition-colors font-black text-lg"
                          >+</button>
                        </div>
                        <span className="font-display font-black text-ink text-xl tracking-tighter">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-8 bg-white rounded-t-[3.5rem] border-t border-primary/5 space-y-8 deep-shadow">
              <div className="space-y-4">
                <div className="flex justify-between text-ink/30 font-display font-bold text-[10px] uppercase tracking-[0.2em]">
                  <span>Subtotal</span>
                  <span className="text-ink/60">₹{total}</span>
                </div>
                <div className="flex justify-between text-ink/30 font-display font-bold text-[10px] uppercase tracking-[0.2em]">
                  <span>GST & Service (18%)</span>
                  <span className="text-ink/60">₹{Math.round(total * 0.18)}</span>
                </div>
                <div className="flex justify-between text-4xl font-display font-black text-ink pt-6 border-t border-primary/5 tracking-tighter">
                  <span className="uppercase text-lg tracking-widest text-ink/20">Total</span>
                  <span>₹{total + Math.round(total * 0.18)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={onPlaceOrder}
                className="w-full red-gradient text-white py-6 rounded-[2rem] font-display font-black text-lg uppercase tracking-[0.2em] deep-shadow flex items-center justify-center gap-4"
              >
                Place Order <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <div className="flex justify-center items-center gap-4">
                <div className="flex -space-x-3">
                  {['👨‍🦱', '👩', '🧔', '👱‍♀️'].map((emoji, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -5, zIndex: 10 }}
                      className="w-10 h-10 rounded-xl bg-bg border-2 border-white flex items-center justify-center text-sm soft-shadow"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
                <span className="text-[10px] font-display font-bold text-ink/20 uppercase tracking-[0.2em]">Shared with your table</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
