import Providers from "./providers";
import Header from "@/components/Header/Header";
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