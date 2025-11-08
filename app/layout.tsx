// app/layout.tsx
export const metadata = {
  title: "RealListr · Connection Centre",
  description: "Campaign language test bench",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto" }}>
        {children}
      </body>
    </html>
  );
}
