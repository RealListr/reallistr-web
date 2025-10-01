import { PROPERTIES } from '@/data/properties';
import HeroHeader from '@/components/v2/hero/HeroHeader';
import MediaActionBar from '@/components/v2/hero/MediaActionBar';
import SlideDrawer from '@/components/v2/drawers/SlideDrawer';
import ShortsRail from '@/components/v2/media/ShortsRail';
import PodsRail from '@/components/v2/media/PodsRail';
import AgentCluster from '@/components/v2/agents/AgentCluster';
import PropertyFacts from '@/components/v2/PropertyFacts';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = PROPERTIES.find(p => String(p.id) === String(id));
  if (!item) return <main className="p-8">Not found.</main>;

  // basic facts mapping for the drawer
  const facts = [
    { label: 'Bedrooms', value: String(item.beds), icon: 'bed' as const },
    { label: 'Bathrooms', value: String(item.baths), icon: 'bath' as const },
    { label: 'Parking', value: String(item.cars), icon: 'car' as const },
    ...(item.landSize ? [{ label: 'Land', value: `${item.landSize} m²`, icon: 'size' as const }] : []),
  ];

  return (
    <DetailClient
      hero={item.images?.[0] ?? '/placeholder.svg'}
      address={item.title}
      suburb={item.suburb}
      priceLabel={item.type === 'rental' ? `$${(item.price ?? 0).toLocaleString()}/wk` : `$${(item.price ?? 0).toLocaleString()}`}
      status={item.type === 'rental' ? 'RENTAL' : 'SALE'}
      shorts={item.shorts ?? []}
      pods={item.pods ?? []}
      description={item.description ?? '—'}
      facts={facts}
      agents={item.agents ?? []}
    />
  );
}

// Client wrapper manages drawers & actions
'use client';
import { useState } from 'react';
import type { Short, Pod, AgentLite } from '@/types/media';

function DetailClient(props: {
  hero: string; address: string; suburb?: string; priceLabel?: string; status?: 'SALE'|'RENTAL';
  shorts: Short[]; pods: Pod[]; description: string; facts: {label:string;value:string;icon?:any}[];
  agents: AgentLite[];
}) {
  const [openInfo, setOpenInfo] = useState(false);
  const [openFacts, setOpenFacts] = useState(false);

  return (
    <main className="pb-24">
      <HeroHeader image={props.hero} address={props.address} suburb={props.suburb} priceLabel={props.priceLabel} status={props.status}>
        <MediaActionBar items={[
          { key: 'images', label: 'Images', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
          { key: 'shorts', label: 'Shorts', onClick: () => document.getElementById('shorts')?.scrollIntoView({ behavior:'smooth' }) },
          { key: 'pods', label: 'Pods', onClick: () => document.getElementById('pods')?.scrollIntoView({ behavior:'smooth' }) },
          { key: 'info', label: 'Info', onClick: () => setOpenInfo(true) },
          { key: 'facts', label: 'Facts', onClick: () => setOpenFacts(true) },
        ]}/>
      </HeroHeader>

      {/* media rails */}
      <div id="shorts"><ShortsRail items={props.shorts} /></div>
      <div id="pods"><PodsRail items={props.pods} /></div>

      {/* drawers */}
      <SlideDrawer title="Property Information" open={openInfo} onClose={()=>setOpenInfo(false)}>
        <div className="space-y-3 text-sm">
          <div className="font-medium">{props.address}</div>
          <div className="text-gray-600">{props.suburb}</div>
          <p className="pt-2 text-gray-700">{props.description}</p>
        </div>
      </SlideDrawer>

      <SlideDrawer title="Property Facts" open={openFacts} onClose={()=>setOpenFacts(false)}>
        <PropertyFacts facts={props.facts} />
      </SlideDrawer>

      {/* agents cluster */}
      <AgentCluster agents={props.agents} />
    </main>
  );
}
