import axios from "axios"

export const deleteTask = ({ task_id, access }) => {
    const url = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_TASK_API_PATH}`
    return axios.delete(url, {
        headers: {
            Authorization: `JWT ${access}`
        },
        data: {
            task_id
        }
    }
    ).then(res => {
        const taskDeleted = res.data
        return taskDeleted
    })
}