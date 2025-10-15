import { notFound } from 'next/navigation';
import NotesClient from './Notes.client';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug?.[0] || 'All';
  
  // Валідація тегу
  const validTags = ['All', 'Work', 'Personal', 'Ideas', 'Important'];
  if (tag !== 'All' && !validTags.includes(tag)) {
    notFound();
  }

  return <NotesClient tag={tag === 'All' ? undefined : tag} />;
}