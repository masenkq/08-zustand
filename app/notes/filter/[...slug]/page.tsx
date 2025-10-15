import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/getQueryClient';
import { api } from '@/lib/api';
import NotesClient from './Notes.client';
import type { Note } from '@/types/note';

interface PageProps {
  params: Promise<{ slug: string[] }>;
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
      const response = await api.notes.getAll(apiTag);
      return response.data.notes; // Повертаємо тільки масив нотаток
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={apiTag} />
    </HydrationBoundary>
  );
}