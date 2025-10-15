import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "../../../../lib/getQueryClient";
import { api } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: PageProps) {
  const { id } = await params;
  const queryClient = getQueryClient();

  // Попереднє завантаження даних на сервері
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const response = await api.notes.getById(id);
      return response.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient noteId={id} />
    </HydrationBoundary>
  );
}