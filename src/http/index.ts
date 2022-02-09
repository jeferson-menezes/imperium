import axios, { AxiosInstance } from "axios";

const http: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8081/'
})

export const setBearerToken = (token: string) => {
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default http