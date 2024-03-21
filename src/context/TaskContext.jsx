import { createContext, useState } from 'react'

const Context = createContext({})

const intialValue = {
    data: JSON.parse(window.sessionStorage.getItem('tasks')) || [],
    selectedTask: JSON.parse(window.sessionStorage.getItem('selectedTask')) || {},
    selectedIndex: JSON.parse(window.sessionStorage.getItem('selectedTask')) || 0,
}

export const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState(intialValue)

    return (
        <Context.Provider value={{ tasks, setTasks }}>
            {children}
        </Context.Provider>
    )
}

export default Context