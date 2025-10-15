import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: PageProps) {
  const { id } = await params;
  
  return (
    <Modal>
      <NotePreview noteId={id} />
    </Modal>
  );
}