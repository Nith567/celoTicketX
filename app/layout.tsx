import '@/styles/globals.css';

import { AppProvider } from '@/providers/AppProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-green-300 via-green-400 to-green-600">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
