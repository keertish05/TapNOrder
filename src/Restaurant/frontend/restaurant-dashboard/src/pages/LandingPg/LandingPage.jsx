import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../../components/index.js';
import { useScroll, useTransform } from 'framer-motion';
import { FaQrcode, FaBolt, FaCreditCard, FaChartLine, FaUsers, FaStar } from 'react-icons/fa';

export default function LandingPage() {
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.observe');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  return (
    <div className="flex flex-1 relative flex-col">
          {/* ================== Hero Section ================== */}
        <motion.div
            style={{ opacity: heroOpacity }}
            className="sticky top-0 h-screen z--40 "
            >
            <Hero />
        </motion.div>
    
    {/* ================== other sections ================= */}
        <div className="relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          </div>

          {/* ================= PRODUCT OVERVIEW ================= */}
          <section className="bg-red-700 rounded-t-[90px] py-20 observe">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#432DD7]/10 to-[#C10007]/10 mb-4">
                  <FaQrcode className="text-white" />
                  <span className="text-sm font-semibold text-white">Digital Transformation</span>
                </div>
                
                <h2 className="text-4xl font-bold text-white">
                  Revolutionize Your <span className="text-[#C10007]">Restaurant</span> Experience
                </h2>
                
                <p className="mt-6 text-lg font-medium text-gray-300 leading-relaxed">
                  A modern digital ordering platform that replaces traditional
                  restaurant workflows with <span className="text-black font-bold">speed and simplicity</span>.
                </p>

                <ul className="mt-8 space-y-4">
                  {[
                    { icon: <FaQrcode className="text-white" />, text: "QR-based digital menus" },
                    { icon: <FaBolt className="text-white" />, text: "Instant order processing" },
                    { icon: <FaCreditCard className="text-white" />, text: "Secure online payments" },
                    { icon: <FaChartLine className="text-white" />, text: "Real-time kitchen updates" },
                  ].map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-gray-700 group"
                    >
                      <div className="p-2 rounded-lg bg-gray-900 from-[#432DD7]/10 to-[#C10007]/10 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <span className="text-lg">{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white to-white rounded-3xl rotate-3 opacity-50"></div>
                <div className="relative rounded-2xl bg-gradient-to-br from-gray-50 to-white p-8 shadow-2xl border border-gray-100">
                  <div className="h-64 rounded-xl bg-gradient-to-r from-[#432DD7]/20 to-[#C10007]/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-r from-[#432DD7] to-[#C10007] rounded-2xl flex items-center justify-center animate-float">
                        <FaQrcode className="text-white text-4xl" />
                      </div>
                      <p className="mt-4 font-semibold text-gray-700">Interactive Menu Preview</p>
                      <p className="text-sm text-gray-500">Scan to explore</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ================= BENEFITS ================= */}
          <section className="bg-gradient-to-b bg-red-700 from-white to-gray-50 py-20 observe">
            <div className="max-w-6xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <h2 className="text-4xl font-bold text-gray-900">
                  Built for <span className="text-[#C10007]">Everyone</span>
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                  Designed to enhance experience for both restaurant owners and their valued customers
                </p>
              </motion.div>

              <div className="mt-16 grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "For Restaurants",
                    color: "from-[#615FFF] to-[#615FFF]",
                    features: [
                      "Faster service & table turnover",
                      "Fewer ordering mistakes",
                      "Reduced staff workload",
                      "Actionable business insights"
                    ],
                    icon: <FaChartLine />
                  },
                  {
                    title: "For Customers",
                    color: "from-[#C10007] to-[#d91a1a]",
                    features: [
                      "No waiting for staff",
                      "Clear menus & pricing",
                      "Quick & secure payments",
                      "Better dining experience"
                    ],
                    icon: <FaUsers />
                  }
                ].map((card, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                  >
                    <div className={`inline-flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${card.color} text-white mb-6`}>
                      <div className="text-2xl">{card.icon}</div>
                      <h3 className="text-2xl font-bold">{card.title}</h3>
                    </div>
                    
                    <ul className="space-y-4">
                      {card.features.map((feature, fIdx) => (
                        <motion.li
                          key={fIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: fIdx * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center gap-3 text-gray-700 group/item"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${card.color} group-hover/item:scale-150 transition-transform duration-300`}></div>
                          <span className="text-lg">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= HOW IT WORKS ================= */}
          <section className="bg-white pt-20 pb-40 observe">
            <div className="max-w-6xl mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-gray-900">
                  How It <span className="text-[#432DD7]">Works</span>
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                  Simple steps to transform your restaurant service
                </p>
              </motion.div>

              <div className="mt-16 relative">
                {/* Connecting Line */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#432DD7] via-[#C10007] to-[#432DD7] -translate-y-1/2 opacity-20"></div>
                
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { step: "Scan QR Code", icon: <FaQrcode />, color: "from-[#432DD7] to-[#5a42e0]" },
                    { step: "Browse Menu", icon: <FaStar />, color: "from-[#C10007] to-[#d91a1a]" },
                    { step: "Place Order", icon: <FaBolt />, color: "from-[#432DD7] to-[#5a42e0]" },
                    { step: "Pay & Enjoy", icon: <FaCreditCard />, color: "from-[#C10007] to-[#d91a1a]" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      <div className="relative z-10 p-8 rounded-2xl border-2 border-gray-100 bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-2xl mb-6 animate-pulse`}>
                          {item.icon}
                        </div>
                        <div className="text-3xl font-bold text-gray-900 mb-2">{index + 1}</div>
                        <p className="text-xl font-semibold text-gray-800">{item.step}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            
            @keyframes gradient {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            
            @keyframes gradient-slow {
              0%, 100% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
            }
            
            @keyframes widthPulse {
              0%, 100% { width: 50%; }
              50% { width: 60%; }
            }
            
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
            
            .animate-gradient {
              background-size: 200% 200%;
              animation: gradient 3s ease infinite;
            }
            
            .animate-gradient-slow {
              background-size: 200% 200%;
              animation: gradient-slow 10s ease infinite;
            }
            
            .animate-widthPulse {
              animation: widthPulse 2s ease-in-out infinite;
            }
            
            .animate-fadeInUp {
              animation: fadeInUp 0.6s ease-out forwards;
            }
          `}</style>
        </div>
    </div>
  );
}