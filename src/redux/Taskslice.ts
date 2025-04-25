import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Task {
  id: number;
  name: string;
  email: string;
  title: string;
  description: string;
}
interface TaskState {
  tasks: Task[];
}
const initialState: TaskState = {
  tasks: [],
};
const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});
export const { addTask, deleteTask ,editTask} = taskSlice.actions;
export default taskSlice.reducer; 