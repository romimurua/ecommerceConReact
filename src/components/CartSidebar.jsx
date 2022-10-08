import React, { useEffect } from 'react';
import { Button, ListGroup, ListGroupItem, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';
import { Link } from 'react-router-dom';
import { purchasesCartThunk } from '../store/slices/cart.slice';


const CartSidebar = ({show, handleClose}) => {

    const dispatch = useDispatch();
    const cart = useSelector( state => state.cart);

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>My purchases</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <ListGroup>
                {cart.map(item => (
                    <ListGroupItem key={item.id}>
                        <h6>{item.brand}</h6>
                        <Link to={`/product/${item.id}`}>{item.title}</Link>
                        <p>{item.productsInCart.quantity}</p>
                        <p>Price: {item.price} USD</p>
                    </ListGroupItem>
                ))
                }
            </ListGroup>
            <Button onClick={() => dispatch (purchasesCartThunk())}>Checkout</Button>
        </Offcanvas.Body>
      </Offcanvas>
    );
};

export default CartSidebar;