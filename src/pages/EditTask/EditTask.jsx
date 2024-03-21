import { useState } from "react"
import { useTask } from "../../hooks/useTask"
import { useTaskInputs } from "../../hooks/useTaskInputs"

export const EditTask = () => {
    const { selectedTask, editTaskById, isLoading, isError } = useTask()
    const { title, description } = selectedTask
    const { setInputs, descriptionError, titleError, existError } = useTaskInputs({ title, description })
    const [formData, setFormData] = useState(selectedTask)

    console.log(existError)

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
        if(!existError) {
            const { id, title, description, is_finished } = formData
            editTaskById({ task_id: id, title, description, is_finished })
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
                disabled={isLoading}
            />
            {titleError && <h3>{titleError}</h3>}
            <label htmlFor="description">{"description:"}</label>
            <textarea
                id="description"
                name="description"
                onChange={handleChange}
                disabled={isLoading}
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
                disabled={isLoading}
            />
            <button disabled={isLoading}>{"Edit"}</button>
            {isLoading && <h4>{"loading..."}</h4>}
            {isError && <h4>{"Something went wrong"}</h4>}
        </form>
    )
}
