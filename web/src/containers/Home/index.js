import React, { useEffect, useState } from 'react';
import { useMappedActions, useMappedState } from 'store/lib';
import { CREATE_NOTE, FETCH_NOTES, NOTES } from 'store/types';
import { Link } from 'components';
import { MODULES } from 'utils/constants';

const Home = () => {
  const [input, setInput] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  const { notes } = useMappedState(MODULES.NOTES, {
    notes: NOTES,
  });

  const { createNote, fetchNotes } = useMappedActions(MODULES.NOTES, {
    createNote: CREATE_NOTE,
    fetchNotes: FETCH_NOTES,
  });

  const addNote = async () => {
    try {
      setError('');
      setDisabled(true);
      await createNote(input);
      setInput('');
    } catch (err) {
      setError(err.error);
    }
    setDisabled(false);
  };

  const onChange = evt => {
    setInput(evt.target.value);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <input disabled={disabled} value={input} onChange={onChange} />
      <button onClick={addNote}>Create</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {notes.map(({ _id, text }) => (
          <li key={_id}>
            <Link to={`/${_id}`}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
