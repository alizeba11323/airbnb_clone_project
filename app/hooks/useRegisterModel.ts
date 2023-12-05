import { create } from "zustand";

interface RegisterStoreType {
  isOpenType: string;
  isOpen: boolean;
  onOpen: (type: string) => void;
  onClose: () => void;
}
const useRegisterModel = create<RegisterStoreType>((set) => ({
  isOpenType: "register",
  isOpen: false,
  onOpen: (isOpenType) => set({ isOpen: true, isOpenType }),
  onClose: () => set({ isOpen: false, isOpenType: "" }),
}));
export default useRegisterModel;
