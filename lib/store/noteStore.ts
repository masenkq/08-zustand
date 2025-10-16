import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DraftNote {
  title: string;
  content: string;
  tag: string;
}

const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteStore {
  draft: DraftNote;
  setDraft: (draft: Partial<DraftNote>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      
      setDraft: (newDraft) => 
        set((state) => ({ 
          draft: { ...state.draft, ...newDraft } 
        })),
      
      clearDraft: () => 
        set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft-storage', // назва для localStorage
    }
  )
);