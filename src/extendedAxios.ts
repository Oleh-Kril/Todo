import axios from 'axios'

const extendedAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_HOST,
})

export default extendedAxios
