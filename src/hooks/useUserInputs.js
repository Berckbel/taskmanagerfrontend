import { useEffect, useRef, useState } from "react"

export const useUserInputs = (props = { isRegister: false }) => {
    const [inputs, setInputs] = useState({ email: "", password: "", re_password: "" })
    const [errors, setErrors] = useState({ email: null, password: null, re_password: null })
    const isFirstInput = useRef({ email: true, password: true, re_password: true })

    useEffect(() => {

        if (isFirstInput.current.email) {
            isFirstInput.current.email = inputs.email === ""
            return
        }

        if (inputs.email === "") {
            setErrors(prev => ({ ...prev, email: "empty email" }))
            return
        }

        if (!inputs.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            setErrors(prev => ({ ...prev, email: "invalid email" }))
            return
        }

        if (inputs.email.length < 6) {
            setErrors(prev => ({ ...prev, email: "email too short" }))
            return
        }

        if (inputs.email.length > 25) {
            setErrors(prev => ({ ...prev, email: "email too large" }))
            return
        }

        setErrors(prev => ({ ...prev, email: null }))

        if (isFirstInput.current.password) {
            isFirstInput.current.password = inputs.password === ""
            return
        }

        if (inputs.password === "") {
            setErrors(prev => ({ ...prev, password: "empty password" }))
            return
        }

        if (inputs.password.length < 8) {
            setErrors(prev => ({ ...prev, password: "password too short" }))
            return
        }

        if (inputs.password.length > 50) {
            setErrors(prev => ({ ...prev, password: "password too large" }))
            return
        }

        setErrors(prev => ({ ...prev, password: null }))

        if (props.isRegister) {
            if (isFirstInput.current.re_password) {
                isFirstInput.current.re_password = inputs.re_password === ""
                return
            }

            if (inputs.re_password === "") {
                setErrors(prev => ({ ...prev, re_password: "empty re-password" }))
                return
            }

            if (inputs.password !== inputs.re_password) {
                setErrors(prev => ({ ...prev, re_password: "passwords do no match" }))
                return
            }

            setErrors(prev => ({ ...prev, re_password: null }))
        }

    }, [inputs])

    return {
        emailError: errors.email,
        passwordError: errors.password,
        rePasswordError: errors.re_password,
        existError: Boolean(errors.email || errors.password || errors.re_password),
        setInputs,
    }
}