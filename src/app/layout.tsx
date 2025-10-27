import './globals.css';

export const metadata = {
  title: 'RealListr',
  description: 'RealListr Platform',
};
{/* header title row ... */}
<div className="mt-3 h-px bg-neutral-200/80" />

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
