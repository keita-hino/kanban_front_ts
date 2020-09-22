import axios from 'axios'
import { TaskData } from '@/types/task'

export type responseFetchTasks = {
  tasks: TaskData[];
  priorities: String[];
  statuses: Object;
};

export type responseTasks = {
  tasks: TaskData[]
}

export const fetchTasks = async (workspaceId: Number) => await axios.get<responseFetchTasks>(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
  params: {
    workspace_id: workspaceId
  }}
);

export const postTask = async (task: TaskData, workspaceId: Number) => await axios.post<responseTasks>(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
  task: task,
  workspace_id: workspaceId
});

export const updateTask = async (task: TaskData, workspaceId: Number) => await axios.patch<responseTasks>(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
  task: task,
  workspace_id: workspaceId
});