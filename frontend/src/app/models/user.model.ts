export interface User {
    _id?: string;
  fullname: string;
  email: string;
  role: {
    name: string;
    permissions: string[];
  };
}