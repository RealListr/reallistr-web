export const metadata = { title: "RealListr — Fresh App" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#000", color: "#fff" }}>
        {children}
      </body>
    </html>
  );
}
