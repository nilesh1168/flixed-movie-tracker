import { Card } from "react-bootstrap";

function MovieItem(props) {
    return (
        <Card style={{ width: '18rem', margin: 3 }} className="card shadow p-3 mb-5 bg-white rounded" hover>
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
                    <p>{props.poster_path}</p>
                    <p>{props.type}</p>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default MovieItem