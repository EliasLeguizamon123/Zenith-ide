import { atom } from 'nanostores';

export const isFileOpen = atom(false);

export const fileName = atom('untitled file');