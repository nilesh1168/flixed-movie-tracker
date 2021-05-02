import React from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
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

    render() {
        return (
            <Container>
                <Row>
                    <Col className="my-5 ml-auto col-md-4"><Card>
                        <Card.Body>
                            <Card.Title className='text-center my-3'>Log In</Card.Title>
                            <Card.Text>
                                <Form onSubmit={e => this.props.handle_login(e, this.state)} method="post">
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
                                    <Button className='my-4 mx-auto d-block' variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card></Col>
                </Row>
            </Container>
        );
    }
}

export default LoginForm;