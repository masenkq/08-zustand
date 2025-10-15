"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface NoteDetailsClientProps {
  noteId: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const router = useRouter();
  
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: async (): Promise<Note> => {
      const response = await api.notes.getById(noteId);
      return response.data;
    },
  });

  if (isLoading) return <div style={{ padding: "2rem", textAlign: "center" }}>Loading note details...</div>;
  if (error) return <div style={{ padding: "2rem", textAlign: "center" }}>Error loading note</div>;
  if (!note) return <div style={{ padding: "2rem", textAlign: "center" }}>Note not found</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <button 
        onClick={() => router.back()}
        style={{
          background: "none",
          border: "1px solid #ccc",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "1rem"
        }}
      >
        ← Back
      </button>
      
      <article style={{ background: "white", padding: "2rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
        <header style={{ marginBottom: "2rem" }}>
          <h1 style={{ 
            fontSize: "2.5rem", 
            fontWeight: "bold", 
            marginBottom: "1rem",
            color: "#333"
          }}>
            {note.title}
          </h1>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            color: "#666",
            fontSize: "0.9rem"
          }}>
            <div>
              <span>Created: {new Date(note.createdAt).toLocaleDateString()}</span>
              {note.updatedAt !== note.createdAt && (
                <span style={{ marginLeft: "1rem" }}>
                  Updated: {new Date(note.updatedAt).toLocaleDateString()}
                </span>
              )}
            </div>
            
            {note.tags && note.tags.length > 0 && (
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {note.tags.map((tag) => (
                  <span 
                    key={tag}
                    style={{
                      background: "#007acc",
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "16px",
                      fontSize: "0.8rem",
                      fontWeight: "500"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div 
          style={{ 
            lineHeight: "1.7", 
            fontSize: "1.1rem",
            color: "#333",
            whiteSpace: "pre-wrap"
          }}
        >
          {note.content}
        </div>

        <footer style={{ 
          marginTop: "3rem", 
          paddingTop: "1rem", 
          borderTop: "1px solid #eee",
          display: "flex",
          gap: "1rem"
        }}>
          <button 
            onClick={() => router.push(`/notes/filter/All`)}
            style={{
              background: "#007acc",
              color: "white",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            View All Notes
          </button>
          
          <button 
            onClick={() => router.push("/notes/create")}
            style={{
              background: "transparent",
              color: "#007acc",
              border: "1px solid #007acc",
              padding: "0.75rem 1.5rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            Create New Note
          </button>
        </footer>
      </article>
    </div>
  );
}