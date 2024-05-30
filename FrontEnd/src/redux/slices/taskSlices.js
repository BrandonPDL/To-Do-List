// src/redux/slices/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Acción asíncrona para obtener las tareas con paginación y autenticación
export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async ({ search = '', state = '', page = 1, token }, { rejectWithValue }) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/tasks?search=${search}&page=${page}&state=${state}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
        const data = await response.json();
        if (response.ok) {
          return { tasks: data.data, currentPage: data.current_page, totalPages: Math.ceil(data.total / data.per_page) };
        } else {
          return rejectWithValue(data.message);
        }
      } catch (error) {
        return rejectWithValue('Error en la red');
      }
    }
  );

// Acción asíncrona para crear una tarea
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async ({ task, token }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task)
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue('Error en la red');
    }
  }
);

// Acción asíncrona para actualizar una tarea
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, task, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(task)
      });
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue('Error en la red');
    }
  }
);

// Acción asíncrona para eliminar una tarea
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ taskId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        return { taskId };
      } else {
        const data = await response.json();
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue('Error en la red');
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    loading: false,
    error: '',
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
        state.loading = false;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.payload || 'Error en la red';
        state.loading = false;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload.taskId);
      });
  },
});

export const { setPage } = taskSlice.actions;
export default taskSlice.reducer;
