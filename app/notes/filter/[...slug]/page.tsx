import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/getQueryClient';
import { api } from '@/lib/api';
import NotesClient from './Notes.client';
import type { Note } from '@/types/note';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

// Interface pro API response strukturu
interface NotesApiResponse {
  data: {
    notes: Note[];
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug?.[0] || 'All';
  
  const validTags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
  if (tag !== 'All' && !validTags.includes(tag)) {
    return {
      title: "Page Not Found - NoteHub",
      description: "The requested filter page was not found.",
    };
  }

  const displayTag = tag === 'All' ? 'All Notes' : `${tag} Notes`;
  
  return {
    title: `${displayTag} - NoteHub`,
    description: `Browse and manage your ${displayTag.toLowerCase()} in NoteHub. Organize your thoughts and ideas with ease.`,
    openGraph: {
      title: `${displayTag} - NoteHub`,
      description: `Browse and manage your ${displayTag.toLowerCase()} in NoteHub. Organize your thoughts and ideas with ease.`,
      url: `https://your-domain.com/notes/filter/${tag.toLowerCase()}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `NoteHub - ${displayTag}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: PageProps) {
  const { slug } = await params;
  const tag = slug?.[0] || 'All';
  
  const validTags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
  if (tag !== 'All' && !validTags.includes(tag)) {
    notFound();
  }

  const queryClient = getQueryClient();
  const apiTag = tag === 'All' ? undefined : tag;

  await queryClient.prefetchQuery({
    queryKey: ['notes', apiTag],
    queryFn: async (): Promise<Note[]> => {
      const response = await api.notes.getAll(apiTag) as NotesApiResponse;
      return response.data.notes; // Vracíme pole notes z response.data
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={apiTag} />
    </HydrationBoundary>
  );
}