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
                        <div className='card-purchases' >
                            <h6>Compra nº: {purchase.id} </h6>
                            <h6>Creada el: {purchase.createdAt}</h6>
                            <ListGroup.Item className='card-purchases-dos'>
                            {purchase?.cart.products.map(item => (
                            <Row> 
                                <Col> <b onClick={() => navigate(`/product/${item.id}`)}>{item.title}</b> </Col>
                                <Col> <p> {item.productsInCart?.quantity}</p> </Col>  
                                <Col> <h5>${item.price}</h5>   </Col> 
                            </Row>
                            ))}
                            </ListGroup.Item>
                        </div>
                    ))
                }
            </ListGroup>
        </div>
        )
};

export default Purchases;



