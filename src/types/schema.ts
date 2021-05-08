export type Event = {
  from?: any;
  to?: any;
  oldIndex?: number;
  newIndex?: number;
}

export type Task = {
  id?: number;
  name?: string;
  status?: string; // enum でも
  due_date?: Date; // enum でも
  priority?: string;
  detail?: string;
  display_order?: number;
}

export type User = {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  before_email?: string;
  password?: string;
}

export type Workspace = {
  name?: string;
  image_url?: string;
}