import { Link } from "wouter"
import { useUser } from "../../hooks/useUser"

export const Navbar = () => {

    const { isLogged, logout } = useUser()

    return (
        <nav>
            <Link to={"/"} ><h3>{"Home"}</h3></Link>
            {<Link to={"/create"} ><h3>{"New Task"}</h3></Link>}
            {!isLogged && <Link to={"/login"} ><h3>{"Login"}</h3></Link>}
            {!isLogged && <Link to={"/register"} ><h3>{"Register"}</h3></Link>}
            {isLogged && <a onClick={() => logout()}><h3>{"Logout"}</h3></a>}
        </nav>
    )
}