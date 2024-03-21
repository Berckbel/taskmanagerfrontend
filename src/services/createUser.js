import axios from "axios"

export const createUser = ({ email, name, password, re_password }) => {
    const url = `${import.meta.env.VITE_BASE_URL}/auth/users/`
    return axios.post(url, { email, name, password, re_password }).then(res => {
        const user = res.data
        return user
    })
}