import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { useHistory } from "react-router-dom"


export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">

            <li className="nav-item">
                <Link className="button" to="/events">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="button" to="/events/myevents">My Events</Link>
            </li>
            {
                (localStorage.getItem("hm_token") !== null) ?
                    <li className="nav-item">
                        <Link className="button"
                            onClick={() => {
                                localStorage.removeItem("hm_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</Link>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>


                    </>
            }        </ul>
    )
}
