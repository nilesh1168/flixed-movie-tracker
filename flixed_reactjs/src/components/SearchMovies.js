import Row from "react-bootstrap/Row";
import FormGroup from 'react-bootstrap/FormGroup'
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button'
const API_KEY = "98b08e"



function SearchMovies(props) {
    const addToWatchList = ()=>{
        let options = { 
            method: 'POST', 
            body : JSON.stringify(props.searchedMovie), 
            headers: {'Content-Type': 'application/json;charset=utf-8'},
        }
        let request = new Request('http://127.0.0.1:8000/movies/watch_list', options)
        fetch(request)
        .then(response => {
            if(response.status === 201)
                console.log("POST success!!")
        })
        .catch(error=>{
            props.handleError(error.message)
        })
        props.handleWatchListChange({"title":props.searchedMovie.title,"id":props.searchedMovie.id})
    }
    const addToWatchedList = ()=>{
        let options = { 
            method: 'POST', 
            body : JSON.stringify(props.searchedMovie), 
            headers: {'Content-Type': 'application/json;charset=utf-8'},
        }
        let request = new Request('http://127.0.0.1:8000/movies/watched', options)
        fetch(request)
        .then(response => {
            if(response.status === 201)
                console.log("POST success!!")
        })
        .catch(error=>{
            props.handleError(error.message)
        })
        props.handleWatchedListChange({"title":props.searchedMovie.title,"id":props.searchedMovie.id})
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
                var obj = {'id':data.imdbID,'title':data.Title,'genre':data.Genre,'rating':data.imdbRating,'year':data.Year,'runtime':data.Runtime.split(" ")[0]}
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
                            <Form.Control id='movie' as="textarea" readOnly value={props.searchedMovie.title === undefined?"":`Title: ${props.searchedMovie.title}\nGenre: ${props.searchedMovie.genre}\nRating: ${props.searchedMovie.rating}\nYear: ${props.searchedMovie.year}\nRuntime: ${props.searchedMovie.runtime} min`} rows={5} /> 
                        </Form.Group>
                        <Row>
                            <Container>
                                <p style={{color:"red"}}>{props.error}</p>
                            </Container>
                        </Row>
                        <Button variant="primary" onClick = {()=>addToWatchedList()} type="button">Add to Watched</Button>
                        <Button className='mx-3' onClick = {()=>addToWatchList()} variant="primary" type="button">Add to Watch List</Button>
                    </Container>
                </Row>
                <hr/>
            </Container>
            
        </Row>
    )
}



export default SearchMovies