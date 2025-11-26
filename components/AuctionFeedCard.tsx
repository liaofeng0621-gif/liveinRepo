import React from 'react';
import { Property } from '../types';

interface Props {
  property: Property;
  onClick: () => void;
}

const AuctionFeedCard: React.FC<Props> = ({ property, onClick }) => {
  const discount = Math.round(((property.marketPrice - property.startingPrice) / property.marketPrice) * 100);
  const isLive = property.status === 'LIVE';

  // Calculations for dynamic display
  const currentPrice = property.currentPrice || property.startingPrice;
  const bidCount = property.currentBidCount || 0;
  const premium = currentPrice > property.startingPrice 
    ? Math.round(((currentPrice - property.startingPrice) / property.startingPrice) * 100) 
    : 0;

  return (
    <div onClick={onClick} className={`relative group cursor-pointer active:scale-95 transition-all duration-200 rounded-3xl ${isLive ? 'ring-2 ring-brand-500 shadow-[0_0_20px_rgba(255,77,0,0.3)]' : ''}`}>
      <div className="relative h-72 w-full rounded-3xl overflow-hidden">
        <img src={property.image} alt={property.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4 flex gap-2">
           {isLive ? (
             <div className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg shadow-red-600/40">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                LIVE 正在拍卖
             </div>
           ) : (
             <div className="bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                周六 20:00 开拍
             </div>
           )}
           
           <div className="bg-black/40 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1">
              👁️ {property.viewCount}人
           </div>
        </div>

        {/* Live CTA Button Overlay */}
        {isLive && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="bg-brand-500 text-white font-bold px-6 py-2 rounded-full shadow-lg scale-110">
                    立即进入直播间 →
                </div>
            </div>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 to-transparent pt-20">
          <div className="flex justify-between items-end mb-2">
             <div className="flex-1 mr-4">
                 <h3 className="text-xl font-bold text-white leading-tight mb-1">{property.title}</h3>
                 <div className="flex items-center gap-2 text-xs text-gray-300">
                    <span className="px-1.5 py-0.5 bg-white/10 rounded">{property.district}</span>
                    <span>{property.layout}</span>
                    <span>{property.area}㎡</span>
                 </div>
             </div>
             
             {/* Dynamic Price Display */}
             <div className="text-right">
                {isLive && currentPrice > property.startingPrice ? (
                    <div className="flex flex-col items-end">
                         <div className="text-xs font-bold text-brand-500 animate-pulse mb-0.5">当前价</div>
                         <div className="text-brand-500 font-black text-3xl flex items-baseline justify-end gap-1 text-shadow-sm">
                            {currentPrice}
                            <span className="text-sm">万</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-brand-500 font-black text-3xl flex items-baseline justify-end gap-1 text-shadow-sm">
                       <span className="text-xs font-normal text-gray-400 opacity-80">起拍</span>
                       {property.startingPrice}
                       <span className="text-sm">万</span>
                    </div>
                )}
             </div>
          </div>
          
          {/* Footer Info Bar */}
          <div className="mt-3 flex items-center justify-between text-xs border-t border-white/10 pt-3">
             {/* Left Side: Static Value Anchor */}
             <div className="flex items-center gap-2">
                <span className="text-gray-500 line-through">评估价 {property.marketPrice}万</span>
                <span className="text-green-400 font-bold bg-green-900/30 px-1.5 py-0.5 rounded">
                   ↓{discount}% 捡漏
                </span>
             </div>

             {/* Right Side: Quantified Intensity */}
             {isLive ? (
                 <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-brand-500 font-bold">
                        🔥 <span>{bidCount}轮出价</span>
                    </span>
                    {premium > 0 && (
                        <span className="text-red-400 font-bold bg-red-900/30 px-1.5 py-0.5 rounded">
                           溢价 {premium}%
                        </span>
                    )}
                 </div>
             ) : (
                <span className="text-gray-400">预约人数 458</span>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionFeedCard;