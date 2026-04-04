import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { Toaster, toast } from 'sonner';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Billing from './pages/Billing';
import Rewards from './pages/Rewards';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Magnetic from './components/Magnetic';
import { Dish, CartItem } from './types';

function AppContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [tableId, setTableId] = useState<string | null>('4'); // Defaulting to 4 for demo
  const navigate = useNavigate();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('.cursor-pointer') !== null
      );
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAddToCart = (dish: Dish, quantity: number, customizations: any) => {
    try {
      const avatars = ['JD', 'AS', 'RK', 'MK'];
      const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

      setCartItems(prev => {
        const existing = prev.find(item => item.id === dish.id);
        if (existing) {
          return prev.map(item => 
            item.id === dish.id 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          );
        }
        return [...prev, { ...dish, quantity, customizations, addedBy: randomAvatar }];
      });
      setIsCartOpen(true);
      toast.success(`${dish.name} added to cart!`, {
        description: `Quantity: ${quantity}`,
        icon: '🍛',
        style: {
          background: '#fff',
          border: '1px solid rgba(211, 47, 47, 0.1)',
          color: '#141414',
          borderRadius: '1.5rem',
          padding: '1.5rem',
          fontFamily: 'Inter, sans-serif'
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setIsCartOpen(false);
    navigate('/billing');
    toast.success("Order placed successfully!", {
      description: "Redirecting to your orders...",
      icon: '✅'
    });
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-black font-sans selection:bg-accent/30 selection:text-accent overflow-x-hidden cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-accent/20 rounded-full pointer-events-none z-[9999] backdrop-blur-[2px] border border-accent/30 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovering ? 2.5 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Interactive Background Gradient */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-40 blur-[120px] transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(249, 115, 22, 0.15), transparent 50%)`
        }}
      />

      <Toaster position="top-center" expand={true} richColors />
      <Navbar cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} tableId={tableId} />
      
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu onAddToCart={handleAddToCart} />} />
          <Route path="/billing" element={<Billing total={total} />} />
          <Route path="/rewards" element={<Rewards />} />
        </Routes>
      </AnimatePresence>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Global Floating Action Button for Cart */}
      <AnimatePresence>
        {cartItems.length > 0 && !isCartOpen && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.button
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0, y: 50 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCartOpen(true)}
              className="bg-primary text-white w-12 h-12 rounded-xl shadow-lg shadow-primary/10 flex items-center justify-center border border-white/10"
            >
              <div className="relative">
                <ShoppingBagIcon className="w-5 h-5" />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartItems.length}
                  className="absolute -top-2.5 -right-2.5 bg-white text-primary text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-primary shadow-sm"
                >
                  {cartItems.length}
                </motion.span>
              </div>
            </motion.button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}
