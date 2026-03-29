import { motion, AnimatePresence } from 'motion/react';
import { Heart, MessageCircle, TrendingUp, Award, Sparkles, Camera, Plus, X } from 'lucide-react';
import { SOCIAL_POSTS } from '../data';
import React, { useState, useRef } from 'react';
import { SocialPost } from '../types';

export default function Billboard() {
  const [posts, setPosts] = useState<SocialPost[]>(SOCIAL_POSTS);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const messages = [
    "What dish is that?",
    "Recommend something?",
    "Cheers",
    "Looks delicious!"
  ];

  const emojis = ['🔥', '🥂', '😍', '🍛', '🌶️', '🥘', '✨', '🙌'];

  const toggleLike = (id: string) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPost: SocialPost = {
          id: Date.now().toString(),
          image: reader.result as string,
          likes: 0,
          author: 'Table 12 (You)'
        };
        setPosts([newPost, ...posts]);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const [activeBuzz, setActiveBuzz] = useState<string | null>(null);

  const handleBuzz = (msg: string) => {
    setActiveBuzz(msg);
    setTimeout(() => setActiveBuzz(null), 3000);
  };

  return (
    <div className="space-y-16 mb-24">
      {/* Live Billboard */}
      <div className="bg-white rounded-[4rem] p-12 soft-shadow relative overflow-hidden group border border-primary/5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 text-primary mb-4">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs font-display font-black uppercase tracking-[0.3em]">Live Feed</span>
            </div>
            <h2 className="text-4xl font-display font-black text-ink tracking-tight uppercase italic">
              Table Billboard
            </h2>
            <p className="text-ink/30 text-sm font-medium mt-2">See what's cooking at Spice Villa right now</p>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="red-gradient px-8 py-3 rounded-2xl flex items-center gap-4 text-white font-display font-black text-[10px] uppercase tracking-[0.2em] deep-shadow border border-white/20"
            >
              <Camera className="w-5 h-5" />
              Upload Moment
            </motion.button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleUpload} 
              className="hidden" 
              accept="image/*"
            />
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-primary/5 px-6 py-3 rounded-2xl flex items-center gap-4 border border-primary/10 hidden sm:flex"
            >
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-display font-black text-primary uppercase tracking-[0.2em]">Top 5 Today</span>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <AnimatePresence mode="popLayout">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="relative aspect-square rounded-[3rem] overflow-hidden group/item deep-shadow border border-primary/5"
              >
                <img src={post.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-110" alt="Food" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-[10px] font-display font-black uppercase tracking-[0.2em]">{post.author}</span>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileTap={{ scale: 1.5 }}
                        className="backdrop-blur-xl p-3 rounded-2xl border border-white/20 bg-white/20 text-white hover:bg-white/40 transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 1.5 }}
                        onClick={() => toggleLike(post.id)}
                        className={`backdrop-blur-xl p-3 rounded-2xl border border-white/20 transition-all duration-500 ${
                          liked.has(post.id) ? 'bg-primary text-white border-primary' : 'bg-white/20 text-white hover:bg-white/40'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${liked.has(post.id) ? 'fill-white' : ''}`} />
                      </motion.button>
                    </div>
                  </div>
                </div>
                {i === 0 && !post.author.includes('You') && (
                  <div className="absolute top-6 left-6 red-gradient text-white p-3 rounded-2xl shadow-xl shadow-primary/20 border border-white/20">
                    <Award className="w-5 h-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Inter-table Chat */}
      <div className="bg-bg rounded-[3rem] p-8 text-ink soft-shadow relative overflow-hidden border border-primary/5 group">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 red-gradient rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-display font-black uppercase italic tracking-tight">
                Table Buzz
              </h3>
            </div>
            
            <AnimatePresence>
              {activeBuzz && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-primary text-white px-4 py-2 rounded-xl font-display font-black text-[8px] uppercase tracking-[0.2em] deep-shadow"
                >
                  Buzzed: {activeBuzz}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-primary/5 soft-shadow">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
              </div>
              <span className="text-[8px] font-display font-black uppercase tracking-[0.2em] text-ink/40">8 Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {messages.map((msg, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02, y: -2, backgroundColor: '#fff' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleBuzz(msg)}
                  className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl text-left text-[10px] font-black uppercase tracking-widest transition-all border border-primary/5 hover:border-primary/20 hover:soft-shadow group"
                >
                  <span className="text-ink/40 group-hover:text-primary transition-colors">{msg}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              {emojis.map((emoji, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.4, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleBuzz(emoji)}
                  className="text-2xl grayscale hover:grayscale-0 transition-all duration-300"
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="mt-12 flex items-center justify-between">
            <div className="flex -space-x-4">
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -8, zIndex: 10 }}
                  className="w-12 h-12 rounded-2xl bg-white soft-shadow border border-primary/5 flex items-center justify-center text-2xl transition-all duration-500"
                >
                  {['🍕', '🍔', '🥗'][i-1]}
                </motion.div>
              ))}
            </div>
            <p className="text-[10px] font-display font-black uppercase tracking-[0.3em] text-ink/10 italic">Predefined messages for safety</p>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px] group-hover:bg-primary/10 transition-all duration-1000" />
      </div>
    </div>
  );
}
