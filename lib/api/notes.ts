import axios from 'axios';
import { Note, CreateNoteData, UpdateNoteData } from '@/types/note';

export const getNotes = async (tag?: string): Promise<Note[]> => {
  const params = tag ? { tag } : {};
  const response = await axios.get('/api/notes', { params });
  return response.data;
};

export const getNote = async (id: string): Promise<Note> => {
  const response = await axios.get(`/api/notes/${id}`);
  return response.data;
};

export const createNote = async (data: CreateNoteData): Promise<Note> => {
  const response = await axios.post('/api/notes', data);
  return response.data;
};

export const updateNote = async (id: string, data: UpdateNoteData): Promise<Note> => {
  const response = await axios.put(`/api/notes/${id}`, data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`/api/notes/${id}`);
};