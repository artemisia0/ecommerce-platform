import { atom } from 'jotai'


const initialValue: { [key: string]: number; } = {  }
const cartStateAtom = atom(initialValue)

export default cartStateAtom

