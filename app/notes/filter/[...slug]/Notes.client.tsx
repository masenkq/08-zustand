'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Note } from '@/types/note';
import NoteCard from '@/components/NoteCard/NoteCard';
import css from './Notes.module.css';

interface NotesClientProps {
  tag?: string;
}

// Простий SearchBox компонент
function SearchBox({ value, onChange, placeholder }: { 
  value: string; 
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div className={css.searchBox}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={css.searchInput}
      />
    </div>
  );
}

// Простий Pagination компонент
function Pagination({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className={css.paginationContainer}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={css.paginationButton}
      >
        Previous
      </button>
      
      <span className={css.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={css.paginationButton}
      >
        Next
      </button>
    </div>
  );
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  // Debounce для пошуку
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1); // Скидаємо на першу сторінку при новому пошуку
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data: notesData, isLoading, error } = useQuery({
    queryKey: ['notes', tag, debouncedSearchQuery, page],
    queryFn: async (): Promise<{ notes: Note[]; totalPages: number }> => {
      const params: any = {};
      if (tag) params.tag = tag;
      if (debouncedSearchQuery) params.search = debouncedSearchQuery;
      if (page) params.page = page;
      
      const response = await axios.get('/api/notes', { params });
      return response.data;
    },
    refetchOnMount: true,
  });

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  if (isLoading) return <div className={css.loading}>Loading...</div>;
  if (error) return <div className={css.error}>Error loading notes</div>;

  const notes = notesData?.notes || [];
  const totalPages = notesData?.totalPages || 0;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>
          {tag ? `Notes: ${tag}` : 'All Notes'}
        </h1>
        <Link 
          href="/notes/action/create"
          className={css.createButton}
        >
          Create note +
        </Link>
      </div>

      <div className={css.controls}>
        <SearchBox
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search notes..."
        />
      </div>

      <div className={css.notesGrid}>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>

      {notes.length === 0 && (
        <p className={css.empty}>
          {debouncedSearchQuery ? 'No notes found for your search' : 'No notes found'}
        </p>
      )}

      {totalPages > 1 && (
        <div className={css.pagination}>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}