export interface Dialogue {
  id: string;
  title: string;
  original: string;
  translation: string;
  createdAt: number;
}

export interface User {
  username: string;
  email?: string;
}
