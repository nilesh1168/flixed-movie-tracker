import Row from "react-bootstrap/Row";
import FormGroup from 'react-bootstrap/FormGroup'
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
function SearchMovies() {
    return (
        <Row>
            <Container>
                <Row className='my-3'>
                    <Container>
                        <FormGroup>
                            <Form.Control type="text" placeholder="Enter Movie Name" />
                        </FormGroup>
                        <Button variant="primary" type="button">Search</Button>
                    </Container>
                </Row>
                <Row className='my-3'>
                    <Container>
                        <Form.Group>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <Button variant="primary" type="button">Add to Watched</Button>
                        <Button className='mx-3' variant="primary" type="button">Add to Watch List</Button>
                    </Container>
                </Row>
                <hr/>
            </Container>
            
        </Row>
    )
}

export default SearchMovies