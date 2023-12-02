import { create } from "zustand";
interface IUserData {
  id: string;
  name: string;
}
interface RegisterStoreType {
  isAuth: boolean;
  user: IUserData | null;
  onLogin: (data: IUserData) => void;
  onLogout: () => void;
}
const useAuthModel = create<RegisterStoreType>((set) => ({
  isAuth: false,
  user: null,
  onLogin: (data) => set({ isAuth: true, user: data }),
  onLogout: () => set({ isAuth: false, user: null }),
}));
export default useAuthModel;
