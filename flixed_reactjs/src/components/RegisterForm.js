import { Container, Row, Col, Card, Form, Button } from "react-bootstrap"
import React from 'react';

class RegisterForm extends React.Component{
    state = {
        username: '',
        password: '',
        confirm_password:''
    };

    handle_change = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };
    render(){
        return (
            <Container>
                <Row>
                    <Col className="my-5 ml-auto col-md-4">
                        <Card>
                            <Card.Body>
                                <Card.Title className='text-center my-3'>Sign Up</Card.Title>
                                <Card.Text>
                                    <Form>
                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control name="username" value={this.state.username}
                                                onChange={this.handle_change} type="text" placeholder="Username" />
                                        </Form.Group>
    
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control name="password" value={this.state.password}
                                                onChange={this.handle_change} type="password" placeholder="Password" />
                                        </Form.Group>
    
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control name="confirm_password" value={this.state.confirm_password}
                                                onChange={this.handle_change} type="password" placeholder="Confirm Password" />
                                        </Form.Group>
    
                                        <Button className='my-4 mx-auto d-block' variant="primary" type="submit">Submit</Button>
                                    </Form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
    
}

export default RegisterForm;