import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="pb-5">
        <div className="text-center">
          <h1 className="flixed_name display-4">Flixed</h1>
          <p className="lead" style={{ color: "#8e8d8a" }}>
            Track, Watch, and Relive Your Favorite Movies
          </p>
          <p style={{ color: "#8e8d8a" }}>
            Discover your movie-watching habits and keep your watchlist organized.
          </p>
          <Link to="/register" className="btn btn-danger btn-lg mt-3">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <i className="bi bi-film" style={{ fontSize: "3rem", color: "#E85A4F" }}></i>
            <h3>Track Movies</h3>
            <p>Log movies you've watched and those on your watchlist.</p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-clock-history" style={{ fontSize: "3rem", color: "#E85A4F" }}></i>
            <h3>Watch Time</h3>
            <p>Know exactly how much time you've spent watching movies.</p>
          </div>
          <div className="col-md-4 mb-4">
            <i className="bi bi-star-fill" style={{ fontSize: "3rem", color: "#E85A4F" }}></i>
            <h3>Top Picks</h3>
            <p>Identify your top movies and most-watched favorites.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
