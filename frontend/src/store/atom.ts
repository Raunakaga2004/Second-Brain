import { atom } from "recoil"

export const modalwindowRecoil = atom<boolean>({
    key : 'modalwindowRecoil',
    default: false
})

export const reloadRecoil = atom<number>({
    key: 'reloadRecoil',
    default: Date.now()
})

export const editModalRecoil = atom<{
  isOpen: boolean;
  contentData?: {
    _id: string;
    title: string;
    link: string;
    description?: string;
    type?: "youtube" | "x" | "text" | "link";
  };
}>({
  key: "editModalRecoil",
  default: { isOpen: false },
});

export const previewModalRecoil = atom<{
  isOpen: boolean;
  contentData?: {
    _id: string;
    title: string;
    description?: string;
    link?: string;
    type?: "youtube" | "x" | "text" | "link";
    tags?: string[];
  };
}>({
  key: "previewModalRecoil",
  default: { isOpen: false },
});