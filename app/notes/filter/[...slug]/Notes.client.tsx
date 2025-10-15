'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState, useCallback, useEffect } from 'react';
import { Note, CreateNoteData } from '@/types/note';
import NoteCard from '@/components/NoteCard/NoteCard';
import NoteForm from '@/components/NoteForm/NoteForm';
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

// Простий Modal компонент
function Modal({ children, isOpen }: {
  children: React.ReactNode;
  isOpen: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className={css.modalOverlay}>
      <div className={css.modal}>
        {children}
      </div>
    </div>
  );
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

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

  // Mutation для створення нотатки
  const createNoteMutation = useMutation({
    mutationFn: async (noteData: CreateNoteData) => {
      const response = await axios.post('/api/notes', noteData);
      return response.data;
    },
    onSuccess: () => {
      // Закриваємо модальне вікно
      setIsModalOpen(false);
      // Інвалідуємо запит нотаток для оновлення списку
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleNoteSubmit = useCallback((noteData: CreateNoteData) => {
    createNoteMutation.mutate(noteData);
  }, [createNoteMutation]);

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
        <button 
          className={css.createButton}
          onClick={handleOpenModal}
        >
          Create Note
        </button>
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

      <Modal isOpen={isModalOpen}>
        <div className={css.modalContent}>
          <div className={css.modalHeader}>
            <h2>Create New Note</h2>
            <button 
              className={css.closeButton}
              onClick={handleCloseModal}
            >
              ×
            </button>
          </div>
          <div className={css.modalBody}>
            <NoteForm
              onSubmit={handleNoteSubmit}
              isLoading={createNoteMutation.isPending}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}