import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, InputGroup, FormControl, ListGroup, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

const Home = () => {
    
  const  navigate = useNavigate();
  const productsList = useSelector((state) => state.newproducts);
  const [ categories, setCategories ] = useState([]);
  const [ productsFiltered, setProductsFiltered ] = useState([]);
  const [ searchValue, setSearchValue ] = useState("");

  useEffect (() => {
    axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
      .then(res => setCategories(res.data.data.categories))
  }, [])


  useEffect(() => {
    setProductsFiltered(productsList)
  }, [productsList])
  
  const filterCategory = (categoryId) => {
    const filtered = productsList.filter(newproducts => 
      newproducts.category.id === categoryId)

    setProductsFiltered(filtered); 
    
  }
 
  const searchProducts = () => {
    
    const filtered = productsList.filter(newproducts =>
      newproducts.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    setProductsFiltered(filtered)
  }
  
  return (
        
        <Row>
          <h4>Category</h4>
          <Col lg={3}>
          <ListGroup>
              {
                  categories?.map(category => (
                    <ListGroup.Item 
                    key={category.id} 
                    onClick={() => filterCategory(category.id)}
                    style={{cursor: "pointer"}}>
                        {category.name}
                    </ListGroup.Item>
                ))
              }
          </ListGroup>
            
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Whats are you lokking for?"
                onChange={e => setSearchValue(e.target.value)}
                value={searchValue}
              />
              <Button variant="outline-secondary" onClick={searchProducts}>
                Button
              </Button>
            </InputGroup>
            <Row xs={1} md={2} xl={3} className="g-4">
                {productsFiltered.map(newproducts => (
                  <Col key={newproducts.id}>
                    <Card onClick={() => navigate(`/product/${newproducts.id}`)} style={{height: "100%"}}>
                      <Card.Img variant="top" src={newproducts.productImgs?.[1]}/>
                      <Card.Body>
                        <Card.Title>{newproducts.title}</Card.Title>
                        <Card.Text>Price: {newproducts.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>
          </Col>
        </Row>
    );
};

export default Home;

