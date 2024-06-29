export interface IPost {
  // id: string;
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
  content: string;
  isFeatured: boolean;
}

export interface INotification {
  title: string;
  message: string;
  status: "success" | "error" | "pending";
}
