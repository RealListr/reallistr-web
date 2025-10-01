import { IcBed, IcBath, IcCar, IcSize } from '@/components/icons/rl-icons';

type Fact = { label: string; value: string; icon?: 'bed'|'bath'|'car'|'size' };
export default function PropertyFacts({ facts }: { facts: Fact[] }) {
  const renderIcon = (k?: Fact['icon']) => {
    const c = 'h-4 w-4';
    switch(k){
      case 'bed': return <IcBed className={c} />;
      case 'bath': return <IcBath className={c} />;
      case 'car': return <IcCar className={c} />;
      case 'size': return <IcSize className={c} />;
      default: return null;
    }
  };
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {facts.map((f,i)=>(
        <div key={i} className="flex items-center gap-3 rounded-xl border p-3 text-sm">
          <span className="text-gray-600">{renderIcon(f.icon)}</span>
          <span className="font-medium">{f.value}</span>
          <span className="ml-auto text-xs text-gray-500">{f.label}</span>
        </div>
      ))}
    </div>
  );
}
