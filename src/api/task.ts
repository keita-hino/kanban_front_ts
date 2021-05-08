import axios from 'axios'
import { Task } from '@/types/schema'

export type responseFetchTasks = {
  tasks: Task[];
  priorities: string[];
  statuses: object;
};

export type responseTasks = {
  tasks: Task[]
}

export const fetchTasks = async (workspaceId: Number) => await axios.get<responseFetchTasks>(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
  params: {
    workspace_id: workspaceId
  }}
);

export const postTask = async (task: Task, workspaceId: Number) => await axios.post<responseTasks>(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
  task: task,
  workspace_id: workspaceId
});

export const updateTask = async (task: Task, workspaceId: Number) => await axios.patch<responseTasks>(`${process.env.VUE_APP_API_BASE_URL}/tasks`, {
  task: task,
  workspace_id: workspaceId
});

export const updateOrderTask = async (movedTask: Task, workspaceId: Number) => await axios.patch<responseTasks>(`${process.env.VUE_APP_API_BASE_URL}/tasks/moved_tasks`, {
  task: movedTask,
  old_display_order: movedTask.display_order,
  workspace_id: workspaceId,
});

export const updateStatusTask = async (task: Task, workspaceId: Number) => await axios.patch<responseTasks>(`${process.env.VUE_APP_API_BASE_URL}/tasks/update_status_task`, {
  task: task,
  workspace_id: workspaceId,
});