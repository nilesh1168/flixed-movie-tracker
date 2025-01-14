import { Component } from "react";
import image from '../styles/images/No Movies Available.png'
import MovieItem from "./MovieItem";
import { isEqual } from "lodash";
import { Toast } from 'bootstrap/dist/js/bootstrap'
// import { Col, Container, Row, Card, Stack } from "react-bootstrap";
import WatchList from "./WatchList"
import TMDB_Configuration from "../utils/config";
import Constants from "../utils/constants";
import Util from "../utils/util";
import { Carousel } from 'react-bootstrap';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalPages: 1,
            topFiveMovies: [],
            allWatchedMovies: [],
            results: false,
            next: null,
            prev: null,
            curr: `${props.configs.base_url}/movies/watched?page=${props.configs.default_page_number}`,
            btnClicked: false,
            toastMsg: "",
            // toast: {
            //     trigger: false,
            //     message: ""
            // },
        }
        this.incrementPage = this.incrementPage.bind(this);
        this.decrementPage = this.decrementPage.bind(this);
        // this.handleWatchListAdd = this.handleWatchListAdd.bind(this);
        this.handleWatchedListAdd = this.handleWatchedListAdd.bind(this);
        this.handleWatchListDelete = this.handleWatchListDelete.bind(this);
        this.incrementWatchCount = this.incrementWatchCount.bind(this);
        // this.toast = this.toast.bind(this)
    }

    incrementWatchCount(movieId) {
        var url = `${this.props.configs.base_url}/movies/watched/` + movieId + '/'
        var options = Util.getRequestOptions('PUT')
        var incrementWatchedCountRequest = new Request(url, options)
        fetch(incrementWatchedCountRequest).then(response => {
            if (response.status === 200) {
                console.log("Success")
                // this.setState({
                //     toast: {
                //         trigger: true,
                //         message: "Success, You have watched this movie one more time!"
                //     }
                // })
                this.toast("Success, You have watched this movie one more time!")
                this.getWatchedMovies()  // need to think how I can update only one movie with the incremented watch count
            }
        })
            .catch(error => {
                console.log(error);
            })
    }


    // handleWatchListAdd(watchMovie) {
    //     this.setState(
    //         {
    //             watchList: [...this.state.watchList, watchMovie]
    //         }
    //     )
    // }

    handleWatchListDelete(watchMovieIds) {
        watchMovieIds.forEach(delmovie => {
            this.state.topFiveMovies.map((movie, index) => (
                isEqual(JSON.stringify(delmovie.id), JSON.stringify(movie.id)) ? this.state.topFiveMovies.splice(index, 1) : console.log("false")
            ))
        });
        this.setState({
            topFiveMovies: this.state.topFiveMovies,
            // toast: {
            //     trigger: true,
            //     message: "Success, You have removed this movie from the WatchList!"
            // }
        })
        this.toast("Success, You have removed this movie from the WatchList!")
    }

    handleWatchedListAdd(watchedMovie) {
        this.setState(
            {
                allWatchedMovies: this.state.allWatchedMovies.concat(watchedMovie),
                // toast: {
                //     trigger: true,
                //     message: "Success, You have added this movie to the Watched list!"
                // }
            }
        )
        this.toast("Success, You have added this movie to the Watched list!")
    }

    getWatchedMovies() {
        var options = Util.getRequestOptions('GET')
        var url = this.state.curr
        var getWatchedMoviesRequest = new Request(url, options)
        fetch(getWatchedMoviesRequest).then(response => {
            if (response) {
                return response.json()
            }
            else
                throw new Error("Something went wrong!!")
        })
            .then((data) => {
                console.log(data.count) // top 5 movies here store them and use for carausal: Array of Objects
                console.log(data)
                this.setState({
                    allWatchedMovies: data.results,
                    totalPages: Math.ceil(data.count / TMDB_Configuration.CONFIGS.number_of_records_per_page),
                    results: true,
                    next: data.next,
                    prev: data.previous !== undefined ? data.previous : null
                })
                // console.log(this.state.allWatchedMovies);
            })
            .catch(error => {
                console.log(error.message)
            });
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log(this.state.btnClicked)
        if (this.state.btnClicked && (this.state.curr !== prevState.curr)) {
            console.log("hello")
            this.getWatchedMovies()
        }
    }

    incrementPage(e) {
        console.log(this.state.next + "increment page")
        this.setState({
            btnClicked: true,
            curr: this.state.next,
            prev: this.state.curr,
            currentPage: this.state.currentPage + 1
        })
        // console.log(this.state.curr)
        // console.log(this.state.prev)
    }

    decrementPage = () => {
        this.setState({
            btnClicked: true,
            curr: this.state.prev,
            next: this.state.curr,
            currentPage: this.state.currentPage - 1
        })
    }

    componentDidMount() {
        var token = Util.getToken()
        // var user = jwt_decode(token).username

        if (token.length !== 0 || token !== "") {
            var options = Util.getRequestOptions('GET')

            var getTopFiveMoviesRequest = new Request(`${this.props.configs.base_url}/movies/watch_list/top_five`, options)
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
            this.getWatchedMovies()
        }
    }


    // topFiveCarousal = () => {
    //     return (
    //         <>
    //             <div id="topFiveWatchListcarousel" className="carousel slide" data-bs-ride="carousel">
    //                 <div className="carousel-indicators">
    //                     {
    //                         this.state.topFiveMovies.map((movie, index) => {
    //                             if (index === 0) {
    //                                 return <button key={index} type="button" data-bs-target="#topFiveWatchListcarousel" data-bs-slide-to={index} className="active" aria-current="true" aria-label={index}></button>
    //                             }
    //                             else {
    //                                 return <button key={index} type="button" data-bs-target="#topFiveWatchListcarousel" data-bs-slide-to={index} aria-label={index}></button>
    //                             }
    //                         }
    //                         )
    //                     }
    //                 </div>
    //                 <div className="carousel-inner">
    //                     {
    //                         this.state.topFiveMovies.map((movie, index) => {
    //                             if (index === 0) {
    //                                 return (
    //                                     // <span>Hello from if</span>
    //                                     // console.log("inside if index == 0");
    //                                     <div key={index} className="carousel-item active">
    //                                         <img alt={movie.title} src={this.imageUrl(movie.backDropUrl)} className="d-block w-100" />
    //                                         <div className="carousel-caption d-none d-md-block" >
    //                                             <div className="card w-25">
    //                                                 <div className="card-body">
    //                                                     <img alt={movie.title} src={this.imageUrl(movie.imageUrl)} className="img-fluid" />

    //                                                 </div>
    //                                                 <div className="card-footer text-body-secondary">
    //                                                     <p>{movie.title}</p>
    //                                                     <p>{movie.rating}</p>
    //                                                     <p>{movie.release_date}</p>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 );
    //                             }
    //                             else {
    //                                 return (
    //                                     // <span>Hello from if</span>
    //                                     <div key={index} className="carousel-item">
    //                                         <img alt={movie.title} src={this.imageUrl(movie.backDropUrl)} className="d-block w-100" />
    //                                         <div className="carousel-caption d-none d-md-block" >
    //                                             <div className="card w-25">
    //                                                 <div className="card-body">
    //                                                     <img alt={movie.title} src={this.imageUrl(movie.imageUrl)} className="img-fluid" />
    //                                                 </div>
    //                                                 <div className="card-footer text-body-secondary">
    //                                                     <p>{movie.title}</p>
    //                                                     <p>{movie.rating}</p>
    //                                                     <p>{movie.release_date}</p>
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                 );
    //                             }
    //                         })
    //                     }
    //                 </div>
    //                 <button className="carousel-control-prev" type="button" data-bs-target="#topFiveWatchListcarousel" data-bs-slide="prev">
    //                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //                     <span className="visually-hidden">Previous</span>
    //                 </button>
    //                 <button className="carousel-control-next" type="button" data-bs-target="#topFiveWatchListcarousel" data-bs-slide="next">
    //                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //                     <span className="visually-hidden">Next</span>
    //                 </button>
    //             </div>
    //             {
    //                 this.state.allWatchedMovies.length === 0 ? <div className="container mt-3 text-center">
    //                     <h3>You have not watched any movies yet!</h3>
    //                 </div>
    //                     :
    //                     <span></span>
    //             }

    //         </>
    //     )
    // }

    topFiveCarousal = () => {
        return (
            <>
                <Carousel id="topFiveWatchListcarousel"
                fade
                interval={3000}
                wrap>
                    {this.state.topFiveMovies.map((movie, index) => (
                        <Carousel.Item key={index}>
                            <img
                                alt={movie.title}
                                src={Util.imageUrl(movie.backDropUrl)}
                                className="d-block w-100"
                            />
                            <Carousel.Caption className="d-none d-md-block">
                                <div className="card w-25 shadow">
                                    <div className="card-body">
                                        <img
                                            alt={movie.title}
                                            src={Util.imageUrl(movie.imageUrl)}
                                            className="img-fluid"
                                        />
                                    </div>
                                    <div className="card-footer text-body-secondary">
                                        <p>{movie.title}</p>
                                        <p>{movie.rating}</p>
                                        <p>{movie.release_date}</p>
                                    </div>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>
    
                {this.state.allWatchedMovies.length === 0 ? (
                    <div className="container mt-3 text-center">
                        <h3>You have not watched any movies yet!</h3>
                    </div>
                ) : (
                    <span></span>
                )}
            </>
        );
    };

    emptyBanner = () => {
        return (
            <div className="container">
                <img alt="No movies available" src={image} className="d-block w-100 img-fluid" />
            </div>
        )
    }

    toastComponent = () => {
        return <div className="toast-container position-fixed bottom-0 end-0 p-3">
                            <div id="toastComponent" className="toast align-items-center text-bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                                <div className="d-flex">
                                    <div className="toast-body">
                                        {this.state.toastMsg}
                                    </div>
                                    <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
    }

    watchedMovieCards = () => {
        return (
            <div className="container">
                {
                    this.state.topFiveMovies.length === 0 ? <div className="container mt-3 text-center">
                        <h3> You do not have a watchlist yet!</h3>
                    </div>
                        : <></>

                }
                <h2 className="text-center">Watched Movies</h2>
                <div className="container">
                    <div className="accordion" id="movieAccordion">
                        {
                            this.state.allWatchedMovies.map((movie) => {
                                // console.log(movie);
                                return (
                                    <MovieItem key={movie.id} id={movie.id} type={Constants.MOVIE} poster_path={movie.imageUrl} title={movie.title} release_date={movie.release_date} secure_base_url={this.props.configs.images.secure_base_url} image_size={this.props.configs.default_img_size} parent={Constants.WATCHED} incrementWatchCount={this.incrementWatchCount} timesWatched = {movie.times_watched}/>
                                );
                            })
                        }
                    </div>
                    <div className="row">
                        <div className="container text-center">
                            {
                                this.state.results ?
                                    <div>
                                        <button id="prevBtn" disabled={this.state.prev !== null ? false : true} className="btn btn-outline-dark mt-2" onClick={() => this.decrementPage()} type="button">Prev</button>
                                        <button className="btn mt-2" style={{ cursor: "default" }}>{this.state.currentPage} of {this.state.totalPages}</button>
                                        <button id="nextBtn" disabled={this.state.next !== null ? false : true} className="btn btn-outline-dark mt-2" onClick={() => this.incrementPage()} type="button">Next</button>
                                    </div>
                                    : <div></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    toast = (message) => {
        this.setState({
            toastMsg: message
        })
        var successToastElement = document.getElementById('toastComponent')
        var successToast = Toast.getOrCreateInstance(successToastElement)
        successToast.show()
    }

    render() {
        // if both are empty return a banner giving message.
        if (this.state.allWatchedMovies.length === 0 && this.state.topFiveMovies.length === 0) {
            return this.emptyBanner()
        } else
            // if top 5 is empty return one carousal with message and viewed movies
            if (this.state.topFiveMovies.length === 0 && this.state.allWatchedMovies.length !== 0) {
                return this.watchedMovieCards()
            }

            // if watched movies is emtpy return message and carousal
            else if (this.state.topFiveMovies.length !== 0 && this.state.allWatchedMovies.length === 0) {
                return (<>
                    {this.topFiveCarousal()}
                    <div className="container-fluid">
                            <div className="row">
                                    <h2 className="text-center">WatchList</h2>
                                    <WatchList handleWatchedListAdd={this.handleWatchedListAdd}
                                        handleWatchListDelete={this.handleWatchListDelete}
                                        watchList={this.state.topFiveMovies} configs={this.props.configs} />
                            </div>
                        </div>
                        {this.toastComponent()}
                </>
                )
            }
            // if both are not empty display both top 5 movvies carousal and watched movies cards
            else {
                return (
                    <>
                        {
                            this.topFiveCarousal()
                        }
                        <div className="mt-3"></div>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8">
                                    {
                                        this.watchedMovieCards()
                                    }
                                </div>
                                <div className="col-md-4">
                                    <h2 className="text-center">WatchList</h2>
                                    <WatchList handleWatchedListAdd={this.handleWatchedListAdd}
                                        handleWatchListDelete={this.handleWatchListDelete}
                                        watchList={this.state.topFiveMovies} configs={this.props.configs} />
                                </div>
                            </div>
                        </div>
                        {this.toastComponent()}
                    </>
                )
            }
    }
}

export default Dashboard
