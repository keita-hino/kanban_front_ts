import axios from 'axios'
import { TaskData } from '@/types/task'

export type responseTasks = {
  tasks: TaskData[];
  priorities: String[];
  statuses: Object;
};

export const fetchTasks = async (workspace_id: Number) => await axios.get<responseTasks>(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
  params: {
    workspace_id: workspace_id
  }}
);
