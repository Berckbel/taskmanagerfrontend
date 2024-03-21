import { useEffect, useRef, useState } from "react"

export const useTaskInputs = (props = { title: "", description: "" }) => {
    const [inputs, setInputs] = useState({ title: props.title, description: props.description })
    const [errors, setErrors] = useState({ title: null, description: null })
    const isFirstInput = useRef({ title: true, description: true })

    useEffect(() => {

        if (isFirstInput.current.title) {
            isFirstInput.current.title = inputs.title === ""
            return
        }

        if (inputs.title === "") {
            setErrors(prev => ({ ...prev, title: "empty title" }))
            return
        }

        if (inputs.title.length < 3) {
            setErrors(prev => ({ ...prev, title: "title too short" }))
            return
        }

        if (inputs.title.length > 20) {
            setErrors(prev => ({ ...prev, title: "title too large" }))
            return
        }

        setErrors(prev => ({ ...prev, title: null }))

        if (isFirstInput.current.description) {
            isFirstInput.current.description = inputs.description === ""
            return
        }

        if (inputs.description === "") {
            setErrors(prev => ({ ...prev, description: "empty description" }))
            return
        }

        if (inputs.description.length < 3) {
            setErrors(prev => ({ ...prev, description: "description too short" }))
            return
        }

        if (inputs.description.length > 50) {
            setErrors(prev => ({ ...prev, description: "description too large" }))
            return
        }

        setErrors(prev => ({ ...prev, description: null }))

    }, [inputs])

    return {
        titleInput: inputs.title,
        decriptionInput: inputs.description,
        titleError: errors.title,
        descriptionError: errors.description,
        existError: Boolean(errors.title || errors.description),
        setInputs,
    }

}