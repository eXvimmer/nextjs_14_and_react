export interface IPost {
  author: string;
  body: string;
  id: ReturnType<typeof crypto.randomUUID>;
}
