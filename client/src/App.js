import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from "./index.js";
import { check } from "./http/userAPI.js";
import { Spinner } from "react-bootstrap";
import Header from "./pages/Header.js";
import FixedNav from "./components/FixedNav.js";
import { REGISTRATION_ROUTE } from "./utils/consts.js";
import { jwtDecode } from "jwt-decode";

const App = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        check().then(res => {
            if (res.status > 205) {
                localStorage.removeItem("token")
                navigate(REGISTRATION_ROUTE)
            } else {
                user.setUser(jwtDecode(res.data.token))
                user.setIsAuth(true)
                localStorage.setItem("token", res.data.token)
            }
        }).finally(() => setLoading(false))
    }, [])
    if (!user) {
        return navigate(REGISTRATION_ROUTE)
    }
    if (loading) { return <Spinner animation={"grow"} /> }
    return (
        <>
            <Header />
            <FixedNav />
            <AppRouter />
        </>
    )
})

export default App;