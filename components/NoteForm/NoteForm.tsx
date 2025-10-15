'use client';

import { useState } from 'react';
import { CreateNoteData } from '@/types/note';

interface NoteFormProps {
  onSubmit: (data: CreateNoteData) => void;
  isLoading?: boolean;
}

export default function NoteForm({ onSubmit, isLoading = false }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
          required
        />
      </div>
      
      <div>
        <label htmlFor="content" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', minHeight: '150px' }}
          required
        />
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading}
        style={{ 
          background: '#007acc', 
          color: 'white', 
          border: 'none', 
          padding: '0.75rem 1.5rem', 
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.6 : 1
        }}
      >
        {isLoading ? 'Creating...' : 'Create Note'}
      </button>
    </form>
  );
}