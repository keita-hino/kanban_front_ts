export interface TaskData {
  id?: number;
  name?: string;
  status?: string; // enum でも
  due_date?: Date; // enum でも
  priority?: string;
  detail?: string;
}