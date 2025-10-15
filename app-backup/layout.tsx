import Providers from "./providers";
import "./globals.css";

export const metadata = {
  title: "NoteHub",
  description: "Your personal note taking app",
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
    <html lang="en">
      <body>
        <Providers>
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}
