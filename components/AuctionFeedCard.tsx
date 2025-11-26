import React from 'react';
import { Property } from '../types';

interface Props {
  property: Property;
  onClick: () => void;
}

const AuctionFeedCard: React.FC<Props> = ({ property, onClick }) => {
  const discount = Math.round(((property.marketPrice - property.startingPrice) / property.marketPrice) * 100);
  const isLive = property.status === 'LIVE';

  const currentPrice = property.currentPrice || property.startingPrice;
  const bidCount = property.currentBidCount || 0;
  const premium = currentPrice > property.startingPrice 
    ? Math.round(((currentPrice - property.startingPrice) / property.startingPrice) * 100) 
    : 0;

  return (
    <div onClick={onClick} className="group relative cursor-pointer w-full transform transition-all duration-300 hover:scale-[1.02] active:scale-95">
      {/* Floating Card Container - Dark */}
      <div className="relative bg-gray-900 rounded-[2.5rem] overflow-hidden shadow-dribbble group-hover:shadow-dribbble-hover transition-shadow duration-300 border border-white/5">
        
        {/* Image Section */}
        <div className="relative h-72 w-full">
          <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-80" />
          
          {/* Status Badges */}
          <div className="absolute top-5 left-5 flex gap-2">
             {isLive ? (
               <div className="bg-gray-900/80 backdrop-blur-md text-brand-500 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/10">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                  </span>
                  LIVE 拍卖中
               </div>
             ) : (
               <div className="bg-gray-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-white/10">
                  周六 20:00 开拍
               </div>
             )}
             
             <div className="bg-black/30 backdrop-blur-md text-white/90 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 border border-white/5">
                {property.viewCount} 围观
             </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 relative">
           {/* Floating Action Button (CTA) */}
           {isLive && (
              <div className="absolute -top-6 right-6">
                  <div className="bg-brand-500 text-white shadow-glow shadow-brand-500/40 rounded-full w-12 h-12 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 border border-white/10">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
              </div>
           )}

           <div className="flex justify-between items-start mb-4">
              <div className="pr-4">
                 <h3 className="text-xl font-extrabold text-white leading-tight mb-2">{property.title}</h3>
                 <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-gray-400">
                    <span className="bg-gray-800 px-2 py-1 rounded-md text-gray-300">{property.district}</span>
                    <span className="bg-gray-800 px-2 py-1 rounded-md text-gray-300">{property.layout}</span>
                    <span className="bg-gray-800 px-2 py-1 rounded-md text-gray-300">{property.area}㎡</span>
                 </div>
              </div>
           </div>

           {/* Price & Status Row */}
           <div className="flex items-end justify-between border-t border-gray-800 pt-4">
              <div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-xs text-gray-500 font-medium">评估价 ¥{property.marketPrice}万</span>
                     <span className="bg-green-900/30 text-green-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                        ↓{discount}% 捡漏
                     </span>
                  </div>
                  {isLive ? (
                     <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-gray-400">当前</span>
                        <span className="text-3xl font-black text-brand-500 tracking-tight">{currentPrice}</span>
                        <span className="text-sm font-bold text-brand-500">万</span>
                     </div>
                  ) : (
                     <div className="flex items-baseline gap-1">
                        <span className="text-sm font-bold text-gray-400">起拍</span>
                        <span className="text-3xl font-black text-white tracking-tight">{property.startingPrice}</span>
                        <span className="text-sm font-bold text-white">万</span>
                     </div>
                  )}
              </div>

              {/* Status Indicator */}
              {isLive ? (
                 <div className="text-right">
                    <div className="text-xs font-bold text-brand-500 mb-1 flex items-center justify-end gap-1">
                        🔥 <span>{bidCount}轮出价</span>
                    </div>
                    {premium > 0 && (
                        <span className="text-red-400 bg-red-900/20 text-[10px] font-bold px-2 py-1 rounded-full border border-red-500/20">
                           溢价 {premium}%
                        </span>
                    )}
                 </div>
              ) : (
                 <button className="text-xs font-bold bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition border border-gray-600">
                    预约提醒
                 </button>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionFeedCard;