import axios from 'axios'
import { User } from '@/types/schema'
import { Workspace } from '@/types/schema'

export type LoginResponse = {
  data: string;
  workspace: Workspace;
};

export const login = async (user: User) => await axios.post<LoginResponse>(`${process.env.VUE_APP_API_BASE_URL}/auth/sign_in`, user);
