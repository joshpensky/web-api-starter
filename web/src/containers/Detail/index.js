import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { api } from 'utils';

const Detail = ({
  match: {
    params: { id },
  },
}) => {
  const [note, setNote] = useState(null);
  const [error, setError] = useState('');
  const [deleted, setDeleted] = useState(false);

  const [input, setInput] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [inputError, setInputError] = useState('');

  const addNote = note => {
    setNote(note);
    setInput(note.text);
  };

  const fetchNote = async () => {
    try {
      const note = await api.get(`/notes/${id}`);
      addNote(note);
    } catch (err) {
      setError(err.error);
    }
  };

  const deleteNote = async () => {
    try {
      await api.delete(`/notes/${id}`);
      setDeleted(true);
    } catch (err) {
      setInputError(err.error);
    }
  };

  const onChange = evt => {
    setInput(evt.target.value);
  };

  const updateNote = async () => {
    try {
      setInputError('');
      setDisabled(true);
      const body = { text: input };
      const note = await api.put(`/notes/${id}`, { body });
      addNote(note);
    } catch (err) {
      setInputError(err.error);
    }
    setDisabled(false);
  };

  useEffect(() => {
    fetchNote();
  }, []);

  if (deleted) {
    return <Redirect to="/" />;
  } else if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  } else if (!note) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>{note.text}</h1>
      <textarea disabled={disabled} value={input} onChange={onChange} />
      <button onClick={updateNote}>Update</button>
      <button style={{ color: 'red' }} onClick={deleteNote}>Delete</button>
      {inputError && <p style={{ color: 'red' }}>{inputError}</p>}
    </div>
  );
};

Detail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Detail;
