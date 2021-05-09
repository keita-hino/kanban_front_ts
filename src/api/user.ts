import axios from 'axios'
import { User } from '@/types/schema'

export type UpdateUserResponse = {
  data: string;
};

export const updateUser = async (user: User) => await axios.patch<UpdateUserResponse>(`${process.env.VUE_APP_API_BASE_URL}/users`, {
  user: user
});