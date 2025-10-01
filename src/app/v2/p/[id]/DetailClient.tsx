'use client';

import { useState, type ReactNode } from 'react';
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
  facts: { label: string; value: string; icon?: ReactNode }[];
  agents: AgentLite[];
}) {
  const [openInfo, setOpenInfo] = useState(false);

  return (
    <>
      <HeroHeader
        image={props.hero}
        address={props.address}
        suburb={props.suburb}
        priceLabel={props.priceLabel}
        status={props.status}
      />

      <MediaActionBar
        onInfo={() => setOpenInfo(true)}
        shortsCount={props.shorts?.length ?? 0}
        podsCount={props.pods?.length ?? 0}
      />

      <ShortsRail items={props.shorts} className="mt-6" />
      <PodsRail items={props.pods} className="mt-8" />

      <AgentCluster items={props.agents} className="mt-10" />

      <SlideDrawer open={openInfo} onOpenChange={setOpenInfo} title="Property Information">
        <div className="space-y-6">
          <PropertyFacts facts={props.facts} />
          <div>
            <h3 className="text-sm font-medium mb-2">Description</h3>
            <p className="text-sm text-muted-foreground leading-6">{props.description}</p>
          </div>
        </div>
      </SlideDrawer>
    </>
  );
}
