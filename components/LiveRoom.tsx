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
  const [timeLeft, setTimeLeft] = useState(600);
  const [userRolePopup, setUserRolePopup] = useState<'OWNER' | 'BUYER' | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialBids = [
      { id: '1', userId: 'u1', userName: 'User8823', amount: property.startingPrice, timestamp: Date.now() },
      { id: '2', userId: 'u2', userName: 'Chen_Sir', amount: property.startingPrice + 2, timestamp: Date.now() + 1000 },
    ];
    setBids(initialBids);
    setCurrentPrice(property.startingPrice + 2);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [bids]);

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
    setUserRolePopup(null);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col font-sans">
      {/* 1. Live Stream Area */}
      <div className="relative h-[45vh] bg-gray-950 overflow-hidden">
         <img src={property.image} className="w-full h-full object-cover opacity-60" />
         {/* Subtle gradient for text visibility */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
         
         {/* Glass Host Card */}
         <div className="absolute top-6 left-4 flex items-center gap-3 bg-black/40 backdrop-blur-md rounded-full pr-4 pl-1 py-1 border border-white/10">
            <div className="w-8 h-8 rounded-full border border-white/50 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=Host&background=FF4D00&color=fff" />
            </div>
            <div>
                <div className="text-[10px] font-bold text-white tracking-wide">金牌拍卖师</div>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    <span className="text-[9px] text-white/80 font-medium">12k+ 围观</span>
                </div>
            </div>
         </div>

         {/* Timer Capsule */}
         <div className="absolute top-6 right-4 flex flex-col items-end gap-2">
             <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-center shadow-lg">
                 <div className="text-[9px] text-white/60 font-bold uppercase tracking-wider">Time Left</div>
                 <div className="font-mono font-bold text-white tabular-nums">00:{Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
             </div>
             
             <div className="bg-brand-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-brand-500/20 animate-bounce">
                18人已交保
             </div>
         </div>
         
         {/* Floating Glass Tools */}
         <div className="absolute bottom-6 right-4 flex flex-col gap-3">
            <button className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-xl shadow-lg active:scale-90 transition hover:bg-black/60">🧮</button>
            <button className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-xl shadow-lg active:scale-90 transition hover:bg-black/60">📊</button>
         </div>

         <button onClick={onClose} className="absolute top-6 right-4 w-8 h-8 opacity-0">X</button>
      </div>

      {/* 2. Interactive Sheet (Dark) */}
      <div className="flex-1 bg-gray-900 rounded-t-[2.5rem] -mt-8 relative z-10 flex flex-col overflow-hidden shadow-[0_-10px_50px_rgba(0,0,0,0.8)] border-t border-white/5">
          {/* Header */}
          <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/90 backdrop-blur">
             <div>
                <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">当前最高价 Current Bid</div>
                <div className="text-4xl font-black text-brand-500 tracking-tighter leading-none">
                    {currentPrice} <span className="text-lg">万</span>
                </div>
             </div>
             <div className="text-right">
                <div className="text-gray-500 text-xs font-medium line-through decoration-gray-600">市场价 {property.marketPrice}万</div>
                <div className="text-green-400 text-xs font-bold bg-green-900/30 px-2 py-0.5 rounded-full mt-1 border border-green-500/20">
                   溢价率 {(currentPrice/property.startingPrice * 100 - 100).toFixed(1)}%
                </div>
             </div>
          </div>

          {/* Bid Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 relative bg-gray-900" ref={scrollRef}>
             <div className="flex justify-center">
                 <span className="bg-gray-800 text-gray-400 text-[10px] font-bold px-3 py-1 rounded-full border border-white/5">拍卖已开始 Auction Started</span>
             </div>
             
             {bids.map((bid) => (
                 <div key={bid.id} className={`flex ${bid.isMe ? 'justify-end' : 'justify-start'} animate-slide-up`}>
                     <div className={`max-w-[85%] rounded-2xl px-5 py-3 shadow-sm border border-white/5 ${
                         bid.isMe 
                         ? 'bg-brand-600 text-white rounded-br-none border-brand-500' 
                         : 'bg-gray-800 text-white rounded-bl-none'
                     }`}>
                         <div className={`text-[10px] font-bold mb-1 flex justify-between gap-6 ${bid.isMe ? 'text-white/70' : 'text-gray-400'}`}>
                            <span>{bid.userName}</span>
                            <span>{new Date(bid.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}</span>
                         </div>
                         <div className="font-bold flex items-center gap-2 text-sm">
                            出价 <span className="text-lg font-black">{bid.amount}万</span>
                            {bid.amount >= currentPrice && !bid.isMe && <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded shadow-sm">领先</span>}
                         </div>
                     </div>
                 </div>
             ))}
             
             {/* Notification Card */}
             {userRolePopup === 'BUYER' && (
                 <div className="bg-gray-800/90 backdrop-blur border border-yellow-500/30 shadow-xl p-4 rounded-2xl mx-2 my-2 animate-fade-in relative overflow-hidden">
                     <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500"></div>
                     <button onClick={() => setUserRolePopup(null)} className="absolute top-2 right-3 text-gray-500 hover:text-gray-300">×</button>
                     <div className="text-yellow-500 font-bold text-sm mb-1 flex items-center gap-2">
                        <span className="bg-yellow-900/40 p-1 rounded-full text-xs">💡</span> 觉得价格太高？
                     </div>
                     <div className="text-xs text-gray-400 mb-3 pl-7">为您推荐同小区高性价比房源，本场落选可直接带看。</div>
                     <div className="pl-7">
                        <button className="bg-white text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition">预约下周提醒</button>
                     </div>
                 </div>
             )}
          </div>

          {/* Bottom Controls */}
          <div className="p-4 pb-8 bg-gray-900 border-t border-gray-800 shadow-[0_-5px_20px_rgba(0,0,0,0.2)]">
              <div className="flex gap-3 mb-3">
                  {[1, 2, 5].map(step => (
                      <button 
                        key={step} 
                        className="flex-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 py-2.5 rounded-xl text-sm font-bold text-gray-300 transition active:scale-95"
                        onClick={() => setCurrentPrice(currentPrice + step)}
                      >
                        +{step}万
                      </button>
                  ))}
              </div>
              <button 
                onClick={handleMyBid}
                className="w-full bg-white text-black py-4 rounded-xl text-lg font-black shadow-glow hover:bg-gray-100 active:scale-95 transition-all relative overflow-hidden group"
              >
                  <span className="relative z-10">立即出价 BID</span>
              </button>
              <div className="text-center mt-3 text-[10px] text-gray-600 font-medium">
                  出价即代表同意《拍卖成交确认书》
              </div>
          </div>
      </div>
      
      <button onClick={onFinish} className="fixed top-24 right-4 bg-black/40 backdrop-blur text-white/50 text-[10px] px-2 py-1 rounded border border-white/5">End Demo</button>
    </div>
  );
};

export default LiveRoom;