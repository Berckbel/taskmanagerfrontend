import { useContext } from "react";
import AuthContext from '../context/AuthContext'

export const useGlobalAuth = () => {
    return useContext(AuthContext)
}