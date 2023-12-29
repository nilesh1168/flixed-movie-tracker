import { Card, Col } from "react-bootstrap";

function MovieItem(props) {
    return (
        <Col className="col-md-4">
            <Card style={{ width: '18rem', margin: 3 }} className="card shadow p-3 mb-5 bg-white rounded" hover="true">
                <Card.Body>{
                    props.type === "movie" ?
                        <Card.Title>{props.title}</Card.Title>
                        :
                        <Card.Title>{props.name}</Card.Title>
                }
                    <Card.Text>{
                        props.type === "movie" ?
                            props.release_date
                            :
                            props.first_air_date
                    }
                        <span>{props.poster_path}</span>
                        <span>{props.type}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MovieItem