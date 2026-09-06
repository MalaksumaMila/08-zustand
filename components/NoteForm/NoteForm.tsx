import css from './NoteForm.module.css';
import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateNoteRequest } from '@/lib/api';
import { Note } from '@/types/note';

import { createNote } from '../../lib/api';


export default function NoteForm() {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const mutation = useMutation<Note, Error, CreateNoteRequest>({
    mutationFn: notes => createNote(notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
  
      <form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <input
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <textarea            
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
         
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <select
        
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
                 </div>

        <div className={css.actions}>
          <button
                        type="button"
            className={css.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </form>
   
  );
}
