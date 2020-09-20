import axios from 'axios'
import { UserData } from '@/types/user'

export type responseUpdateUser = {
  data: string;
};

export const updateUser = async (user: UserData) => await axios.patch<responseUpdateUser>(`${process.env.VUE_APP_API_BASE_URL}/users`, {
  user: user
});