import axios from "axios"

export const createTask = ({ title, description, is_finished, access }) => {
    const url = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_TASK_API_PATH}`
    return axios.post(
        url,
        { title, description, is_finished },
        {
            "headers": { "Authorization": `JWT ${access}` }
        }
    ).then(res => {
        const newTask = res.data
        return newTask
    })
}