import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import { useSelector } from 'react-redux';
import { ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
                    purchases[0]?.cart?.products.map(purchase => (
                        <ListGroup.Item onClick={() => navigate(`/product/${purchases.cart.id}`)}>
                           <Row> 
                                 
                                    {purchase.title}
                            
                                <br />
                                
                                <b>Price: </b> llaves
                                
                            </Row>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
        </div>
        )
};

export default Purchases;