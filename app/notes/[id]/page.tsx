import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/getQueryClient';
import { api } from '@/lib/api';
import NoteDetailsClient from "./NoteDetails.client";
import type { Metadata } from 'next';
import type { Note } from '@/types/note';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    // API vrací přímo Note objekt, ne { data: { note: Note } }
    const response = await api.notes.getById(id);
    const note = response.data; // Přímo response.data je Note

    if (!note) {
      return {
        title: "Note Not Found - NoteHub",
        description: "The requested note was not found or may have been deleted.",
      };
    }

    const truncatedContent = note.content.length > 160 
      ? `${note.content.substring(0, 160)}...` 
      : note.content;

    return {
      title: `${note.title} - NoteHub`,
      description: truncatedContent,
      openGraph: {
        title: `${note.title} - NoteHub`,
        description: truncatedContent,
        url: `https://your-domain.com/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: `NoteHub - ${note.title}`,
          },
        ],
      },
    };
  } catch (error) {
    return {
      title: "Note Details - NoteHub",
      description: "View your note details on NoteHub.",
      openGraph: {
        title: "Note Details - NoteHub",
        description: "View your note details on NoteHub.",
        url: `https://your-domain.com/notes/${id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
            width: 1200,
            height: 630,
            alt: "NoteHub - Note Details",
          },
        ],
      },
    };
  }
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;
  
  const queryClient = getQueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ['note', id],
      queryFn: async (): Promise<Note> => {
        const response = await api.notes.getById(id);
        return response.data; // Přímo response.data je Note
      },
    });
  } catch (error) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient noteId={id} />
    </HydrationBoundary>
  );
}