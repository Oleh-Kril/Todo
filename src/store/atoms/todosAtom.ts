import { atom } from "jotai"
import ITodo from "../../interfaces/ITodo"

export const todosAtom = atom([] as ITodo[])
