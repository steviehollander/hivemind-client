import React from "react"

import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"

import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { NavBar } from "./Nav/NavBar"

export const HiveMind = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("hm_token")) {
                return <>
                    <Route>
                        <NavBar />
                        <ApplicationViews />
                    </Route>
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login">
            <Login />
        </Route>

        <Route path="/register">
            <Register />
        </Route>

    </>
)
