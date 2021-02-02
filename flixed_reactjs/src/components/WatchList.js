import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Movie from './Movie'

function WatchList(props) {
    return (
        <Container>
            <h4>Watch List</h4>
            <Form.Group controlId="exampleForm.ControlSelect2">
                <Form.Control as="select" multiple>
                    {
                        props.watchList.length === 0 ? <Movie movieName="Empty"></Movie> : props.watchList.map((movie) =>(
                            <Movie movieName={movie}></Movie>
                        ))
                    }
                </Form.Control>
            </Form.Group>
        </Container>
    )
}

export default WatchList