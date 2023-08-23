import extendedAxios from "../../../extendedAxios"

export default async function updateTodoTextRequest(id: string, newText: string){
    try{
        const response = await extendedAxios.patch('/Todo', {
            id: id,
            text: newText
        })

        return response.data

    }catch (error){
        console.error(error)
    }
}

