'use client';

import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';

import css from './NotesPage.module.css';

import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/app/loading';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const debounceSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['notes', query, page, tag],
    queryFn: () => fetchNotes(query, page, tag),
    placeholderData: keepPreviousData,
  });

  const pageCount = data?.totalPages ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox query={query} onChange={debounceSearch} />

        {isSuccess && pageCount > 1 && (
          <Pagination page={page} setPage={setPage} pageCount={pageCount} />
        )}

        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}

      {isSuccess && !isLoading && data.notes.length > 0 && (
        <NoteList notes={data.notes} />
      )}

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <NoteForm closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
}
