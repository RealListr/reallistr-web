import { useEffect, useState } from "react";

export default function Editor() {
  const [status, setStatus] = useState("Booting…");
  useEffect(() => setStatus("React route is alive ✅"), []);
  return (
    <main style={{maxWidth:760,margin:"10vh auto",padding:24,borderRadius:16,background:"#14161a",color:"#f5f7fa"}}>
      <h1>RealListr Editor</h1>
      <p>{status}</p>
    </main>
  );
}
