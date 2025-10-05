import data from "@/data/listing.json";
export type Agent = { id:string; name:string; role:string; phone?:string };
export type Media = { type:"image"|"video"|"audio"; src:string; label?:string };
export type Listing = {
  id:string; price:string; addressLine:string;
  bed:number; bath:number; car:number;
  open1?:string; open2?:string;
  agents: Agent[]; media: Media[];
};
export function useListing(): Listing { return data as unknown as Listing; }
