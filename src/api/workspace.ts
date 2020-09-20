import axios from 'axios'
import { WorkspaceData } from '@/types/workspace'

export type responseWorkspaces = {
  workspaces: WorkspaceData[];
};

export const fetchWorkspaces = async (email: string) => await axios.get<responseWorkspaces>(`${process.env.VUE_APP_API_BASE_URL}/workspaces`, {
  params: { email: email }}
);
