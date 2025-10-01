import Image from 'next/image';

type Props = {
  image: string;
  address: string;
  suburb?: string;
  priceLabel?: string;
  status?: 'SALE'|'RENTAL';
  children?: React.ReactNode; // action bar goes here
};
export default function HeroHeader({ image, address, suburb, priceLabel, status, children }: Props) {
  return (
    <section className="w-full">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-none md:rounded-2xl">
        <Image src={image} alt={address} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        <div className="absolute left-6 bottom-6 text-white">
          <div className="text-xl font-semibold">{address}</div>
          <div className="text-sm opacity-90">{suburb}</div>
          {priceLabel && <div className="mt-1 inline-flex rounded-full bg-black/60 px-3 py-1 text-xs">{priceLabel}</div>}
        </div>
        {status && (
          <div className="absolute left-6 top-6">
            <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium">{status}</span>
          </div>
        )}
      </div>
      {/* inline action bar slot */}
      <div className="mx-auto -mt-6 flex w-full max-w-6xl justify-center">
        <div className="flex gap-4 rounded-full bg-white px-4 py-2 shadow-md">{children}</div>
      </div>
    </section>
  );
}
