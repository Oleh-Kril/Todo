import {ToDoStateEnum} from "../../../enums/ToDoStateEnum"
import ITodo from "../../../interfaces/ITodo"
import extendedAxios from "../../../extendedAxios"

export default async function deleteTodoRequest(id: string): Promise<Boolean>{
    try{
        const response = await extendedAxios.delete(`/Todo?id=${id}`)
        return true
    }catch (error){
        console.error(error)
        return false
    }
}

