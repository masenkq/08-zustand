import axios from 'axios';
import { Note, CreateNoteData, UpdateNoteData } from '@/types/note';

//const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...(API_TOKEN && { 'Authorization': `Bearer ${API_TOKEN}` })
  },
});

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const api = {
  notes: {
    getAll: (tag?: string, search?: string, page?: number, limit?: number) => 
      apiClient.get<NotesResponse>(`/notes`, { 
        params: { tag, search, page, limit } 
      }),
    
    getById: (id: string) => 
      apiClient.get<Note>(`/notes/${id}`),
    
    create: (data: CreateNoteData) => 
      apiClient.post<Note>(`/notes`, data),
    
    update: (id: string, data: UpdateNoteData) => 
      apiClient.patch<Note>(`/notes/${id}`, data),
    
    delete: (id: string) => 
      apiClient.delete<Note>(`/notes/${id}`),
  },
};