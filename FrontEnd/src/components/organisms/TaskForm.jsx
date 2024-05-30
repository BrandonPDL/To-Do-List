import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const TaskForm = ({ task, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState('pending');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setState(task.state || 'pending');
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      ...task,
      title,
      description,
      state,
      completed: state === 'completed',
    };
    onSave(updatedTask);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormField>
        <label htmlFor="title">Título</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormField>
      <FormField>
        <label htmlFor="description">Descripción</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </FormField>
      <FormField>
        <label htmlFor="state">Estado</label>
        <select
          id="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        >
          <option value="pending">Pendiente</option>
          <option value="completed">Completado</option>
        </select>
      </FormField>
      <ButtonContainer>
        <SaveButton type="submit">Guardar</SaveButton>
        <CancelButton type="button" onClick={onCancel}>Cancelar</CancelButton>
      </ButtonContainer>
    </FormContainer>
  );
};

export default TaskForm;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: var(--background-color-day);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const FormField = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    margin-bottom: 5px;
  }
  input, textarea, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    background-color: #45a049;
  }
`;

const CancelButton = styled.button`
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #e53935;
  }
`;
