import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Task from '../molecules/Task';
import TaskForm from '../organisms/TaskForm';
import SuccessModal from '../organisms/SuccessModal';
import { fetchTasks, setPage, createTask, updateTask, deleteTask } from '../../redux/slices/taskSlices';

const ListT = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error, currentPage, totalPages } = useSelector((state) => state.tasks);
  const token = useSelector((state) => state.auth.token);
  const [editingTask, setEditingTask] = useState(null);
  const [filterState, setFilterState] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(fetchTasks({ page: currentPage, state: filterState, search: searchQuery, token }));
    }
  }, [dispatch, currentPage, filterState, token]);
  useEffect(() => {
    if (searchQuery=='') {
      dispatch(fetchTasks({ page: currentPage, state: filterState, search: '', token }));
    }
  }, [dispatch, searchQuery]);
  const handlePageChange = (page) => {
    dispatch(setPage(page));
    dispatch(fetchTasks({ page, state: filterState, search: searchQuery, token }));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = async (taskId) => {
    await dispatch(deleteTask({ taskId, token }));
    setModalMessage('Tarea eliminada exitosamente');
    setIsModalOpen(true);
  };

  const handleSaveTask = async (task) => {
    if (task.id) {
      await dispatch(updateTask({ taskId: task.id, task, token }));
      setModalMessage('Tarea actualizada exitosamente');
    } else {
      await dispatch(createTask({ task, token }));
      setModalMessage('Tarea creada exitosamente');
    }
    setIsModalOpen(true);
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleFilterChange = (e) => {
    setFilterState(e.target.value);
    dispatch(setPage(1));
    dispatch(fetchTasks({ page: 1, state: e.target.value, search: searchQuery, token }));
  };

  const handleSearchChange = (e) => {
    dispatch(fetchTasks({ page: currentPage, state: filterState, search: searchQuery, token }));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Title>Lista de Actividades</Title>

      <Container>
        {editingTask ? (
          <TaskForm task={editingTask} onSave={handleSaveTask} onCancel={handleCancelEdit} />
        ) : (
          <>
            <FilterContainer>
              <label htmlFor="stateFilter">Filtrar por Estado:</label>
              <select id="stateFilter" value={filterState} onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="pending">Pendiente</option>
                <option value="completed">Completado</option>
              </select>
            </FilterContainer>
            <SearchContainer>
              <label htmlFor="searchQuery">Buscar:</label>
              <input
                type="text"
                id="searchQuery"
                value={searchQuery}
                onChange={async (e) => {
                  setSearchQuery(e.target.value);
                }}
                placeholder="Buscar tareas..."
              />
              <Button onClick={handleSearchChange}>Buscar</Button>
            </SearchContainer>
            <AddTaskButton onClick={() => setEditingTask({})}>Agregar Nueva Tarea</AddTaskButton>
            {tasks.map(task => (
              <Task key={task.id} task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />
            ))}
            <Pagination>
              {Array.from({ length: totalPages }, (_, index) => (
                <PageNumber
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  active={index + 1 === currentPage}
                >
                  {index + 1}
                </PageNumber>
              ))}
            </Pagination>

          </>
        )}
      </Container>

      <SuccessModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        message={modalMessage}
      />
    </>
  );
};

export default ListT;

const Title = styled.h1`
  color: var(--text-color-day);
  font-family: var(--text-font-normal);
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  label {
    margin-right: 10px;
  }
  select {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 20px;
  label {
    margin-right: 10px;
  }
  input {
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width:80%;
  align-items: center;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageNumber = styled.button`
  margin: 0 5px;
  padding: 10px 15px;
  cursor: pointer;
  background-color: ${({ active }) => (active ? '#007bff' : '#f1f1f1')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: none;
  border-radius: 4px;
  &:hover {
    background-color: ${({ active }) => (active ? '#0056b3' : '#d4d4d4')};
  }
`;

const AddTaskButton = styled.button`
  margin: 10px 0;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Button = styled.button`
  background-color:var(--action);
  color:white;
  margin-left: 15px;
  padding:10px;
  border-radius: 5px;
`;
