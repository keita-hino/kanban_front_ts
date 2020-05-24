// ログイン周り
export interface Auth {
  email: string | null;
  last_name: string | null;
  first_name: string | null;
}

// ワークススペース
export interface Workspace {
  id: number | null;
  name: string | null;
}