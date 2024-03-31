import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Context } from '../index.js';
import { NavLink } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/consts.js';
import { Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import logo from "../assets/logo-transparent-png.png"

const NavBar = observer(() => {

    return (
        <Navbar className='navbar'>
            <Container>
                <NavLink className="navlink" to={SHOP_ROUTE} >
                    <div>
                        <div className='logo'>
                            <img className="logo-img" src={logo} />
                            <span>trustworthy</span>
                        </div>
                        <span className='market'>market</span>
                    </div>
                </NavLink>
                <Nav style={{ color: 'white' }}>
                    <Button className='location'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M 12 12 C 10.9 12 10 11.1 10 10 C 10 8.9 10.9 8 12 8 C 13.1 8 14 8.9 14 10 C 14 11.1 13.1 12 12 12 Z M 18 10.2 C 18 6.57 15.35 4 12 4 C 8.65 4 6 6.57 6 10.2 C 6 12.54 7.95 15.64 12 19.34 C 16.05 15.64 18 12.54 18 10.2 Z M 12 2 C 16.2 2 20 5.22 20 10.2 C 20 13.52 17.33 17.45 12 22 C 6.67 17.45 4 13.52 4 10.2 C 4 5.22 7.8 2 12 2 Z" fill="currentColor"></path></svg>
                        Seattle
                    </Button>
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;