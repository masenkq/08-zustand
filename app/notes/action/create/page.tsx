import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata: Metadata = {
  title: "Create New Note - NoteHub",
  description: "Create a new note in NoteHub. Capture your thoughts, ideas, and important information with our easy-to-use note creation form.",
  openGraph: {
    title: "Create New Note - NoteHub",
    description: "Create a new note in NoteHub. Capture your thoughts, ideas, and important information with our easy-to-use note creation form.",
    url: "https://your-domain.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Create New Note",
      },
    ],
  },
};

// Server Action для створення нотатки
async function createNote(formData: FormData) {
  'use server';
  
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const tag = formData.get('tag') as string;

  // Тут ваша логіка створення нотатки на сервері
  try {
    // Приклад використання API
    // const response = await fetch('/api/notes', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ title, content, tag }),
    // });
    
    // if (!response.ok) {
    //   throw new Error('Failed to create note');
    // }
    
    console.log('Creating note:', { title, content, tag });
    
    // Після успішного створення перенаправляємо
    redirect('/notes');
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
}

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm formAction={createNote} />
      </div>
    </main>
  );
}