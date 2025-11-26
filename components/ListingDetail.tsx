import React from 'react';
import { Property } from '../types';

interface Props {
  property: Property;
  onBack: () => void;
  onJoinAuction: () => void;
}

const ListingDetail: React.FC<Props> = ({ property, onBack, onJoinAuction }) => {
  return (
    <div className="min-h-screen bg-dark-900 pb-24 text-white">
      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 p-4 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <button onClick={onBack} className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center pointer-events-auto">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="flex gap-3 pointer-events-auto">
           <button className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center">
             <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
           </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="h-[50vh] relative">
        <img src={property.images[0]} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent"></div>
        <div className="absolute bottom-8 left-5 right-5">
           <div className="flex flex-wrap gap-2 mb-3">
              {property.tags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-white/10 backdrop-blur border border-white/20 rounded text-xs text-gray-200">
                  {tag}
                </span>
              ))}
              <span className="px-2 py-1 bg-brand-500/20 border border-brand-500 rounded text-xs text-brand-500 font-bold">
                全维验真
              </span>
           </div>
           <h1 className="text-3xl font-black mb-1">{property.title}</h1>
           <p className="text-gray-400">{property.yearBuilt}年建 · {property.floor}</p>
        </div>
      </div>

      {/* Price Analysis (The "Trap" & "Bargain") */}
      <div className="px-5 mb-8">
        <div className="bg-dark-800 rounded-2xl p-5 border border-white/5">
           <div className="flex justify-between items-center mb-4">
              <div>
                 <p className="text-gray-400 text-xs mb-1">本场起拍价 (Starting Bid)</p>
                 <div className="text-4xl font-black text-brand-500">{property.startingPrice}<span className="text-lg">万</span></div>
              </div>
              <div className="text-right">
                 <p className="text-gray-400 text-xs mb-1">市场评估价 (Market Val)</p>
                 <div className="text-xl font-bold text-gray-400 line-through decoration-gray-500">{property.marketPrice}万</div>
              </div>
           </div>
           
           <div className="h-2 bg-gray-700 rounded-full overflow-hidden relative mb-2">
              <div className="absolute top-0 left-0 h-full bg-brand-500 w-[60%]"></div>
              {/* Markers */}
              <div className="absolute top-0 left-[60%] w-0.5 h-full bg-white shadow-[0_0_10px_white]"></div>
           </div>
           <p className="text-xs text-gray-400">🔥 当前价格低于同小区近期成交均价 15%</p>
        </div>
      </div>

      {/* Security & Verification (Trust Triggers) */}
      <div className="px-5 mb-8 space-y-3">
         <h3 className="font-bold text-lg">资产路演报告 (Due Diligence)</h3>
         
         <div className="flex items-center justify-between bg-dark-800 p-4 rounded-xl border border-white/5 cursor-pointer hover:bg-dark-700 transition">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  ⚖️
               </div>
               <div>
                  <div className="font-bold text-sm">产权调查报告</div>
                  <div className="text-xs text-green-400">无查封 · 无抵押 · 律师已核验</div>
               </div>
            </div>
            <div className="text-gray-500">➜</div>
         </div>

         <div className="flex items-center justify-between bg-dark-800 p-4 rounded-xl border border-white/5 cursor-pointer hover:bg-dark-700 transition">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                  🏠
               </div>
               <div>
                  <div className="font-bold text-sm">房屋体检报告</div>
                  <div className="text-xs text-gray-400">实勘专员已出具</div>
               </div>
            </div>
            <div className="text-gray-500">➜</div>
         </div>
      </div>

      {/* Pre-Auction Services */}
      <div className="px-5 mb-24">
         <h3 className="font-bold text-lg mb-3">拍卖前置服务</h3>
         <div className="grid grid-cols-2 gap-3">
            <div className="bg-dark-800 p-4 rounded-xl border border-white/5 text-center">
               <div className="text-2xl mb-2">📅</div>
               <div className="font-bold text-sm mb-1">Open House</div>
               <div className="text-xs text-gray-400">预约周六集中看房</div>
               <button className="mt-3 w-full py-1.5 rounded-lg bg-white/5 text-xs border border-white/10">立即预约</button>
            </div>
            <div className="bg-dark-800 p-4 rounded-xl border border-white/5 text-center">
               <div className="text-2xl mb-2">💰</div>
               <div className="font-bold text-sm mb-1">金融预审</div>
               <div className="text-xs text-gray-400">测算最高可贷额度</div>
               <button className="mt-3 w-full py-1.5 rounded-lg bg-white/5 text-xs border border-white/10">一键测算</button>
            </div>
         </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-white/10 p-4 pb-8 flex items-center gap-4 z-50">
         <div className="text-center px-2">
            <div className="text-xs text-gray-400">保证金</div>
            <div className="font-bold">¥{property.depositAmount}</div>
         </div>
         <button 
           onClick={onJoinAuction}
           className="flex-1 bg-gradient-to-r from-brand-500 to-red-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2"
         >
           <span>缴纳保证金 & 进场</span>
           <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">获竞拍号牌</span>
         </button>
      </div>
    </div>
  );
};

export default ListingDetail;