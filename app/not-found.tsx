import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Page Not Found - NoteHub",
  description: "The page you are looking for doesn't exist or has been moved. Return to NoteHub to continue organizing your notes.",
  openGraph: {
    title: "Page Not Found - NoteHub",
    description: "The page you are looking for doesn't exist or has been moved. Return to NoteHub to continue organizing your notes.",
    url: "https://your-domain.com/404", // Nahraďte skutečnou doménou
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Page Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
        Sorry, we couldn't find the page you're looking for.
      </p>
      <a 
        href="/"
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#007acc',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}
      >
        Return to Home
      </a>
    </div>
  );
}