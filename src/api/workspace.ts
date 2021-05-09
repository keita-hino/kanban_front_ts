import axios from 'axios'
import { Workspace } from '@/types/schema'

export type WorkspacesResponse = {
  workspaces: Workspace[];
};

export const fetchWorkspaces = async (email: string) => await axios.get<WorkspacesResponse>(`${process.env.VUE_APP_API_BASE_URL}/workspaces`, {
  params: { email: email }}
);
