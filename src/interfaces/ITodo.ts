import {ToDoStateEnum} from "../enums/ToDoStateEnum"

export default interface ITodo {
    id: string
    text: string
    date: string
    orderNumber: number
    state: ToDoStateEnum
}
