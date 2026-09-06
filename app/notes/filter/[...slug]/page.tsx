import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface SlugPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const query = '';
  const page = 1;
  const tag = slug[0];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', query, page, tag],
    queryFn: () => fetchNotes(query, page, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
