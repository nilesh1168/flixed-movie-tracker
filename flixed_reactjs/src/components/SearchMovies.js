import Row from "react-bootstrap/Row";
import FormGroup from 'react-bootstrap/FormGroup'
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
const API_KEY = "98b08e"



function SearchMovies(props) {
    const addToWatch = ()=>{
        props.handleWatchListChange(props.searchedMovie.Title)
    }
    const addToWatched = ()=>{
        props.handleWatchedListChange(props.searchedMovie.Title)
    }
    const searchMovie= ()=>{
        fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${document.getElementById('movie_name').value}`)
        .then(response => {
            if(response.ok)
                return response.json()
            else{
                  if(response.status === 401)
                        throw new Error("Unauthorized Access")
                }
            })
        .then((data) => {
            if(data.Error === undefined){
                var obj = {'id':data.imdbID,'Title':data.Title,'Genre':data.Genre,'Rating':data.imdbRating,'Year':data.Year}
                props.handleSearchedMovie(obj)
            }
            else
                props.handleError(data.Error)
            
        })
        .catch(error =>{
            props.handleError(error.message)
        })
    }

    return (
        <Row>
            <Container>
                <Row className='my-3'>
                    <Container>
                        <FormGroup>
                            <Form.Control id="movie_name" type="text" placeholder="Enter Movie Name" />
                        </FormGroup>
                        <Button variant="primary" onClick={()=> searchMovie() } type="button">Search</Button>
                    </Container>
                </Row>
                <Row className='my-3'>
                    <Container>
                        <Form.Group>
                            <Form.Control id='movie' as="textarea" readOnly value={props.searchedMovie.Title === undefined?"":`Title: ${props.searchedMovie.Title}\nGenre: ${props.searchedMovie.Genre}\nRating: ${props.searchedMovie.Rating}\nYear: ${props.searchedMovie.Year}`} rows={4} /> 
                        </Form.Group>
                        <Row>
                            <Container>
                                <p style={{color:"red"}}>{props.error}</p>
                            </Container>
                        </Row>
                        <Button variant="primary" onClick = {()=>addToWatched()} type="button">Add to Watched</Button>
                        <Button className='mx-3' onClick = {()=>addToWatch()} variant="primary" type="button">Add to Watch List</Button>
                    </Container>
                </Row>
                <hr/>
            </Container>
            
        </Row>
    )
}



export default SearchMovies