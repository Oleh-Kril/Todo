import extendedAxios from "../../../extendedAxios"
import ITodo from "../../../interfaces/ITodo"

export default async function createNewTodoRequest(todo: ITodo): Promise<ITodo | null>{
    try{
        const response = await extendedAxios.post('/Todo', {
            text: todo.text,
            state: todo.state,
            date: todo.date,
            orderNumber: todo.orderNumber
        })

        return response.data

    }catch (error){
        console.error(error)
        return null
    }
}

