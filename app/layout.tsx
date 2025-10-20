export const metadata = { title: "RealListr" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin:0, fontFamily:"system-ui", background:"#0b0b0b", color:"#fff" }}>
        <nav style={{ padding:"10px 14px", background:"#111", borderBottom:"1px solid #222" }}>
          <a href="/" style={{ color:"#fff", marginRight:12 }}>Home</a>
          <a href="/checkout" style={{ color:"#fff" }}>Checkout</a>
        </nav>
        <div style={{ padding: 16 }}>{children}</div>
      </body>
    </html>
  );
}
