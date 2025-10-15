'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNoteStore } from '@/lib/store/noteStore';

interface NoteFormProps {
  formAction: (formData: FormData) => Promise<void>;
}

const availableTags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm({ formAction }: NoteFormProps) {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const [isPending, setIsPending] = useState(false);

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
      await formAction(formData);
      // Після успішного сабміту очищаємо чернетку
      clearDraft();
      router.back(); // Повертаємося на попередню сторінку
    } catch (error) {
      console.error('Error creating note:', error);
    } finally {
      setIsPending(false);
    }
  };

  // Обробник скасування
  const handleCancel = () => {
    // Чернетка НЕ очищається при скасуванні
    router.back(); // Повертаємося на попередню сторінку
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Title
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
          Content
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
          Tag
        </label>
        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={(e) => handleInputChange('tag', e.target.value)}
          style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
        >
          {availableTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          type="submit" 
          disabled={isPending}
          style={{ 
            background: '#007acc', 
            color: 'white', 
            border: 'none', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '4px',
            cursor: isPending ? 'not-allowed' : 'pointer',
            opacity: isPending ? 0.6 : 1,
            fontSize: '1rem',
            flex: 1
          }}
        >
          {isPending ? 'Creating...' : 'Create Note'}
        </button>
        
        <button 
          type="button"
          onClick={handleCancel}
          style={{ 
            background: '#6c757d', 
            color: 'white', 
            border: 'none', 
            padding: '0.75rem 1.5rem', 
            borderRadius: '4px',
            cursor: 'pointer',
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