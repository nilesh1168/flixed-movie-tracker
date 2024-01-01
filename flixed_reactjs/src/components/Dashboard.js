import { Component } from "react";
import back_img1 from '../styles/images/image1.jpg'
// import { Col, Container, Row, Card, Stack } from "react-bootstrap";

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            topFiveMovies: [],
            allWatchedMovies: []
        }
    }

    componentDidMount() {
        var token = `${localStorage.getItem('token')}`
        // var user = jwt_decode(token).username

        if (token.length !== 0 || token !== "") {
            var options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: `Bearer ${token}`
                }
            }

            var getTopFiveMoviesRequest = new Request('http://127.0.0.1:8000/movies/watch_list/top_five', options)
            fetch(getTopFiveMoviesRequest).then(response => {
                if (response) {
                    return response.json()
                }
                else
                    throw new Error("Something went wrong!!")
            })
                .then((data) => {
                    console.log(data) // top 5 movies here store them and use for carausal: Array of Objects
                    this.setState({
                        topFiveMovies: data
                    })
                    console.log(this.state.topFiveMovies);
                })
                .catch(error => {
                    console.log(error.message)
                });

            var getWatchedMoviesRequest = new Request('http://127.0.0.1:8000/movies/watched', options)
            fetch(getWatchedMoviesRequest).then(response => {
                if (response) {
                    return response.json()
                }
                else
                    throw new Error("Something went wrong!!")
            })
                .then((data) => {
                    console.log(data) // top 5 movies here store them and use for carausal: Array of Objects
                    this.setState({
                        allWatchedMovies: data
                    })
                    console.log(this.state.allWatchedMovies);
                })
                .catch(error => {
                    console.log(error.message)
                });

        }
    }

    render() {
        return (
            <div>
                {/* <Carousel indicators={false}>
                    {
                        this.state.topFiveMovies.length === 0 ? <div>Empty</div> : this.state.topFiveMovies.map(movie => (

                            <Carousel.Item interval={3000}>
                                <img
                                    className="d-block w-100"
                                    src={back_img1}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>{movie.title}</h3>
                                    <p>{movie.genre}</p>
                                </Carousel.Caption>
                            </Carousel.Item>

                        ))
                    }
                </Carousel> */}
                <div className="container fluid">
                    <div className="row my-3">
                        <div className="col-md-8 text-center">
                            Watched Movies
                            <div class="d-flex flex-row bd-highlight my-3 px-5 flex-wrap">
                            {
                                this.state.allWatchedMovies.length === 0 ? <div>Empty</div> : this.state.allWatchedMovies.map(movie => (
                                    <div style={{ width: '18rem' , margin: 3}} className="card shadow p-3 mb-5 bg-white rounded" hover>
                                        <img className="card-img-top" src={back_img1} alt={movie.title}/>
                                        <div className="card-body">
                                            <h4 className="card-title">{movie.title}</h4>
                                             <p className="card-text">
                                                {movie.genre}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                        <div className="col-md-4 text-center">
                            Suggesttions
                            <div class="d-flex flex-row bd-highlight mb-3">
                                <div class="p-2 bd-highlight">Flex item 1</div>
                                <div class="p-2 bd-highlight">Flex item 2</div>
                                <div class="p-2 bd-highlight">Flex item 3</div>
                            </div>
                            {/* <Stack direction="horizontal" gap={3}>
                                <div className="p-2">First item</div>
                                <div className="p-2">Second item</div>
                                <div className="p-2">Third item</div>
                            </Stack> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
