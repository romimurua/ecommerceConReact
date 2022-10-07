import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ListGroup, Row, Col } from 'react-bootstrap';



const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const purchases = useSelector(state => state.purchases);

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])

    return (
        <div>
            <h1>Purchases</h1>
            

            
            <ListGroup>
                {
                    purchases.map(purchase => (
                        <ListGroup.Item>
                            Compra nº: {purchase.id}
                            Creeada el: {purchase.createdAt}
                            <ListGroup.Item>
                            {purchase?.cart.products.map(item => (
                            <Row> 
                                <Col> <b onClick={() => navigate(`/product/${item.id}`)}>{item.title}</b> </Col>
                                <Col> <h4>{item.productsInCart?.quantity}</h4> </Col>  
                                <Col> <h3>Price: {item.price}</h3>   </Col> 
                            </Row>
                            ))}
                            </ListGroup.Item>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
        )
};

export default Purchases;



