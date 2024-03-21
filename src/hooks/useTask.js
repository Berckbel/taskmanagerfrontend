import { useCallback, useState } from "react"
import { useGlobalTask } from "./useTaskContext"
import { editTask } from "../services/editTask"
import { createTask } from "../services/createTask"
import { useGlobalAuth } from "./useAuthContext"
import { deleteTask } from "../services/deleteTask"
import { useLocation } from "wouter"

export const useTask = () => {
    const [_, setLocation] = useLocation();
    const { auth } = useGlobalAuth()
    const { tasks, setTasks } = useGlobalTask()
    const [state, setState] = useState({ loading: false, error: false })

    const selectTask = useCallback(({ task }) => {
        window.sessionStorage.setItem('selectedTask', JSON.stringify(task))
        setTasks(prev => ({ ...prev, selectedTask: task }))
        setLocation("/edit")
    })

    const editTaskById = useCallback(({ task_id, title, description, is_finished }) => {
        setState(prev => ({ ...prev, loading: true, error: false }))
        editTask({ task_id, title, description, is_finished, access: auth.access })
            .then(updatedTask => {
                window.sessionStorage.setItem('selectedTask', JSON.stringify(updatedTask))
                setTasks(prev => {
                    const taskIndex = prev.data.findIndex(task => task.id === updatedTask.id);
                    const newData = [...prev.data];
                    newData[taskIndex] = updatedTask;
                    window.sessionStorage.setItem('tasks', JSON.stringify(newData));
                    return { ...prev, data: newData, selectedTask: updatedTask };
                })

                setLocation("/")
            })
            .catch(err => setState(prev => ({ ...prev, error: true })))
            .finally(() => setState(prev => ({ ...prev, loading: false })))
    })

    const createNewTask = useCallback(({ title, description, is_finished }) => {
        setState(prev => ({ ...prev, loading: true, error: false }))
        createTask({ title, description, is_finished, access: auth.access })
            .then(newTask => {
                const sessionTasks = JSON.parse(window.sessionStorage.getItem('tasks'))
                window.sessionStorage.setItem('tasks', JSON.stringify([...sessionTasks, newTask]))
                setTasks(prev => ({ ...prev, data: [...prev.data, newTask] }))

                setLocation("/")

            })
            .catch(err => setState(prev => ({ ...prev, error: true })))
            .finally(() => setState(prev => ({ ...prev, loading: false })))
    })

    const deleteTaskById = useCallback(({ task_id }) => {
        setState(prev => ({ ...prev, loading: true, error: false }))
        deleteTask({ task_id, access: auth.access })
            .then(deletedTask => {
                setTasks(prev => {
                    const newTasks = prev.data.filter(task => task.id !== task_id)
                    window.sessionStorage.setItem('tasks', JSON.stringify(newTasks))
                    return { ...prev, data: newTasks }
                })
            })
            .catch(err => setState(prev => ({ ...prev, error: true })))
            .finally(() => setState(prev => ({ ...prev, loading: false })))
    })

    const createNewTaskGuest = useCallback(({ newTask }) => {
        const sessionTasks = JSON.parse(window.sessionStorage.getItem('tasks')) || []
        window.sessionStorage.setItem('tasks', JSON.stringify([...sessionTasks, newTask]))
        setTasks(prev => ({ ...prev, data: [...prev.data, newTask] }))

        setLocation("/")
    })

    const editTaskGuest = useCallback(({ updatedTask, taskIndex }) => {
        window.sessionStorage.setItem('selectedTask', JSON.stringify(updatedTask))
        setTasks(prev => {
            const newData = [...prev.data];
            newData[taskIndex] = updatedTask;
            window.sessionStorage.setItem('tasks', JSON.stringify(newData));
            return { ...prev, data: newData, selectedTask: updatedTask };
        })
        setLocation("/")
    })

    const deleteTaskGuest = useCallback(({ taskIndex }) => {

        setTasks(prev => {
            const newTasks = prev.data.filter((task, index) => index !== taskIndex)
            window.sessionStorage.setItem('tasks', JSON.stringify(newTasks))
            return { ...prev, data: newTasks }
        })
    })

    return {
        tasks: tasks.data,
        existTask: tasks.data.length,
        selectedTask: tasks.selectedTask,
        isLoading: state.loading,
        isError: state.error,
        selectTask,
        editTaskById,
        createNewTask,
        deleteTaskById,

        createNewTaskGuest,
        editTaskGuest,
        deleteTaskGuest,
    }
}