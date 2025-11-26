import React, { useState } from 'react';
import { Property, AppView } from './types';
import AuctionFeedCard from './components/AuctionFeedCard';
import ListingDetail from './components/ListingDetail';
import LiveRoom from './components/LiveRoom';

// Mock Data
const MOCK_PROPERTY: Property = {
  id: 'p1',
  title: '朝阳公园·泛海国际 观山苑',
  district: '北京·朝阳公园',
  tags: ['CBD核心', '全维验真', '急售资产'],
  marketPrice: 500,
  startingPrice: 450,
  currentPrice: 468,
  currentBidCount: 32,
  area: 168,
  layout: '3室2厅',
  image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
  images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80'
  ],
  yearBuilt: '2015',
  floor: '中楼层/26层',
  viewCount: 2405,
  depositAmount: 50000,
  status: 'LIVE'
};

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('FEED');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setView('DETAIL');
  };

  const handleJoinAuction = () => {
    setView('LIVE_ROOM');
  };

  const handleFinishAuction = () => {
    setView('SIGNING');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-brand-500 selection:text-white">
      
      {/* View: FEED */}
      {view === 'FEED' && (
        <div className="pb-24 max-w-md mx-auto relative min-h-screen bg-gray-950">
          {/* Glass Header */}
          <header className="px-6 py-4 flex justify-between items-center sticky top-0 z-40">
             {/* Glassmorphic Background Blur */}
             <div className="absolute inset-0 bg-gray-950/70 backdrop-blur-xl border-b border-white/5 shadow-sm"></div>
             
             <div className="relative z-10 flex items-center gap-2">
                 <div className="text-xl font-black tracking-tighter text-white">LiveIn<span className="text-brand-500">.</span></div>
             </div>
             <div className="relative z-10 flex items-center gap-3">
                 <div className="text-xs font-semibold text-gray-400">发现美好居住生活</div>
                 <div className="w-9 h-9 rounded-full bg-gray-800 border-2 border-gray-700 shadow-sm overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=User&background=333&color=fff" alt="User" />
                </div>
             </div>
          </header>
          
          <div className="px-6 mt-8 mb-6 relative">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900 border border-gray-800 shadow-sm mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                <span className="text-brand-500 text-xs font-bold uppercase tracking-wider">Live Event</span>
             </div>
             <h1 className="text-4xl font-extrabold text-white leading-tight tracking-tight mb-2">周末<br/>竞拍夜</h1>
             <p className="text-gray-400 text-sm font-medium">全城严选资产 · 真实房源 · 透明竞价</p>
          </div>

          <div className="px-6 space-y-8">
            <AuctionFeedCard 
              property={MOCK_PROPERTY} 
              onClick={() => handlePropertyClick(MOCK_PROPERTY)} 
            />
            <AuctionFeedCard 
              property={{
                  ...MOCK_PROPERTY, 
                  id: 'p2', 
                  title: '融创壹号院 · 顶层复式', 
                  startingPrice: 800, 
                  marketPrice: 950,
                  image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
                  status: 'UPCOMING'
              }} 
              onClick={() => handlePropertyClick(MOCK_PROPERTY)} 
            />
          </div>
        </div>
      )}

      {/* View: DETAIL */}
      {view === 'DETAIL' && selectedProperty && (
        <ListingDetail 
          property={selectedProperty} 
          onBack={() => setView('FEED')}
          onJoinAuction={handleJoinAuction}
        />
      )}

      {/* View: LIVE ROOM */}
      {view === 'LIVE_ROOM' && selectedProperty && (
        <LiveRoom 
          property={selectedProperty}
          onClose={() => setView('FEED')}
          onFinish={handleFinishAuction}
        />
      )}

      {/* View: SIGNING (Post-Auction Logic) */}
      {view === 'SIGNING' && (
        <div className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center p-8 text-center animate-fade-in z-50">
           <div className="w-24 h-24 bg-green-900/20 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-glow shadow-green-500/20">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <h2 className="text-3xl font-black text-white mb-2">竞拍成功</h2>
           <p className="text-gray-400 mb-10 font-medium">即将进入电子签约室...</p>
           
           <div className="bg-gray-900 p-8 rounded-[2rem] border border-white/5 w-full mb-8 shadow-dribbble">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">成交确认价</div>
              <div className="text-5xl font-black text-brand-500 mb-8 tracking-tight">468万</div>
              
              <div className="space-y-4">
                  <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">房屋总价</span>
                      <span className="text-gray-200">¥4,680,000</span>
                  </div>
                   <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-500">保证金抵扣</span>
                      <span className="text-green-500">-¥50,000</span>
                  </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
                 <span className="text-xs text-gray-500 font-bold">签约倒计时</span>
                 <div className="bg-brand-900/30 text-brand-500 px-3 py-1 rounded-full text-sm font-bold tabular-nums">14:59</div>
              </div>
           </div>

           <button onClick={() => setView('FEED')} className="text-gray-500 text-sm font-semibold hover:text-white transition-colors">返回首页</button>
        </div>
      )}

    </div>
  );
};

export default App;