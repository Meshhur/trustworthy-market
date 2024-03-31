import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI.js'
import { observer } from 'mobx-react-lite'
import { Context } from '../index.js'

const Auth = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const click = async (email, password) => {
        try {
            var authData;
            if (isLogin) {
                authData = await login(email, password)
            } else {
                authData = await registration(email, password)
            }
            user.setUser(authData)
            user.setIsAuth(true)
            setEmail("")
            setPassword("")
            navigate(SHOP_ROUTE)
        } catch (error) {
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert("An unexpected error occurred");
            }
        }
    }

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ height: window.innerHeight - 54 }}>
            <Card style={{ width: 600 }} className='p-5'>
                <h2 className='m-auto'>{isLogin ? "Authorization" : "Sign up"}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder='Enter email...'
                        autoComplete='username'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Enter password...'
                        type='password'
                        autoComplete='current-password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form>
                <Row className='d-flex mt-3 px-3 justify-content-between'>
                    {isLogin ?
                        <div>
                            Don't have an account yet? <NavLink to={REGISTRATION_ROUTE}>Sign up</NavLink>
                        </div>
                        :
                        <div>
                            Already signed in? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                        </div>
                    }
                    <Button className='mt-3' variant="outline-success" onClick={() => click(email, password)}>
                        {isLogin ? "Login" : "Sign up"}
                    </Button>
                </Row>
            </Card>
        </Container>
    )
})

export default Auth