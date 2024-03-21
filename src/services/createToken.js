import axios from "axios"

export const createToken = ({ email, password }) => {
    const url = `${import.meta.env.VITE_BASE_URL}/auth/jwt/create/`
    return axios.post(url, { email, password }).then(res => {
        const tokens = res.data
        return tokens
    })
}