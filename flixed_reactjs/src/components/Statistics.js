import React, { Component } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Util from "../utils/util";

// Register required Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
);

class Statistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      moviesWatched: 0,
      hoursSpent: 0,
      minutesSpent: 0,
      mostRewatchedMovies: [],
      genreLabels: [],
      genreCount: [],
      movieCount: [],
      noMoviesWatched: true
    }
  }

  getTotalCountOfWatchedMovies() {
    var url = `${this.props.configs.base_url}/movies/watched/totalcount`
    var options = Util.getRequestOptions("GET")
    var totalMoviesWatchedRequest = new Request(url, options)
    fetch(totalMoviesWatchedRequest).then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(response => {
      // console.log(response)
      this.setState({
        moviesWatched: response.count
      })
    })
  }

  getTotalHoursOfWatchedMovies() {
    var url = `${this.props.configs.base_url}/movies/watched/totaltime`
    var options = Util.getRequestOptions("GET")
    var totalHoursWatchedRequest = new Request(url, options)
    fetch(totalHoursWatchedRequest).then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(response => {
      // console.log(response)
      this.setState({
        hoursSpent: Math.floor(response.totalWatchTime / 60),
        minutesSpent: (response.totalWatchTime % 60)
      })
    })
  }

  getMostReWatchedMovies() {
    var url = `${this.props.configs.base_url}/movie/watched/mostwatchedmovies`
    var options = Util.getRequestOptions("GET")
    var mostRewatchedMoviesRequest = new Request(url, options)
    fetch(mostRewatchedMoviesRequest).then(response => {
      if (response.status === 200) {
        return response.json()
      }
    }).then(response => {
      // console.log(response.most_rewatched_movies)
      // var movieList = []
      // response.forEach(movie => {
      //   console.log(movie)
      //   // var movieItem = {}
      //   // movieItem.imdb_id = movie.imdb_id
      // });
      this.setState({
        mostRewatchedMovies: response.most_rewatched_movies
      })
    })
  }

  getWatchedGenres() {
    var url = `${this.props.configs.base_url}/movie/watched/mostwatchedgenres`
    var options = Util.getRequestOptions("GET")
    var watchedGenresRequest = new Request(url, options)
    fetch(watchedGenresRequest).then(response => {
      if (response.status === 200)
        return response.json()
    }).then(response => {
      this.setState({
        genreLabels: Object.keys(response),
        genreCount: Object.values(response)
      })
    })
  }

  getWatchedMoviesByMonth() {
    var url = `${this.props.configs.base_url}/movies/watched/2025`
    var options = Util.getRequestOptions("GET")
    var watchedGenresRequest = new Request(url, options)
    fetch(watchedGenresRequest).then(response => {
      if (response.status === 200)
        return response.json()
    }).then(response => {
      console.log(response)
      this.setState({
        movieCount: Object.values(response)
      })
    })
  }


  componentDidMount() {
    this.getTotalCountOfWatchedMovies()
    this.getTotalHoursOfWatchedMovies()
    this.getMostReWatchedMovies()
    this.getWatchedGenres()
    this.getWatchedMoviesByMonth()

  }


  render() {

    const monthlyMoviesData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Movies Watched",
          data: this.state.movieCount,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    };

    const genreData = {
      labels: this.state.genreLabels,
      datasets: [
        {
          data: this.state.genreCount,
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        },
      ],
    };

    return (
      <div className="container mt-3">
        {/* First Div */}
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <div className="card text-center shadow-md">
                <div className="card-body">
                  <h5 className="card-title">Movies Watched</h5>
                  <p className="card-text display-4">{this.state.moviesWatched}</p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mb-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Hours Spent Watching</h5>
                  <p className="card-text display-4">{this.state.hoursSpent} hours {this.state.minutesSpent} minutes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          {/* Most Rewatched Movies Section */}
          <section className="mb-5">
            <h2 className="mb-4">Most Rewatched Movies</h2>
            {this.state.mostRewatchedMovies.length === 0 ? <div className="col-8 col-md-4 mb-3">You haven't rewatched any movies yet!!</div> :
              <div className="row flex-nowrap overflow-auto">
                {this.state.mostRewatchedMovies.map((movie, index) => (
                  <div key={index} className="col-8 col-md-4 mb-3">
                    <div className="card" >
                      <img
                        src={Util.imageUrl(movie.imageUrl)}
                        className="card-img-top"
                        alt={movie.title}
                      />
                      <div className="card-body" style={{ height: '140px' }}>
                        <h5 className="card-title">{movie.title}</h5>
                        <p className="card-text">
                          Rewatched: {movie.times_watched} times
                          <br />
                          IMDB Rating: {movie.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }
          </section>

          {/* Movies Watched Per Month Section */}
          <section className="mb-5">
            <h2 className="mb-4">Movies Watched Per Month</h2>
            {
              this.state.genreLabels.length === 0 ? <>You haven't watched any movies yet!!</> :
                <div className="card" style={{ height: '500px' }}>
                  <div className="card-body">
                    <Bar data={monthlyMoviesData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </div>
            }
          </section>

          {/* Most Watched Genres Section */}
          <section className="mb-5">
            <h2 className="mb-4">Most Watched Genres</h2>
            {
              this.state.movieCount.length === 0 ? <>You haven't watched any movies yet!!</> :
                <div className="card" style={{ height: '500px' }}>
                  <div className="card-body">
                    <Doughnut style={{ backgroundColor: 'white' }} data={genreData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </div>
            }
          </section>
        </div>

      </div>
    );
  }
}

export default Statistics;
