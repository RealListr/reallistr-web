// src/app/page.tsx
import dynamic from "next/dynamic";
const PropertyMap = dynamic(() => import("@/components/maps/PropertyMap"), { ssr: false });
// If you want the uploader:
// const PropertyUpload = dynamic(() => import("@/properties/PropertyUpload"), { ssr: false });

export default function Page() {
  return (
    <main style={{ padding: 16, background:"#000", color:"#fff", minHeight:"100vh" }}>
      <h1 style={{ margin:"12px 0 16px", fontSize: 20 }}>RealListr — Map</h1>
      <PropertyMap lat={25.074282} lng={55.145424} />
      <p style={{marginTop:12}}>
        Canary: <a href="/map-lite" style={{color:"#0bf"}}>/map-lite</a>
      </p>
      {/* <PropertyUpload /> */}
    </main>
  );
}
