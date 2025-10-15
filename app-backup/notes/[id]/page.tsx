import NoteDetailsClient from "./NoteDetails.client";

interface PageProps {
  params: {
    id: string;
  };
}

export default function NotePage({ params }: PageProps) {
  return <NoteDetailsClient noteId={params.id} />;
}