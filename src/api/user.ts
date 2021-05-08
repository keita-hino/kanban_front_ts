import axios from 'axios'
import { User } from '@/types/schema'

export type responseUpdateUser = {
  data: string;
};

export const updateUser = async (user: User) => await axios.patch<responseUpdateUser>(`${process.env.VUE_APP_API_BASE_URL}/users`, {
  user: user
});