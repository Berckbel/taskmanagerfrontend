import axios from "axios"

export const getUserTasks = ({ access }) => {
    const url = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_TASK_API_PATH}`
    return axios.get(url, { headers: { 'Authorization': `JWT ${access}` } }).then(res => {
        const tasks = res.data
        return tasks
    })
}