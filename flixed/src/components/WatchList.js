import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'

function WatchList() {
    return (
        <Container>
        <h4>Watch List</h4>
        <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Control as="select" multiple>
                <option value='The Green Mile'>The Green Mile</option>
                <option value='Sully'>Sully</option>
                <option value='Forrest Gump'>Forrest Gump</option>
                <option value='Big'>Big</option>
                <option value='Captain Philips'>Captain Philips</option>
            </Form.Control>
        </Form.Group>
        </Container>
    )
}

export default WatchList