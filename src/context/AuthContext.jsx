import { createContext, useState } from 'react'

const Context = createContext({})

const intialAuth = {
    refresh: window.sessionStorage.getItem('jwt_refresh') || '',
    access: window.sessionStorage.getItem('jwt_access') || '',
    user: JSON.parse(window.sessionStorage.getItem('user')) || {},
}

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(intialAuth)

    return (
        <Context.Provider value={{ auth, setAuth }}>
            {children}
        </Context.Provider>
    )
}

export default Context