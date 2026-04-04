import { motion } from 'motion/react';
import { Search, ShoppingBag, User, UtensilsCrossed, Menu as MenuIcon, QrCode, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import QRScanner from './QRScanner';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  tableId: string | null;
}

export default function Navbar({ cartCount, onCartClick, tableId }: NavbarProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleScan = (data: string) => {
    // This is now handled by LandingGate, but we keep it for manual re-scans
    console.log('Re-scanned:', data);
  };

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      isHome ? 'bg-transparent' : 'bg-bg/80 backdrop-blur-xl border-b border-primary/5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 12, scale: 1.1 }}
              className="red-gradient p-2.5 rounded-2xl shadow-lg shadow-primary/20"
            >
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </motion.div>
            <span className={`text-2xl font-display font-black tracking-tighter uppercase ${ 'text-ink'}`}>
              Tap<span className="text-[#D32F2F]">N</span>Order
            </span>
          </Link>

          {!isHome && (
            <div className="hidden md:flex items-center gap-8">
              <Link to="/menu" className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-ink/40 hover:text-primary transition-colors">Menu</Link>
              <Link to="/billing" className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-ink/40 hover:text-primary transition-colors">Orders</Link>
              <Link to="/rewards" className="text-[10px] font-display font-bold uppercase tracking-[0.3em] text-ink/40 hover:text-primary transition-colors">Rewards</Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 sm:gap-6 ">
          {/* Table Number Badge */}
          {tableId && (
            <div className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border ${
                 'bg-primary/5 border-primary/10 text-primary'
            }`}>
              <MapPin className="w-3.5 h-3.5 text-black" />
              <span className="text-[10px] font-display text-black font-black uppercase tracking-[0.2em]">Table {tableId}</span>
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsScannerOpen(true)}
            className={`p-3 rounded-2xl transition-all ${'text-ink/40 hover:text-primary hover:bg-primary/5'
            }`}
          >
            <QrCode className="w-6 h-6" />
          </motion.button>

          {!isHome && (
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 text-ink/40 hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
            >
              <Search className="w-6 h-6" />
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCartClick}
            className={`relative p-3.5 rounded-2xl border transition-all shadow-xl ${
                'bg-white border-primary/5 text-ink hover:bg-primary/5'
            }`}
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-bg shadow-lg"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-2xl transition-all ${
               'text-ink/40 hover:text-primary hover:bg-primary/5'
            }`}
          >
            <User className="w-6 h-6" />
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`md:hidden p-3 rounded-2xl transition-all ${
              'text-ink/40 hover:text-primary hover:bg-primary/5'
            }`}
          >
            <MenuIcon className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </nav>
      <QRScanner 
        isOpen={isScannerOpen} 
        onClose={() => setIsScannerOpen(false)} 
        onScan={handleScan} 
      />
    </>
  );
}
