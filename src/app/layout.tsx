export const runtime = 'edge';

import './globals.css';

export const metadata = {
  title: 'RealListr',
  description: 'RealListr Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
