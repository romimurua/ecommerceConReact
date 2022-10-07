import React from 'react';
import { Row, Col, ListGroup} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = () => {

    const { id } = useParams();

    const productsList = useSelector(state => state.newproducts);

    const productDetail = productsList?.find(
        newproducts => newproducts.id === Number(id))
    const relatedProducts = productsList.filter(
        newproducts => newproducts.category.id === productDetail.category.id)


    return (
        <Row>
            <Col>
            <h1>{productDetail?.title}</h1>
            <h3>PRICE: {productDetail?.price} USD</h3>
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