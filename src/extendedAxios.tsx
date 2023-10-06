import axios from 'axios'
import {useState} from "react"
import Toast from "./ui/Toast"

const extendedAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_HOST,
})

function AxiosInterceptor(){
    const [error, setError] = useState<string | null>(null)

    extendedAxios.interceptors.response.use(
        response => response,
        axiosError => {
            console.log("Error", axiosError)
            if (axiosError.code === "ERR_NETWORK") {
                setError("Backend host is unavailable. Refresh page or try again later.")
            }
            if (axiosError.response) {
                const errorMessage = axiosError.response.data || 'An error occurred'
                if(errorMessage.length > 100){
                    setError(errorMessage.substring(0, 100) + "...")
                }else{
                    setError(errorMessage)
                }
            }
            return Promise.reject(axiosError)
        }
    )

    return error !== null ? <Toast text={error} onCloseClick={() => setError(null)}/> : null
}

export default extendedAxios
export {AxiosInterceptor}
