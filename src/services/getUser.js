import axios from "axios"

export const getUser = ({ access }) => {
    const url = `${import.meta.env.VITE_BASE_URL}/auth/users/me/`
    return axios
        .get(url, { headers: { Authorization: `JWT ${access}` } })
        .then((res) => {
            const user = res.data
            return user
        })
};