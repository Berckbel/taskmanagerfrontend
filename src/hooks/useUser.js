import { useCallback, useState } from 'react'
import { useGlobalAuth } from '../hooks/useAuthContext'
import { createToken } from '../services/createToken'
import { getUser } from '../services/getUser'
import { useGlobalTask } from './useTaskContext'
import { getUserTasks } from '../services/getUserTasks'
import { createUser } from '../services/createUser'
import { useLocation } from 'wouter'

export const useUser = () => {
    const [_, setLocation] = useLocation();
    const { setTasks } = useGlobalTask()
    const { auth, setAuth } = useGlobalAuth()
    const [state, setState] = useState({ loading: false, error: false })

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('jwt_refresh')
        window.sessionStorage.removeItem('jwt_access')
        window.sessionStorage.removeItem('user')
        setAuth({ refresh: "", access: "", user: {} })

        window.sessionStorage.removeItem('tasks')
        setTasks({ data: [], selectedTask: {} })
        setLocation("/")
    })

    const register = useCallback(({ email, password, re_password }) => {
        setState(prev => ({ ...prev, loading: true, error: false }))
        createUser({ email, password, re_password })
            .then(() => { })
            .catch(err => setState(prev => ({ ...prev, error: true })))
            .finally(() => setState(prev => ({ ...prev, loading: false })))
    })

    const login = useCallback(({ email, password }) => {
        setState(prev => ({ ...prev, loading: true, error: false }))
        createToken({ email, password })
            .then(tokens => {

                window.sessionStorage.setItem('jwt_refresh', tokens.refresh)
                window.sessionStorage.setItem('jwt_access', tokens.access)
                setAuth(prev => {
                    return {
                        ...prev,
                        refresh: tokens.refresh,
                        access: tokens.access,
                    }
                })

                getUserTasks({ access: tokens.access })
                    .then(tasks => {
                        window.sessionStorage.setItem('tasks', JSON.stringify(tasks))
                        setTasks(prev => ({ ...prev, data: tasks }))
                    })
                    .catch(err => setState(prev => ({ ...prev, error: true })))

                getUser({ access: tokens.access })
                    .then(user => {
                        window.sessionStorage.setItem('user', JSON.stringify(user))
                        setAuth(prev => ({ ...prev, user }))
                    })
                    .catch(err => setState(prev => ({ ...prev, error: true })))

                setLocation("/")
            })
            .catch(err => setState(prev => ({ ...prev, error: true })))
            .finally(() => setState(prev => ({ ...prev, loading: false })))
    })

    return {
        isLogged: Boolean(auth.access),
        isLoading: state.loading,
        isError: state.error,
        logout,
        login,
        register,
    }
}