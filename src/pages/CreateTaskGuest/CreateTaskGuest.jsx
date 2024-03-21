import { useState } from "react"
import { useTask } from "../../hooks/useTask"
import { useTaskInputs } from "../../hooks/useTaskInputs"

export const CreateTaskGuest = () => {
    const { createNewTaskGuest } = useTask()
    const { setInputs, descriptionError, titleError, existError } = useTaskInputs()
    const [formData, setFormData] = useState({ title: "", description: "", is_finished: false })

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
            const newTask = formData
            createNewTaskGuest({ newTask })
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"create-form"}>
            <h1>{"Create Task"}</h1>
            <label htmlFor="title">{"title:"}</label>
            <input
                type="title"
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
            <button disabled={existError}>{"Create"}</button>
        </form>
    )
}