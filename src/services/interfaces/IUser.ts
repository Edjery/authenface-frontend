interface IUser {
  id: number;
  email: string;
  password: string;
  userImage: File | null;
}

export default IUser;
