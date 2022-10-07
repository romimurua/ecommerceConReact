import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cart.slice';


const ProductDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const productsList = useSelector(state => state.newproducts);
    const [ quantily, setQuantily ] = useState(1);

    const productDetail = productsList?.find(
        newproducts => newproducts.id === Number(id))
    const relatedProducts = productsList.filter(
        newproducts => newproducts.category.id === productDetail?.category.id)

    useEffect(() => {
        setQuantily(1)
    }, [id])

    const addCart = () => {
        alert ("quantily: " + quantily)
        const product = {
            id: id,
            quantity: quantily
        }
        dispatch(addCartThunk(product))
;    }

    return (
        <Row>
            <Col>
            <h1>{productDetail?.title}</h1>
            <h3>PRICE: {productDetail?.price} USD</h3>
            <div className='rate'>
                <Button className= 'me-3' onClick={() => setQuantily(quantily-1)}>-</Button>
                {quantily}
                <Button className= 'm-1' onClick={() => setQuantily(quantily+1)}>+</Button>
                <br />
                <Button onClick={(addCart)}>Add to cart</Button>
            </div>
            <img className="img-fluid" src={productDetail?.productImgs} alt="" />
            <p>{productDetail?.description}</p>
            </Col>

            <Col lg={3}>
                <ListGroup variant="flush">
                {
                    relatedProducts.map(newproducts => (
                        <ListGroup.Item key={newproducts.id}>
                            <Link to={`/product/${newproducts.id}`}>{newproducts.title}</Link>
                            <img className="img-fluid" src={newproducts?.productImgs} alt=""/>
                        </ListGroup.Item>
                    ))
                }
                </ListGroup>
            </Col>
        </Row>
    );
};

export default ProductDetail;