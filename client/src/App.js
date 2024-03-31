import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from "./index.js";
import { check } from "./http/userAPI.js";
import { Spinner } from "react-bootstrap";
import Header from "./pages/Header.js";
import FixedNav from "./components/FixedNav.js";

const App = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
        }).finally(() => setLoading(false))
    }, [])
    if (loading) { return <Spinner animation={"grow"} /> }
    return (
        <BrowserRouter>
            <Header />
            <FixedNav />
            <AppRouter />
        </BrowserRouter>
    )
})

export default App;