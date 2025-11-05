import { MAPBOX_TOKEN } from '../config.js';

export async function geocodeAddress(addr){
  if(!addr || !MAPBOX_TOKEN) return null;
  try{
    const q = encodeURIComponent(addr);
    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?access_token=${MAPBOX_TOKEN}`);
    const j = await res.json();
    const f = j?.features?.[0];
    if(!f) return null;
    const [lng, lat] = f.center || [];
    return (isFinite(lat) && isFinite(lng)) ? {lat, lng} : null;
  }catch(e){ return null; }
}

export function initCompactMap(containerId, lat, lng){
  if(!window.mapboxgl || !MAPBOX_TOKEN) return null;
  mapboxgl.accessToken = MAPBOX_TOKEN;
  const map = new mapboxgl.Map({
    container: containerId,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng ?? 144.9631, lat ?? -37.8136],
    zoom: 11
  });
  const marker = new mapboxgl.Marker({draggable:true}).setLngLat([lng ?? 144.9631, lat ?? -37.8136]).addTo(map);
  return { map, marker };
}
