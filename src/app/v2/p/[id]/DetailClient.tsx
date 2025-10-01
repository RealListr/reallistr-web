'use client';
import { useState } from 'react';
import HeroHeader from '@/components/v2/hero/HeroHeader';
import ActionFabStack from '@/components/v2/hero/ActionFabStack';
import SlideDrawer from '@/components/v2/drawers/SlideDrawer';
import ShortsRail from '@/components/v2/media/ShortsRail';
import PodsRail from '@/components/v2/media/PodsRail';
import AgentCluster from '@/components/v2/agents/AgentCluster';
import PropertyFacts, { type Fact } from '@/components/v2/PropertyFacts';
import MapPreview from '@/components/v2/map/MapPreview';
import MapDrawer from '@/components/v2/map/MapDrawer';
import type { Short, Pod, AgentLite } from '@/types/media';

export default function DetailClient(props: {
  hero: string;
  address: string;
  suburb?: string;
  priceLabel?: string;
  status?: 'SALE' | 'RENTAL';
  description: string;
  facts: Fact[];
  shorts: Short[];
  pods: Pod[];
  agents: AgentLite[];
  lat?: number;
  lng?: number;
}) {
  const [openInfo, setOpenInfo] = useState(false);
  const [openShorts, setOpenShorts] = useState(false);
  const [openPods, setOpenPods] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  return (
    <>
      <div className="relative">
        <HeroHeader
          hero={props.hero}
          address={props.address}
          suburb={props.suburb}
          priceLabel={props.priceLabel}
          status={props.status}
        >
          <AgentCluster items={props.agents ?? []} className="pointer-events-auto" />
        </HeroHeader>

        <ActionFabStack
          onInfo={() => setOpenInfo(true)}
          onShorts={() => setOpenShorts(true)}
          onPods={() => setOpenPods(true)}
          onMap={() => setOpenMap(true)}
          shortsCount={props.shorts?.length ?? 0}
          podsCount={props.pods?.length ?? 0}
        />
      </div>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="rounded-xl border p-4">
            <PropertyFacts facts={props.facts} />
          </div>
        </div>
        <div className="space-y-3">
          <button className="h-11 w-full rounded-xl bg-black text-white">Request Info</button>
          {props.lat && props.lng && <MapPreview lat={props.lat} lng={props.lng} height={180} />}
        </div>
      </section>

      <SlideDrawer open={openInfo} onOpenChange={setOpenInfo} title="Property Information">
        <div className="space-y-6">
          <PropertyFacts facts={props.facts} />
          <div>
            <h3 className="mb-2 text-sm font-medium">Description</h3>
            <p className="text-sm leading-6 text-muted-foreground">{props.description}</p>
          </div>
        </div>
      </SlideDrawer>

      <SlideDrawer open={openShorts} onOpenChange={setOpenShorts} title="ListrShorts">
        <ShortsRail items={props.shorts ?? []} />
      </SlideDrawer>

      <SlideDrawer open={openPods} onOpenChange={setOpenPods} title="ListrPods">
        <PodsRail items={props.pods ?? []} />
      </SlideDrawer>

      {props.lat && props.lng && (
        <MapDrawer open={openMap} onOpenChange={setOpenMap} lat={props.lat} lng={props.lng} />
      )}
    </>
  );
}
