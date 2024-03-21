import { useState } from "react"
import { useTask } from "../../hooks/useTask"
import { useTaskInputs } from "../../hooks/useTaskInputs"

export const CreateTask = () => {

    const { createNewTask, isLoading, isError } = useTask()
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
            const { title, description, is_finished } = formData
            createNewTask({ title, description, is_finished })
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
                disabled={isLoading}
            />
             {titleError && <h3>{titleError}</h3>}
            <label htmlFor="description">{"description:"}</label>
            <textarea
                id="description"
                name="description"
                onChange={handleChange}
                value={formData.description}
                disabled={isLoading}
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
            <button disabled={existError} >{"Create"}</button>
            {isLoading && <h4>{"loading..."}</h4>}
            {isError && <h4>{"Something went wrong"}</h4>}
        </form>
    )
}