import axios from 'axios'
import { UserData } from '@/types/user'
import { WorkspaceData } from '@/types/workspace'

export type responseLogin = {
  data: string;
  workspace: WorkspaceData;
};

export const login = async (user: UserData) => await axios.post<responseLogin>(`${process.env.VUE_APP_API_BASE_URL}/auth/sign_in`, user);
