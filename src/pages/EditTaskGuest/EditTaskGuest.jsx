import { useState } from "react"
import { useTask } from "../../hooks/useTask"
import { useTaskInputs } from "../../hooks/useTaskInputs"

export const EditTaskGuest = () => {
    const { selectedTask, editTaskGuest } = useTask()
    const { title, description } = selectedTask
    const { setInputs, descriptionError, titleError, existError } = useTaskInputs({ title, description })
    const [formData, setFormData] = useState(selectedTask)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        const newValue = type === 'checkbox' ? checked : value
        setFormData(prev => ({
            ...prev,
            [name]: newValue
        }))

        setInputs(prev => ({
            ...prev,
            [name]: newValue
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!existError){
            const { title, description, is_finished, taskIndex } = formData
            const updatedTask = { title, description, is_finished }
            editTaskGuest({ updatedTask, taskIndex })
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"edit-form"}>
            <h1>{"Edit Task"}</h1>
            <label htmlFor="title">{"title:"}</label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
            />
            {titleError && <h3>{titleError}</h3>}
            <label htmlFor="description">{"description:"}</label>
            <textarea
                id="description"
                name="description"
                onChange={handleChange}
                value={formData.description}
            >
            </textarea>
            {descriptionError && <h3>{descriptionError}</h3>}
            <label htmlFor="is_finished">{"done:"}</label>
            <input
                type="checkbox"
                id="is_finished"
                name="is_finished"
                checked={formData.is_finished}
                onChange={handleChange}
            />
            <button disabled={existError}>{"Edit"}</button>
        </form>
    )
}