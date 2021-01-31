import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

function WatchedMovies() {
    return (
        <Container>
        <h4>Watched Movies</h4>
        <ListGroup variant='flush' style={{overflow:'auto', height:'30vh'}}>
            <ListGroup.Item>The Green Mile</ListGroup.Item>
            <ListGroup.Item>Sully</ListGroup.Item>
            <ListGroup.Item>Forrest Gump</ListGroup.Item>
            <ListGroup.Item>Big</ListGroup.Item>
            <ListGroup.Item>Captain Philips</ListGroup.Item>
            <ListGroup.Item>Forrest Gump</ListGroup.Item>
            <ListGroup.Item>Big</ListGroup.Item>
            <ListGroup.Item>Captain Philips</ListGroup.Item>
            <ListGroup.Item>Forrest Gump</ListGroup.Item>
            <ListGroup.Item>Big</ListGroup.Item>
            <ListGroup.Item>Captain Philips</ListGroup.Item>
            <ListGroup.Item>Forrest Gump</ListGroup.Item>
            <ListGroup.Item>Big</ListGroup.Item>
            <ListGroup.Item>Captain Philips</ListGroup.Item>
            <ListGroup.Item>Forrest Gump</ListGroup.Item>
            <ListGroup.Item>Big</ListGroup.Item>
            <ListGroup.Item>Captain Philips</ListGroup.Item>
        </ListGroup>
        </Container>
    )
}

export default WatchedMovies