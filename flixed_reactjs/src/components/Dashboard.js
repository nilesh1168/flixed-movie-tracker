import { Component } from "react";
import image from '../styles/images/No Movies Available.png'
import MovieItem from "./MovieItem";
// import { Col, Container, Row, Card, Stack } from "react-bootstrap";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            topFiveMovies: [],
            allWatchedMovies: []
        }
    }

    componentDidMount() {
        console.log("hello")
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
                    // console.log(data) // top 5 movies here store them and use for carausal: Array of Objects
                    this.setState({
                        topFiveMovies: data
                    })
                    // console.log(this.state.topFiveMovies);
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
                    // console.log(this.state.allWatchedMovies);
                })
                .catch(error => {
                    console.log(error.message)
                });

        }
    }

    imageUrl = (url) => {
        console.log(this.props.configs.images.secure_base_url + "original" + url)
        return this.props.configs.images.secure_base_url + "original" + url
    }

    emptyCarousal = () => {
        return (
            <div id="carouselExampleFade" className="carousel slide carousel-fade">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        {/* image size w = 1235 * h = 695 */}
                        {/* <img src={image} className="d-block w-100 img-fluid" alt="Image"/> */}
                    </div>
                </div>
            </div>
        )
    }

    topFiveCarousal = () => {
        return (
            <>
                <div id="topFiveWatchListcarousel" className="carousel slide carousel-fade" data-bs-ride='carousel'>
                    <div className="carousel-indicators">
                        {
                            this.state.topFiveMovies.map((movie, index) => {
                                if (index === 0) {
                                    return <button type="button" data-bs-target="#topFiveWatchListcarousel" data-bs-slide-to={index} className="active" aria-current="true" aria-label={index}></button>
                                }
                                else {
                                    return <button type="button" data-bs-target="#topFiveWatchListcarousel" data-bs-slide-to={index} aria-label={index}></button>
                                }
                            }
                            )
                        }
                    </div>
                    <div className="carousel-inner">
                        {
                            this.state.topFiveMovies.map((movie, index) => {
                                if (index === 0) {
                                    return (
                                        // <span>Hello from if</span>
                                        // console.log("inside if index == 0");
                                        <div className="carousel-item active">
                                            <img src={this.imageUrl(movie.backDropUrl)} className="d-block w-100" />
                                            <div className="carousel-caption d-none d-md-block" >
                                                <div className="card w-25">
                                                    <div className="card-body">
                                                        <img src={this.imageUrl(movie.imageUrl)} className="img-fluid" />

                                                    </div>
                                                    <div className="card-footer text-body-secondary">
                                                        <p>{movie.title}</p>
                                                        <p>{movie.rating}</p>
                                                        <p>{movie.release_date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        // <span>Hello from if</span>
                                        <div className="carousel-item">
                                            <img src={this.imageUrl(movie.backDropUrl)} className="d-block w-100" />
                                            <div className="carousel-caption d-none d-md-block" >
                                                <div className="card w-25">
                                                    <div className="card-body">
                                                        <img src={this.imageUrl(movie.imageUrl)} className="img-fluid" />
                                                    </div>
                                                    <div className="card-footer text-body-secondary">
                                                        <p>{movie.title}</p>
                                                        <p>{movie.rating}</p>
                                                        <p>{movie.release_date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#topFiveWatchListcarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#topFiveWatchListcarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="container mt-3 text-center">
                    <h3> You have not watched any movies yet!</h3>
                </div>
            </>
        )
    }

    emptyBanner = () => {
        return (
            <div className="container">
                <img src={image} className="d-block w-100 img-fluid" alt="Image" />
            </div>
        )
    }

    watchedMovieCards = () => {
        return (
            <div className="container">
                {/* use flexbox with horizontal alignment */}
                <div className="container mt-3 text-center">
                    <h3> You do not have a watchlist yet!</h3>
                </div>
                <div className="container">
                    <div className="accordion" id="movieAccordion">
                    {
                        this.state.allWatchedMovies.map((movie) => {
                            console.log(movie);
                            return (
                                <MovieItem key={movie.id} id={movie.id} type="movie" poster_path={movie.imageUrl} title={movie.title} release_date={movie.release_date} secure_base_url={this.props.configs.images.secure_base_url} image_size="original"/>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
        )
    }

    render() {
        // if both are empty return a banner giving message.
        if (this.state.allWatchedMovies.length === 0 && this.state.topFiveMovies.length === 0) {
            return this.emptyBanner()
        } else
            // if top 5 is empty return one carousal with message and viewed movies
            if (this.state.topFiveMovies.length === 0 && this.state.allWatchedMovies.length !== 0) {
                console.log("watchedMovies cards")
                return this.watchedMovieCards()
            }

            // if watched movies is emtpy return message and carousal
            else if (this.state.topFiveMovies.length !== 0 && this.state.allWatchedMovies.length === 0) {
                return this.topFiveCarousal()
            }
            // if both are not empty display both top 5 movvies carousal and watched movies cards
            else {
                return (
                    <>

                    </>
                )
            }
        // if (this.state.allWatchedMovies.length === 0) {
        //     return (
        //         <div className="container">
        //             Empty Watched Movies
        //         </div>
        //     )
        // }
        // if (this.state.allWatchedMovies.length !== 0) {
        //     <div className="container">

        //     </div>
        // }
        // if (this.state.topFiveMovies.length === 0) {
        //     return (
        //         <div className="container">
        //             Empty top five movies
        //         </div>
        //     )
        // }
        // else {
        //     return (
        //         this.topFiveCarousal()
        //     )
        // }
        // return(
        //     <div id="topFiveWatchListcarousel" className="carousel slide" data-bs-ride='carousel' >
        //         <div className="carousel-inner">
        //             <div className="carousel-item active">
        //                 <img src="https://image.tmdb.org/t/p/original/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg" className="d-block w-100" />
        //                 <div className="carousel-caption d-none d-md-block" >
        //                     <div class="card w-25">
        //                         <div class="card-body">
        //                             <img src="https://image.tmdb.org/t/p/original/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg" class="img-fluid" />
        //                         </div>
        //                         <div class="card-footer text-body-secondary">
        //                             <p>Avengers</p>
        //                             <p>7.0</p>
        //                             <p>2012</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="carousel-item">
        //                 <img src="https://image.tmdb.org/t/p/original/yMlv1bD2fIkTnaJBkrkfS4IYHzM.jpg" className="d-block w-100" />
        //                 <div className="carousel-caption d-none d-md-block">
        //                     <h5>Slide 02</h5>
        //                     <p>Alias, repudiandae illum maiores vitae dolores, soluta quasi commodi quas, ex dolorum impedit enim reprehenderit doloremque quos earum at saepe temporibus vero voluptatibus hic accusamus eos. Quis odio ex voluptate!</p>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="carousel-indicators">
        //             <button type="button" data-bs-target="#topFiveWatchListcarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        //             <button type="button" data-bs-target="#topFiveWatchListcarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        //         </div>
        //         <button className="carousel-control-prev" type="button" data-bs-target="#topFiveWatchListcarousel" data-bs-slide="prev">
        //             <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        //             <span className="visually-hidden">Previous</span>
        //         </button>
        //         <button className="carousel-control-next" type="button" data-bs-target="#topFiveWatchListcarousel" data-bs-slide="next">
        //             <span className="carousel-control-next-icon" aria-hidden="true"></span>
        //             <span className="visually-hidden">Next</span>
        //         </button>
        //     </div>
        // )



    }
}

export default Dashboard
