import { setBearerToken } from "src/boot/axios";
import { Usuario } from "src/model/sessao";

export const StorageTypes = {
    TOKEN: "token",
    USER: "user"
};

export default function useLocalStorage() {
    const setHeaderToken = (token: string) => setBearerToken(token);

    const setLocalToken = (token: string) =>
        localStorage.setItem(StorageTypes.TOKEN, token);

    const setLocalUsuario = (usuario: Usuario) =>
        localStorage.setItem(StorageTypes.USER, JSON.stringify(usuario));

    const getLocalToken = () => localStorage.getItem(StorageTypes.TOKEN);

    const getLocalUsuario = () =>
        JSON.parse(localStorage.getItem(StorageTypes.USER) as string);

    const deleteLocalToken = () => localStorage.removeItem(StorageTypes.TOKEN);

    const deleteLocalUsuario = () => localStorage.removeItem(StorageTypes.USER);

    return {
        setHeaderToken,
        setLocalToken,
        setLocalUsuario,
        getLocalToken,
        getLocalUsuario,
        deleteLocalToken,
        deleteLocalUsuario
    };
}
