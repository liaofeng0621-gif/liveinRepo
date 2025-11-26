import React from 'react';
import { Property } from '../types';

interface Props {
  property: Property;
  onBack: () => void;
  onJoinAuction: () => void;
}

const ListingDetail: React.FC<Props> = ({ property, onBack, onJoinAuction }) => {
  return (
    <div className="min-h-screen bg-gray-950 pb-28 relative">
      {/* Sticky Navigation */}
      <div className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 pointer-events-none">
        <button onClick={onBack} className="w-10 h-10 bg-black/30 backdrop-blur-md shadow-sm rounded-full flex items-center justify-center text-white pointer-events-auto hover:bg-black/50 transition border border-white/10">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex gap-3 pointer-events-auto">
           <button className="w-10 h-10 bg-black/30 backdrop-blur-md shadow-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition border border-white/10">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
           </button>
        </div>
      </div>

      {/* Hero Image Area */}
      <div className="fixed top-0 left-0 right-0 h-[45vh] z-0">
        <img src={property.images[0]} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-gray-950"></div>
      </div>

      {/* Scrollable Content Sheet (Dark) */}
      <div className="relative z-10 mt-[35vh] bg-gray-900 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden min-h-[70vh] border-t border-white/5">
        {/* Drag Handle */}
        <div className="w-full flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 bg-gray-700 rounded-full"></div>
        </div>

        <div className="px-6 py-4">
             {/* Header Info */}
             <div className="flex flex-wrap gap-2 mb-4">
                {property.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-gray-800 rounded-md text-xs font-semibold text-gray-300 border border-gray-700">
                    {tag}
                  </span>
                ))}
                <span className="px-2.5 py-1 bg-brand-900/30 border border-brand-500/30 rounded-md text-xs font-bold text-brand-500">
                  全维验真 Verified
                </span>
             </div>
             
             <h1 className="text-3xl font-black text-white mb-2 leading-tight">{property.title}</h1>
             <p className="text-gray-400 font-medium mb-8">{property.yearBuilt}年建 · {property.floor} · {property.area}平米</p>

             {/* Price Visualizer (Dark) */}
             <div className="bg-gray-800 rounded-2xl p-6 border border-white/5 mb-8 shadow-sm">
                <div className="flex justify-between items-end mb-4">
                   <div>
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">本场起拍价 Starting Bid</p>
                      <div className="text-4xl font-black text-brand-500 tracking-tight">{property.startingPrice}<span className="text-xl">万</span></div>
                   </div>
                   <div className="text-right">
                      <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">市场评估 Market</p>
                      <div className="text-xl font-bold text-gray-500 line-through decoration-gray-600 decoration-2">{property.marketPrice}万</div>
                   </div>
                </div>
                
                {/* Modern Progress Bar */}
                <div className="h-3 bg-gray-700 rounded-full overflow-hidden relative mb-3">
                   <div className="absolute top-0 left-0 h-full bg-brand-500 w-[70%] rounded-full shadow-glow"></div>
                   <div className="absolute top-0 left-[70%] w-0.5 h-full bg-white z-10"></div>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-400 font-bold">
                   <span className="bg-brand-900/50 p-1 rounded-full">🔥</span>
                   当前价格低于同小区近期成交均价 15%
                </div>
             </div>

             {/* Trust Reports */}
             <div className="space-y-4 mb-10">
                <h3 className="font-bold text-lg text-white">资产路演报告 Due Diligence</h3>
                
                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-2xl border border-white/5 shadow-sm cursor-pointer hover:bg-gray-700 transition">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 text-xl border border-blue-500/20">
                         ⚖️
                      </div>
                      <div>
                         <div className="font-bold text-white">产权调查报告</div>
                         <div className="text-xs text-green-400 font-medium bg-green-900/30 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-green-500/20">无查封 · 无抵押</div>
                      </div>
                   </div>
                   <div className="text-gray-600">➜</div>
                </div>

                <div className="flex items-center justify-between bg-gray-800 p-4 rounded-2xl border border-white/5 shadow-sm cursor-pointer hover:bg-gray-700 transition">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-900/30 flex items-center justify-center text-yellow-500 text-xl border border-yellow-500/20">
                         🏠
                      </div>
                      <div>
                         <div className="font-bold text-white">房屋体检报告</div>
                         <div className="text-xs text-gray-500 font-medium mt-0.5">实勘专员已核验物理状况</div>
                      </div>
                   </div>
                   <div className="text-gray-600">➜</div>
                </div>
             </div>

             {/* Services */}
             <div className="mb-24">
                <h3 className="font-bold text-lg text-white mb-4">拍卖服务 Services</h3>
                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-gray-800 p-5 rounded-2xl border border-white/5 text-center hover:bg-gray-700 transition">
                      <div className="text-3xl mb-3">📅</div>
                      <div className="font-bold text-white mb-1">Open House</div>
                      <div className="text-xs text-gray-500">周六集中看房</div>
                      <button className="mt-4 w-full py-2 rounded-lg bg-gray-700 shadow-sm text-xs font-bold text-white border border-gray-600">立即预约</button>
                   </div>
                   <div className="bg-gray-800 p-5 rounded-2xl border border-white/5 text-center hover:bg-gray-700 transition">
                      <div className="text-3xl mb-3">💰</div>
                      <div className="font-bold text-white mb-1">金融预审</div>
                      <div className="text-xs text-gray-500">最高可贷额度</div>
                      <button className="mt-4 w-full py-2 rounded-lg bg-gray-700 shadow-sm text-xs font-bold text-white border border-gray-600">一键测算</button>
                   </div>
                </div>
             </div>
        </div>
      </div>

      {/* Floating Bottom Bar (Dark) */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/80 backdrop-blur-xl border-t border-gray-800 p-4 pb-8 flex items-center gap-6 z-50">
         <div className="text-center px-2">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">保证金 Deposit</div>
            <div className="font-black text-white text-lg">¥{property.depositAmount}</div>
         </div>
         <button 
           onClick={onJoinAuction}
           className="flex-1 bg-white text-black font-bold py-4 rounded-xl shadow-glow active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-gray-200"
         >
           <span>缴纳保证金 & 进场</span>
           <span className="bg-black/10 px-2 py-0.5 rounded text-[10px]">获号牌</span>
         </button>
      </div>
    </div>
  );
};

export default ListingDetail;