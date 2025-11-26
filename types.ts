export interface Property {
  id: string;
  title: string;
  district: string;
  tags: string[];
  marketPrice: number; // In Wan (Ten Thousand)
  startingPrice: number; // In Wan
  currentPrice?: number; // Real-time price for live items
  currentBidCount?: number; // Number of bids
  area: number; // sq meters
  layout: string;
  image: string;
  images: string[];
  yearBuilt: string;
  floor: string;
  viewCount: number;
  depositAmount: number; // In Yuan
  status?: 'LIVE' | 'UPCOMING' | 'ENDED';
}

export interface Bid {
  id: string;
  userId: string;
  userName: string;
  amount: number; // In Wan
  timestamp: number;
  isMe?: boolean;
}

export type AppView = 'FEED' | 'DETAIL' | 'LIVE_ROOM' | 'SIGNING';

export interface AuctionState {
  status: 'UPCOMING' | 'LIVE' | 'ENDED';
  currentBid: number;
  participants: number;
  endTime: number;
}