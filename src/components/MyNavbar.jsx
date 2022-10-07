import React from 'react';
import {Navbar, Container, Nav, Offcanvas} from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import CartSidebar from './CartSidebar';

const MyNavbar = () => {

    const navigate = useNavigate();

    const logout = () => {
      localStorage.setItem("token", "");
      navigate("/login")
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <> 
        <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand to="/" as={Link}>e-commerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link to="/login" as={Link}>Login</Nav.Link>
            <Nav.Link to="/purchases" as={Link}>Purchases</Nav.Link>
            <Nav.Link onClick={handleShow}>Cart</Nav.Link>
            <Nav.Link onClick={logout} >Logout</Nav.Link>
          </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>

      <CartSidebar show={show} handleClose={handleClose}/>
      </>
    );
};

export default MyNavbar;