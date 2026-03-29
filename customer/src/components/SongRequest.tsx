import { motion } from 'motion/react';
import { Music, Play, Heart } from 'lucide-react';
import { SONGS } from '../data';
import { useState } from 'react';

export default function SongRequest() {
  const [requested, setRequested] = useState<Set<string>>(new Set());

  const handleRequest = (id: string) => {
    setRequested(prev => new Set(prev).add(id));
  };

  return (
    <div className="bg-white rounded-[3rem] p-8 mb-16 soft-shadow border border-primary/5 relative overflow-hidden group">
      <div className="flex items-center gap-10 relative z-10">
        {/* Minimal Now Playing Icon */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <motion.div 
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 red-gradient rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 border border-white/20"
          >
            <Music className="w-8 h-8 text-white" />
          </motion.div>
          <div className="hidden sm:block">
            <h3 className="text-[10px] font-display font-black text-primary uppercase tracking-[0.4em] mb-1">Now Playing</h3>
            <p className="text-lg font-display font-black text-ink tracking-tight uppercase italic">Levitating — Dua Lipa</p>
          </div>
        </div>

        {/* Minimal Horizontal List */}
        <div className="flex-1 overflow-x-auto no-scrollbar">
          <div className="flex gap-4 py-2">
            {SONGS.map((song) => (
              <motion.button
                key={song.id}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleRequest(song.id)}
                disabled={requested.has(song.id)}
                className={`flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all duration-500 group/item ${
                  requested.has(song.id)
                    ? 'bg-primary/5 border-primary/20 text-primary'
                    : 'bg-bg border-primary/5 text-ink/40 hover:border-primary/30 hover:bg-white hover:soft-shadow'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-500 ${
                  requested.has(song.id) ? 'red-gradient text-white' : 'bg-white text-primary group-hover/item:red-gradient group-hover/item:text-white soft-shadow'
                }`}>
                  {requested.has(song.id) ? <Heart className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                </div>
                <div className="text-left">
                  <p className="text-xs font-display font-black tracking-tight uppercase truncate max-w-[120px]">{song.title}</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-30 truncate max-w-[120px] mt-0.5">{song.artist}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all duration-1000" />
    </div>
  );
}
