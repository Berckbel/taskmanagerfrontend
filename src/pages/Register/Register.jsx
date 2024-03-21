import { useState } from "react"
import { useUser } from "../../hooks/useUser"
import { useUserInputs } from "../../hooks/useUserInputs"

export const Register = () => {
    const { register, isLoading, isError } = useUser()
    const { setInputs, emailError, passwordError, rePasswordError, existError } = useUserInputs({ isRegister: true })
    const [formData, setFormData] = useState({ email: "", password: "", re_password: "" })

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
            const { email, password, re_password } = formData
            register({ email, password, re_password })
        }
    }

    return (
        <form onSubmit={handleSubmit} className={"register-form"}>
            <h1>{"Register"}</h1>
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
            <label htmlFor="re_password">{"retype password:"}</label>
            <input
                type="password"
                id="re_password"
                name="re_password"
                value={formData.re_password}
                onChange={handleChange}
                disabled={isLoading}
            />
            {rePasswordError && <h3>{rePasswordError}</h3>}
            <button disabled={isLoading || existError}>{"Register"}</button>
            {isLoading && <h4>{"loading..."}</h4>}
            {isError && <h4>{"Not registered"}</h4>}
        </form>
    )
}