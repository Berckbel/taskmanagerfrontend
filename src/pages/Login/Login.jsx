import { useState } from "react"
import { useUser } from "../../hooks/useUser"
import { useUserInputs } from "../../hooks/useUserInputs"

export const Login = () => {
    const { login, isLoading, isError } = useUser()
    const { setInputs, emailError, passwordError, existError } = useUserInputs()
    const [formData, setFormData] = useState({ email: "", password: "" })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!existError) {
            const { email, password } = formData
            login({ email, password })
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"login-form"}>
            <h1>{"Login"}</h1>
            <label htmlFor="email">{"email:"}</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
            />
            {emailError && <h3>{emailError}</h3>}
            <label htmlFor="password">{"password:"}</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
            />
            {passwordError && <h3>{passwordError}</h3>}
            <button disabled={isLoading || existError}>{"Login"}</button>
            {isLoading && <h4>{"loading..."}</h4>}
            {isError && <h4>{"Not logged in"}</h4>}
        </form>
    )
}