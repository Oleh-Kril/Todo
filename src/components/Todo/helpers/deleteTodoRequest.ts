import extendedAxios from "../../../extendedAxios"

export default async function deleteTodoRequest(id: string): Promise<Boolean>{
    try{
        await extendedAxios.delete(`/Todo?id=${id}`)
        return true
    }catch (error){
        console.error(error)
        return false
    }
}

