import AppShell from '@/components/shell/AppShell';
import Image from 'next/image';
import MapPreview from '@/components/map/MapPreview';

export default function PropertyDetailPage() {
  return (
    <AppShell>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
            <Image src="https://picsum.photos/seed/primary/1600/1000" alt="" fill className="object-cover" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[1,2,3].map((i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <Image src={`https://picsum.photos/seed/thumb${i}/800/600`} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold">23 Ocean Ave, Bondi</h1>
          <div className="text-xl font-medium">$2,450,000</div>
          <p className="text-neutral-700">Sunlit coastal home with open-plan living, minutes to the beach.</p>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>4 beds</div><div>3 baths</div><div>2 cars</div>
          </div>
          <button className="w-full h-11 rounded-full bg-black text-white">Request Info</button>
          <MapPreview lat={-33.8915} lng={151.2767} />
        </div>
      </div>
    </AppShell>
  );
}
