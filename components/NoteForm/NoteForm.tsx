'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNoteStore } from '@/lib/store/noteStore';
import { CreateNoteData } from '@/types/note';

const availableTags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [isPending, setIsPending] = useState(false);

  // Mutation для створення нотатки з TanStack Query
  const createNoteMutation = useMutation({
    mutationFn: async (noteData: CreateNoteData) => {
      const response = await axios.post('/api/notes', noteData);
      return response.data;
    },
    onSuccess: () => {
      // Інвалідуємо запити нотаток для оновлення списку
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      // Очищаємо чернетку
      clearDraft();
      // Повертаємося на попередню сторінку
      router.back();
    },
    onError: (error) => {
      console.error('Error creating note:', error);
    },
  });

  // Обробник зміни полів форми
  const handleInputChange = (field: keyof typeof draft, value: string) => {
    setDraft({ [field]: value });
  };

  // Обробник сабміту форми
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);
      const noteData: CreateNoteData = {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        tags: [formData.get('tag') as string],
      };

      // Викликаємо мутацію
      await createNoteMutation.mutateAsync(noteData);
    } catch (error) {
      console.error('Error creating note:', error);
    } finally {
      setIsPending(false);
    }
  };

  // Обробник скасування
  const handleCancel = () => {
    // Чернетка НЕ очищається при скасуванні
    router.back();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={draft.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
          required
        />
      </div>
      
      <div>
        <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Content *
        </label>
        <textarea
          id="content"
          name="content"
          value={draft.content}
          onChange={(e) => handleInputChange('content', e.target.value)}
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '200px', fontSize: '1rem', resize: 'vertical' }}
          required
        />
      </div>

      <div>
        <label htmlFor="tag" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Tag *
        </label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={(e) => handleInputChange('tag', e.target.value)}
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
          required
        >
          {availableTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          type="submit" 
          disabled={isPending || createNoteMutation.isPending}
          style={{ 
            background: '#007acc', 
            color: 'white', 
            border: 'none', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '4px',
            cursor: (isPending || createNoteMutation.isPending) ? 'not-allowed' : 'pointer',
            opacity: (isPending || createNoteMutation.isPending) ? 0.6 : 1,
            fontSize: '1rem',
            flex: 1
          }}
        >
          {(isPending || createNoteMutation.isPending) ? 'Creating...' : 'Create Note'}
        </button>
        
        <button 
          type="button"
          onClick={handleCancel}
          disabled={isPending || createNoteMutation.isPending}
          style={{ 
            background: '#6c757d', 
            color: 'white', 
            border: 'none', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '4px',
            cursor: (isPending || createNoteMutation.isPending) ? 'not-allowed' : 'pointer',
            opacity: (isPending || createNoteMutation.isPending) ? 0.6 : 1,
            fontSize: '1rem',
            flex: 1
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}