'use client';

import Link from 'next/link';
import { Note } from '@/types/note';
import css from './NoteCard.module.css';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  const formattedDate = new Date(note.createdAt).toLocaleDateString();

  return (
    <Link href={`/notes/${note.id}`} className={css.card}>
      <h3 className={css.title}>{note.title}</h3>
      <p className={css.content}>{note.content}</p>
      {note.tags && note.tags.length > 0 && (
        <div className={css.tags}>
          {note.tags.map((tag) => (
            <span key={tag} className={css.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className={css.footer}>
        <span className={css.date}>{formattedDate}</span>
      </div>
    </Link>
  );
}