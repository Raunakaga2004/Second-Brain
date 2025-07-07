import { atom } from "recoil"

export const modalwindowRecoil = atom<boolean>({
    key : 'modalwindowRecoil',
    default: false
})

export const reloadRecoil = atom<number>({
    key: 'reloadRecoil',
    default: Date.now()
})