export interface User {
    _id?: string;
  fullname: string;
  email: string;
  imageUrl?: string;
  role: {
    name: string;
    permissions: string[];
  };
}