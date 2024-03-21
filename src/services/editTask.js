import axios from "axios"

export const editTask = ({ task_id, title, description, is_finished, access }) => {
    const url = `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_TASK_API_PATH}`
    return axios.put(
        url,
        { task_id, title, description, is_finished },
        {
            "headers": { "Authorization": `JWT ${access}` }
        }
    ).then(res => {
        const editedTask = res.data
        return editedTask
    })
}