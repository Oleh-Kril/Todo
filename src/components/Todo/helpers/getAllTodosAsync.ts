import ITodo from "../../../interfaces/ITodo"
import extendedAxios from "../../../extendedAxios"

export default async function getAllTodosAsync(): Promise<ITodo[] | null | undefined>{
    try {
        const todosData = await extendedAxios.get("/Todo/all")
        return todosData.data as ITodo[]
    }catch (error){
        console.error(error)
        return null
    }
}
