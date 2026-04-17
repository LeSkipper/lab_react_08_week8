export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  readTime: number;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  avatar: string;
}
