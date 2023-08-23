import extendedAxios from "../../../extendedAxios"

export default async function moveToAnotherDayRequest(id: string, dayToMoveTo: string){
    try{
        const response = await extendedAxios.patch('/Todo', {
            id: id,
            date: dayToMoveTo
        })

        return response.data

    }catch (error){
        console.error(error)
        return null
    }
}

