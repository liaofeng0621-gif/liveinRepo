import React, { useState } from 'react';
import { Property, AppView } from './types';
import AuctionFeedCard from './components/AuctionFeedCard';
import ListingDetail from './components/ListingDetail';
import LiveRoom from './components/LiveRoom';

// Mock Data matching the PDF story
const MOCK_PROPERTY: Property = {
  id: 'p1',
  title: '朝阳公园·泛海国际 观山苑',
  district: '北京·朝阳公园',
  tags: ['CBD核心', '全维验真', '急售资产'],
  marketPrice: 500,
  startingPrice: 450,
  currentPrice: 468, // Simulated current price
  currentBidCount: 32, // Simulated bid intensity
  area: 168,
  layout: '3室2厅',
  // High quality luxury interior
  image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
  images: [
      // Living room
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      // Exterior / View
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      // Bedroom/Detail
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
    // In real app, check deposit status here.
    // For demo, we assume deposit is paid and go to live room.
    setView('LIVE_ROOM');
  };

  const handleFinishAuction = () => {
    setView('SIGNING');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-brand-500 selection:text-white">
      
      {/* View: FEED */}
      {view === 'FEED' && (
        <div className="pb-20">
          <header className="px-5 py-4 flex justify-between items-end sticky top-0 bg-black/90 backdrop-blur z-40 border-b border-white/5">
            <div className="flex flex-col">
                 <div className="text-2xl font-black tracking-tighter text-white leading-none">LiveIn<span className="text-brand-500">.</span></div>
                 <div className="text-[10px] text-gray-400 font-medium tracking-widest mt-1">发现美好居住生活</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-800 border border-white/10 overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=User&background=333&color=fff" alt="User" />
            </div>
          </header>
          
          <div className="px-5 my-8">
             <div className="inline-block px-2 py-0.5 rounded bg-brand-500/20 text-brand-500 text-xs font-bold mb-2 border border-brand-500/30">
                Live Event
             </div>
             <h1 className="text-4xl font-black mb-2 leading-none tracking-tight">周末竞拍夜</h1>
             <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                全城严选资产 · 真实房源 · 透明竞价
             </p>
          </div>

          <div className="px-5 space-y-8">
            <AuctionFeedCard 
              property={MOCK_PROPERTY} 
              onClick={() => handlePropertyClick(MOCK_PROPERTY)} 
            />
            {/* Duplicate for UI fullness with different content */}
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

      {/* View: SIGNING (Post-Auction Logic from PDF) */}
      {view === 'SIGNING' && (
        <div className="fixed inset-0 bg-dark-900 flex flex-col items-center justify-center p-8 text-center animate-fade-in z-50">
           <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           </div>
           <h2 className="text-2xl font-bold mb-2">竞拍成功</h2>
           <p className="text-gray-400 mb-8">即将进入电子签约室...</p>
           
           <div className="bg-dark-800 p-6 rounded-2xl border border-white/5 w-full mb-6 shadow-xl">
              <div className="text-sm text-gray-400 mb-1">成交确认价</div>
              <div className="text-4xl font-black text-brand-500 mb-4">468万</div>
              
              <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                      <span className="text-gray-400">房屋总价</span>
                      <span>¥4,680,000</span>
                  </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-gray-400">保证金抵扣</span>
                      <span className="text-green-500">-¥50,000</span>
                  </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-500 flex justify-between">
                 <span>签约倒计时</span>
                 <span className="text-brand-500 font-bold">14:59</span>
              </div>
           </div>

           <button onClick={() => setView('FEED')} className="text-gray-500 text-sm hover:text-white transition">返回首页</button>
        </div>
      )}

    </div>
  );
};

export default App;