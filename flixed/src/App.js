import 'bootstrap/dist/css/bootstrap.min.css';
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import SearchMovies from './components/SearchMovies'
import WatchList from './components/WatchList'
import WatchedMovies from './components/WatchedMovies'

const DATE = new Date()

function App() {
  return (
    <Container>
        <Row>
          <Container>
            <Row className='justify-content-center'>
              <h2 style={{color:'red'}}>FLIXED</h2>
            </Row>
            <Row>
              <Container>{DATE.toDateString()}</Container>
            </Row>
            <hr/>
            <Row></Row>
          </Container>
        </Row>
        <SearchMovies/>
        <Row>
          <Col>
              <WatchedMovies/>
          </Col>
          <Col>
              <WatchList/>
          </Col>
        </Row>
    </Container>
  );
}

export default App;
