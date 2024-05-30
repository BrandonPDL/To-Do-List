import React from 'react';
import styled from 'styled-components';

const Task = ({ task, onEdit, onDelete }) => {


  return (
    <ContainerTask>
      <Title>{task.title || 'Título no disponible'}</Title>
      <Description>{task.description || 'Descripción no disponible'}</Description>
      <Info>
        <Status>{task.state === 'completed' ? 'Completado' : 'Pendiente'}</Status>
        
      </Info>
      <Actions>
        <EditButton onClick={() => onEdit(task)}>Editar</EditButton>
        <DeleteButton onClick={() => onDelete(task.id)}>Eliminar</DeleteButton>
      </Actions>
    </ContainerTask>
  );
}

export default Task;

const ContainerTask = styled.div`
  padding: 20px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: var(--bacground-color-day);
  transition: transform 0.2s;
  width:95%;
  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1em;
  margin-bottom: 10px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Status = styled.span`
  font-weight: bold;
  color: ${({ children }) => (children === 'Completado' ? 'green' : 'red')};
`;

const Date = styled.span`
  font-size: 0.9em;
  color: #666;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #e53935;
  }
`;
