import { Usuario } from "./Sessao"

export const StorageTypes = {
    TOKEN: 'token',
    USER: 'user'
}

export const setLocalToken = (token: string) => localStorage.setItem(StorageTypes.TOKEN, token)
export const setLocalUsuario = (usuario: Usuario) => localStorage.setItem(StorageTypes.USER, JSON.stringify(usuario))

export const getLocalToken = () => localStorage.getItem(StorageTypes.TOKEN)
export const getLocalUsuario = () => JSON.parse(localStorage.getItem(StorageTypes.USER) as string)

export const deleteLocalToken = () => localStorage.removeItem(StorageTypes.TOKEN)
export const deleteLocalUsuario = () => localStorage.removeItem(StorageTypes.USER)
