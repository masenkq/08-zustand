"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

interface NotePreviewClientProps {
  noteId: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt: string;
}

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: async (): Promise<Note> => {
      const response = await api.notes.getById(noteId);
      return response.data;
    },
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <div>Loading note...</div>;
  if (error) return <div>Error loading note</div>;
  if (!note) return <div>Note not found</div>;

  return (
    <Modal>
      <div>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #eee"
        }}>
          <h1 style={{ margin: 0 }}>{note.title}</h1>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.5rem",
              cursor: "pointer",
              color: "#666",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
          >
            ×
          </button>
        </div>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #eee"
        }}>
          <span style={{ color: "#666", fontSize: "0.9rem" }}>
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
          {note.tags && note.tags.length > 0 && (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {note.tags.map((tag) => (
                <span 
                  key={tag}
                  style={{
                    background: "#e9ecef",
                    color: "#495057",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "12px",
                    fontSize: "0.8rem"
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div style={{ lineHeight: "1.6" }}>
          {note.content}
        </div>
      </div>
    </Modal>
  );
}