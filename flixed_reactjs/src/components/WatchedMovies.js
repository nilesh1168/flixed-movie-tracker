import Container from 'react-bootstrap/Container'
import ListGroup from 'react-bootstrap/ListGroup'

function WatchedMovies(props) {
    return (
        <Container>
        <h4>This week's Watched Movies</h4>
        <ListGroup variant='flush' style={{overflow:'auto', height:'30vh'}}>
            {
                
                props.watchedList.length === 0 ? <ListGroup.Item>Empty</ListGroup.Item> : props.watchedList.map(movie=>(
                    <ListGroup.Item key={movie.id} >{movie.title}</ListGroup.Item>
                ))  
                
            }
        </ListGroup>
        </Container>
    )
}

export default WatchedMovies