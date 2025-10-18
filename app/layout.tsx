import { Roboto } from 'next/font/google';
import { Metadata } from 'next';
import Providers from "./providers";
import Header from "@/components/Header/Header";
import "./globals.css";

// Налаштування шрифту Roboto
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-roboto',
  fallback: ['system-ui', 'arial'],
});

// Явна типізація з Metadata з next
export const metadata: Metadata = {
  title: {
    default: "NoteHub - Your Personal Notes App",
    template: "%s | NoteHub"
  },
  description: "Capture, organize, and access your notes anytime, anywhere with NoteHub - the ultimate note-taking solution.",
  keywords: ["notes", "productivity", "organization", "personal notes", "note-taking"],
  authors: [{ name: "NoteHub Team" }],
  creator: "NoteHub",
  publisher: "NoteHub",
  metadataBase: new URL('https://your-domain.com'),
  openGraph: {
    title: "NoteHub - Your Personal Notes App",
    description: "Capture, organize, and access your notes anytime, anywhere with NoteHub.",
    url: "https://your-domain.com",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Personal Note Taking App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NoteHub - Your Personal Notes App",
    description: "Capture, organize, and access your notes anytime, anywhere.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
}

export default function RootLayout({
  children,
  modal,
}: RootLayoutProps) {
  return (
    <html lang="en" className={roboto.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={roboto.className}>
        <Providers>
          <Header />
          <main>
            {children}
          </main>
          <footer style={{
            padding: "2rem",
            textAlign: "center",
            borderTop: "1px solid #eee",
            marginTop: "auto"
          }}>
            <p>© 2024 NoteHub. All rights reserved.</p>
          </footer>
          {modal}
        </Providers>
      </body>
    </html>
  );
}