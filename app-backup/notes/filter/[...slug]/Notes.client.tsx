'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Note } from '@/types/note';
import NoteCard from '@/components/NoteCard/NoteCard';
import css from './Notes.module.css';

interface NotesClientProps {
  tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const { data: notes, isLoading, error } = useQuery({
    queryKey: ['notes', tag],
    queryFn: async (): Promise<Note[]> => {
      const params = tag ? { tag } : {};
      const response = await axios.get('/api/notes', { params });
      return response.data;
    },
  });

  if (isLoading) return <div className={css.loading}>Loading...</div>;
  if (error) return <div className={css.error}>Error loading notes</div>;

  return (
    <div className={css.container}>
      <h1 className={css.title}>
        {tag ? `Notes: ${tag}` : 'All Notes'}
      </h1>
      <div className={css.notesGrid}>
        {notes?.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
      {notes?.length === 0 && (
        <p className={css.empty}>No notes found</p>
      )}
    </div>
  );
}