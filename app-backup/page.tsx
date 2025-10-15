import Link from 'next/link';

export default function HomePage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to NoteHub</h1>
      <p>Your personal note taking application</p>
      <div style={{ marginTop: '2rem' }}>
        <Link href="/notes/filter/All" style={{ marginRight: '1rem' }}>
          View All Notes
        </Link>
        <Link href="/notes/create">
          Create New Note
        </Link>
      </div>
    </div>
  );
}