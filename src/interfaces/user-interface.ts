interface UserType {
  id?: number;
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: string;
}
interface AllPostsType {
  id?: number;
  title: string;
  imageUrl: string;
  description: string;
}

export type { UserType, AllPostsType};
