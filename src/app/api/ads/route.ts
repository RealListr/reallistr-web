import { NextResponse } from 'next/server';
const ads = [
  { id:'ad1', imageUrl:'/ads/house-list-with-reallistr.jpg', clickUrl:'/agents', label:'Sponsored', advertiser:'RealListr' },
  { id:'ad2', imageUrl:'/ads/house-boost-with-shorts.jpg',  clickUrl:'/shorts', label:'Sponsored', advertiser:'RealListr' },
  { id:'ad3', imageUrl:'/ads/house-join-agency.jpg',        clickUrl:'/join',   label:'Sponsored', advertiser:'RealListr' },
];
export async function GET(){ return NextResponse.json(ads); }
