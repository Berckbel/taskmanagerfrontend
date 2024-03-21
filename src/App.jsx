import './App.css'
import { Redirect, Route } from "wouter"
import { Home } from "./pages/Home/Home"
import { Login } from "./pages/Login/Login"
import { Register } from "./pages/Register/Register"
import { Navbar } from './components/Navbar/Navbar'
import { useUser } from './hooks/useUser'
import { EditTask } from './pages/EditTask/EditTask'
import { CreateTask } from './pages/CreateTask/CreateTask'
import { HomeGuest } from './pages/HomeGuest/HomeGuest'
import { CreateTaskGuest } from './pages/CreateTaskGuest/CreateTaskGuest'
import { EditTaskGuest } from './pages/EditTaskGuest/EditTaskGuest'

function App() {
  const { isLogged } = useUser()

  return (
    <>
      <Navbar />
      <main>

        {isLogged && <Route component={Home} path={"/"} />}
        {!isLogged && <Route component={HomeGuest} path={"/"} />}

        {isLogged && <Route component={EditTask} path={"/edit"} />}
        {!isLogged && <Route component={EditTaskGuest} path={"/edit"} />}

        {isLogged && <Route component={CreateTask} path={"/create"} />}
        {!isLogged && <Route component={CreateTaskGuest} path={"/create"} />}

        {!isLogged && <Route component={Login} path={"/login"} />}
        {!isLogged && <Route component={Register} path={"/register"} />}
      </main>
    </>
  )
}

export default App
