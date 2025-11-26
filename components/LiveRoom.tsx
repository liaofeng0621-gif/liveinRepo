import React, { useState, useEffect, useRef } from 'react';
import { Property, Bid } from '../types';

interface Props {
  property: Property;
  onClose: () => void;
  onFinish: () => void;
}

const LiveRoom: React.FC<Props> = ({ property, onClose, onFinish }) => {
  const [bids, setBids] = useState<Bid[]>([]);
  const [currentPrice, setCurrentPrice] = useState(property.startingPrice);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes demo
  const [userRolePopup, setUserRolePopup] = useState<'OWNER' | 'BUYER' | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Mock initial bids
  useEffect(() => {
    const initialBids = [
      { id: '1', userId: 'u1', userName: 'User8823', amount: property.startingPrice, timestamp: Date.now() },
      { id: '2', userId: 'u2', userName: 'Chen_Sir', amount: property.startingPrice + 2, timestamp: Date.now() + 1000 },
    ];
    setBids(initialBids);
    setCurrentPrice(property.startingPrice + 2);
  }, []);

  // Auto-scroll bids
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [bids]);

  // Simulate incoming bids & Popups (The "Three Grips" from PDF)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const increment = Math.floor(Math.random() * 5) + 1;
        const newPrice = currentPrice + increment;
        const newBid: Bid = {
          id: Date.now().toString(),
          userId: `u${Date.now()}`,
          userName: `Bidder${Math.floor(Math.random() * 1000)}`,
          amount: newPrice,
          timestamp: Date.now()
        };
        setBids(prev => [...prev, newBid]);
        setCurrentPrice(prev => prev + increment);
      }
    }, 2000);

    // Trigger "Buyer Grip" popup after 5 seconds (Simulating user not bidding)
    const buyerPopupTimer = setTimeout(() => {
        setUserRolePopup('BUYER');
    }, 5000);

    return () => {
        clearInterval(interval);
        clearTimeout(buyerPopupTimer);
    }
  }, [currentPrice]);

  const handleMyBid = () => {
    const increment = 5;
    const newPrice = currentPrice + increment;
    const newBid: Bid = {
      id: Date.now().toString(),
      userId: 'me',
      userName: '我 (ME)',
      amount: newPrice,
      timestamp: Date.now(),
      isMe: true
    };
    setBids(prev => [...prev, newBid]);
    setCurrentPrice(newPrice);
    
    // Close popups if I bid
    setUserRolePopup(null);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* 1. Live Stream Area (Top Half) */}
      <div className="relative h-[45vh] bg-gray-900 overflow-hidden">
         {/* Simulated Video Feed */}
         <img src={property.image} className="w-full h-full object-cover opacity-80" />
         <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
         
         {/* Host Overlay */}
         <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border-2 border-brand-500 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Host&background=FF4D00&color=fff" />
            </div>
            <div>
                <div className="text-xs font-bold text-white">金牌拍卖师</div>
                <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-[10px] text-gray-300">LIVE | 12,304人围观</span>
                </div>
            </div>
         </div>

         {/* Auction Timer & Stats */}
         <div className="absolute top-4 right-4 flex flex-col items-end">
             <div className="bg-black/40 backdrop-blur px-3 py-1 rounded-lg border border-white/10 text-center mb-2">
                 <div className="text-[10px] text-gray-400">距离截拍</div>
                 <div className="font-mono font-bold text-red-500">00:{Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
             </div>
             {/* "Data Grip" from PDF */}
             <div className="bg-brand-600/90 text-white text-[10px] px-2 py-1 rounded animate-bounce">
                当前已有 18 人缴纳保证金
             </div>
         </div>
         
         {/* Tools Overlay */}
         <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur border border-white/20 flex items-center justify-center text-xl">🧮</button>
            <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur border border-white/20 flex items-center justify-center text-xl">📊</button>
         </div>

         <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 opacity-0">X</button>
      </div>

      {/* 2. Interactive Area (Bottom Half) */}
      <div className="flex-1 bg-dark-900 rounded-t-3xl -mt-6 relative z-10 flex flex-col overflow-hidden border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
          {/* Current Price Header */}
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-dark-800">
             <div>
                <div className="text-gray-400 text-xs">当前最高价 (Current Bid)</div>
                <div className="text-3xl font-black text-brand-500 tracking-tight">
                    {currentPrice} <span className="text-sm">万</span>
                </div>
             </div>
             <div className="text-right">
                <div className="text-gray-500 text-xs line-through">市场价 {property.marketPrice}万</div>
                <div className="text-green-500 text-xs font-bold">溢价率 {(currentPrice/property.startingPrice * 100 - 100).toFixed(1)}%</div>
             </div>
          </div>

          {/* Bid Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 relative" ref={scrollRef}>
             <div className="text-center text-xs text-gray-600 my-4">--- 拍卖已开始 (Auction Started) ---</div>
             {bids.map((bid) => (
                 <div key={bid.id} className={`flex ${bid.isMe ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                     <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${bid.isMe ? 'bg-brand-600 text-white' : 'bg-dark-700 text-gray-200'}`}>
                         <div className="text-[10px] opacity-70 mb-0.5 flex justify-between gap-4">
                            <span>{bid.userName}</span>
                            <span>{new Date(bid.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
                         </div>
                         <div className="font-bold flex items-center gap-1">
                            出价 <span className="text-lg">{bid.amount}万</span>
                            {bid.amount >= currentPrice && !bid.isMe && <span className="bg-red-500 text-[10px] px-1 rounded ml-1">领先</span>}
                         </div>
                     </div>
                 </div>
             ))}
             
             {/* Dynamic Grips / Popups based on PDF logic */}
             {userRolePopup === 'BUYER' && (
                 <div className="bg-gray-800/90 backdrop-blur border border-gray-600 p-3 rounded-xl mx-4 my-2 animate-pulse border-l-4 border-l-yellow-500 relative">
                     <button onClick={() => setUserRolePopup(null)} className="absolute top-1 right-2 text-gray-400">×</button>
                     <div className="text-yellow-500 font-bold text-sm mb-1">💡 觉得价格太高？</div>
                     <div className="text-xs text-white">为您推荐同小区高性价比房源，本场落选可直接带看。</div>
                     <button className="mt-2 bg-white/10 text-xs px-3 py-1 rounded hover:bg-white/20 transition">预约下周提醒</button>
                 </div>
             )}
          </div>

          {/* Bidding Control */}
          <div className="p-4 pb-8 bg-dark-800 border-t border-white/5">
              <div className="flex gap-3 mb-3">
                  {[1, 2, 5].map(step => (
                      <button 
                        key={step} 
                        className="flex-1 bg-dark-700 hover:bg-dark-600 border border-white/10 py-2 rounded-lg text-sm font-medium transition"
                        onClick={() => setCurrentPrice(currentPrice + step)} // Just visually preview
                      >
                        +{step}万
                      </button>
                  ))}
              </div>
              <button 
                onClick={handleMyBid}
                className="w-full bg-gradient-to-r from-brand-500 to-red-600 py-4 rounded-xl text-xl font-black text-white shadow-[0_0_20px_rgba(255,77,0,0.4)] hover:shadow-[0_0_30px_rgba(255,77,0,0.6)] active:scale-95 transition-all relative overflow-hidden group"
              >
                  <span className="relative z-10">立即出价 (BID)</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              <div className="text-center mt-2 text-[10px] text-gray-500">
                  出价即代表同意《拍卖成交确认书》
              </div>
          </div>
      </div>
      
      {/* End Auction Simulation Button (Hidden for demo) */}
      <button onClick={onFinish} className="fixed top-20 right-4 bg-white/10 text-xs px-2 py-1 rounded">End Demo</button>
    </div>
  );
};

export default LiveRoom;