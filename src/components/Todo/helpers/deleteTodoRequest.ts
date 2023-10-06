import extendedAxios from "../../../extendedAxios"

export default async function deleteTodoRequest(id: string): Promise<Boolean>{
    try{
        await extendedAxios.delete(`/Todo?id=30eb2897-3ad2-4e13-9c25-21cc4af153ab`)
        return true
    }catch (error){
        console.error(error)
        return false
    }
}

