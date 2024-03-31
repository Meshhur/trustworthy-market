import React, { useState, useEffect, useContext } from 'react';
import { getBasketItems, removeItemFromBasket, clearBasket } from '../http/deviceAPI'; // Make sure to implement these functions in your API file
import { observer } from 'mobx-react-lite';
import { Context } from '../index.js';
import "../css/myBasket.css"
import { Container, Row, Col, Card, Button, ListGroup, ButtonGroup } from 'react-bootstrap';

const UsersBasket = observer(() => {
    const { user } = useContext(Context);
    const [items, setItems] = useState([]);
    const basketId = user.user.id;

    useEffect(() => {
        getBasketItems(basketId).then(setItems);
    }, [basketId]);

    const handleRemoveItem = async (itemId) => {
        await removeItemFromBasket(basketId, itemId);
        setItems(items.filter(item => item.id !== itemId));
        if (items.length < 2) {
            user.setIsBasket(false)
        }
    };

    const handleClearBasket = async () => {
        await clearBasket(basketId);
        user.setIsBasket(false)
        setItems([]);
    };

    // Calculate total price
    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

    return (
        <Container>
            <Row className='user-basket'>
                <Col>
                    <h2 className='totalHeading'>Basket ({items.length})</h2>
                    <Button variant="danger" onClick={handleClearBasket} className="mb-3">Clear Basket</Button>
                    <ListGroup>
                        {items.map(item => (
                            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                <img
                                    alt={item.name}
                                    src={`http://localhost:7000/${item.img}`}
                                    width={64}
                                    height={64}
                                    className="mr-3"
                                />
                                <div className="flex-fill">
                                    <h5>{item.name}</h5>
                                    <p className="mb-1">Price: ${item.price.toFixed(2)}</p>
                                </div>
                                <ButtonGroup>
                                    <Button variant="outline-danger" onClick={() => handleRemoveItem(item.id)}>Delete</Button>
                                </ButtonGroup>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col className='priceBasket' md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Basket Summary:</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Total Price: ${totalPrice.toFixed(2)}</ListGroup.Item>
                                <ListGroup.Item>Delivery: $0.00</ListGroup.Item>
                                <ListGroup.Item>Total: ${totalPrice.toFixed(2)}</ListGroup.Item>
                            </ListGroup>
                            <Button variant="success" block>Place Order</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
});

export default UsersBasket;
