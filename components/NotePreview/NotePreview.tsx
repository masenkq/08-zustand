"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface NotePreviewProps {
  noteId: string
}

interface Note {
  id: string
  title: string
  content: string
  tags?: string[]
  createdAt: string
}

export default function NotePreview({ noteId }: NotePreviewProps) {
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: async (): Promise<Note> => {
      const response = await axios.get(`/api/notes/${noteId}`)
      return response.data
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading note</div>
  if (!note) return <div>Note not found</div>

  return (
    <div>
      <h1>{note.title}</h1>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between",
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
  )
}
