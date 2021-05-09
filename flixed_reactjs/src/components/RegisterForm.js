import { Container, Row, Col, Card, Form, Button, FormGroup, FormLabel } from "react-bootstrap"
import React from 'react';

class RegisterForm extends React.Component {
    state = {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        confirm_password: '',
        error: ''
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

    validate(e) {
        this.setState({
            error: ""
        })
        if (this.state.password === this.state.confirm_password) {
            var data = {
                "email": this.state.email,
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "username": this.state.username,
                "password": this.state.password,

            }
            console.log(e, data)
            this.props.handle_signup(e, data)
        }
        else {
            this.setState({
                error: "Password's do not match!!"
            })
        }
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="my-5 ml-auto col-md-8">
                        <Card>
                            <Card.Body>
                                <Card.Title className='text-center my-3'>Sign Up</Card.Title>
                                <Card.Text>
                                    <Form>
                                        <Row>
                                            <Col className="col-md-6">
                                                <Form.Group controlId="formBasicUsername">
                                                    <Form.Label>Username</Form.Label>
                                                    <Form.Control name="username" value={this.state.username}
                                                        onChange={this.handle_change} type="text" placeholder="Username" />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicFName">
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control name="first_name" value={this.state.first_name}
                                                        onChange={this.handle_change} type="text" placeholder="First Name" />
                                                </Form.Group>
                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Password</Form.Label>
                                                    <Form.Control name="password" value={this.state.password}
                                                        onChange={this.handle_change} type="password" placeholder="Password" />
                                                </Form.Group>
                                            </Col>
                                            <Col className="col-md-6">
                                                <Form.Group controlId="formBasicEmail">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control name="email" value={this.state.email}
                                                        onChange={this.handle_change} type="text" placeholder="Email" />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicFName">
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control name="last_name" value={this.state.last_name}
                                                        onChange={this.handle_change} type="text" placeholder="Last Name" />
                                                </Form.Group>

                                                <Form.Group controlId="formBasicPassword">
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <Form.Control name="confirm_password" value={this.state.confirm_password}
                                                        onChange={this.handle_change} type="password" placeholder="Confirm Password" />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        
                                        <FormGroup className="text-center">
                                            <FormLabel><p style={{ color: "red" }}>{this.state.error}</p></FormLabel>
                                        </FormGroup>

                                        <Button className='my-4 mx-auto d-block' variant="primary" onClick={e => this.validate(e)}>Submit</Button>
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