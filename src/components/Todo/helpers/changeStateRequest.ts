import {ToDoStateEnum} from "../../../enums/ToDoStateEnum"
import ITodo from "../../../interfaces/ITodo"
import extendedAxios from "../../../extendedAxios"

export default async function changeStateRequest(todo: ITodo){
    try{
        const response = await extendedAxios.patch('/Todo', {
            id: todo.id,
            state: toggleState(todo.state)
        })

        return response.data

    }catch (error){
        console.error(error)
    }
}

function toggleState(state: ToDoStateEnum){
    if (state == ToDoStateEnum.Done){
        state = ToDoStateEnum.Todo
    }else {
        state = ToDoStateEnum.Done
    }

    return state
}
