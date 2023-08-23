import ITodo from "../../../interfaces/ITodo"
import axios from "axios"
import {ToDoStateEnum} from "../../../enums/ToDoStateEnum"

export default async function getAllTodosAsync(): Promise<ITodo[] | null | undefined>{
    try {
        const todosData = await axios.get("https://localhost:7151/Todo/all")
        return todosData.data as ITodo[]
    }catch (error){
        console.error(error)
        return null
    }
}
