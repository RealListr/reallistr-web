'use client';

import { useState } from 'react';
import type { Short, Pod, AgentLite } from '@/types/media';

import HeroHeader from '@/components/v2/hero/HeroHeader';
import MediaActionBar from '@/components/v2/hero/MediaActionBar';
import SlideDrawer from '@/components/v2/drawers/SlideDrawer';
import ShortsRail from '@/components/v2/media/ShortsRail';
import PodsRail from '@/components/v2/media/PodsRail';
import AgentCluster from '@/components/v2/agents/AgentCluster';
import PropertyFacts from '@/components/v2/PropertyFacts';

export default function DetailClient(props: {
  hero: string;
  address: string;
  suburb?: string;
  priceLabel?: string;
  status?: 'SALE' | 'RENTAL';
  shorts: Short[];
  pods: Pod[];
  description: string;
  facts: { label: string; value: string; icon?: any }[];
  agents: AgentLite[];
}) {
  const [openInfo, setOpenInfo] = useState(false);
  const [openFacts, setOpenFacts] = useState(false);

  return (
    <main className="pb-24">
      <HeroHeader
        image={props.hero}
        address={props.address}
        suburb={props.suburb}
        priceLabel={props.priceLabel}
        status={props.status}
      >
        <MediaActionBar
          items={[
            {
              key: 'images',
              label: 'Images',
              onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
            },
            {
              key: 'shorts',
              label: 'Shorts',
              onClick: () =>
                document.getElementById('shorts')?.scrollIntoView({ behavior: 'smooth' }),
            },
            {
              key: 'pods',
              label: 'Pods',
              onClick: () =>
                document.getElementById('pods')?.scrollIntoView({ behavior: 'smooth' }),
            },
            { key: 'info', label: 'Info', onClick: () => setOpenInfo(true) },
            { key: 'facts', label: 'Facts', onClick: () => setOpenFacts(true) },
          ]}
        />
      </HeroHeader>

      <section id="shorts" className="mx-auto max-w-6xl p-6">
        <ShortsRail items={props.shorts} />
      </section>

      <section id="pods" className="mx-auto max-w-6xl p-6">
        <PodsRail items={props.pods} />
      </section>

      <SlideDrawer title="Property Information" open={openInfo} onClose={() => setOpenInfo(false)}>
        <div className="space-y-2 text-sm">
          <div className="font-medium">{props.address}</div>
          {props.suburb && <div className="text-gray-600">{props.suburb}</div>}
          <p className="pt-2 text-gray-700">{props.description}</p>
        </div>
      </SlideDrawer>

      <SlideDrawer title="Property Facts" open={openFacts} onClose={() => setOpenFacts(false)}>
        <PropertyFacts facts={props.facts} />
      </SlideDrawer>

      <div className="mx-auto max-w-6xl p-6">
        <AgentCluster agents={props.agents} />
      </div>
    </main>
  );
}
