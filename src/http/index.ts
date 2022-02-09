import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8081/'
})

export default http