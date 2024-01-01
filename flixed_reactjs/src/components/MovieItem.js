// import { Card, Col } from "react-bootstrap";
// import { Container } from 'react-bootstrap';
// import Accordion from 'react-bootstrap/Accordion';

function MovieItem(props) {
    return (
        <div class="accordion" id="accordionFlushExample">
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        Accordion Item #1
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                        Accordion Item #2
                    </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                        Accordion Item #3
                    </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                </div>
            </div>
        </div>





        //     <Accordion>
        //         <Accordion.Item eventKey="0">
        //     <Accordion.Header>Accordion Item #1</Accordion.Header>
        //     <Accordion.Body>
        //       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
        //       eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
        //       minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        //       aliquip ex ea commodo consequat. Duis aute irure dolor in
        //       reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        //       pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        //       culpa qui officia deserunt mollit anim id est laborum.
        //     </Accordion.Body>
        //   </Accordion.Item>
        //         <Accordion.Item eventKey={props.key}>
        //             <Accordion.Header>{props.type === "movie" ? props.title : props.name}</Accordion.Header>
        //             <Accordion.Body>
        //                 <p>{props.type === "movie" ? props.release_date : props.first_air_date}</p>
        //                 <p>{props.poster_path}</p>
        //                 <p>{props.type}</p>
        //             </Accordion.Body>
        //         </Accordion.Item>
        //     </Accordion>

        //     <Col className="col-md-4">
        //         <Card style={{ width: '18rem', margin: 3 }} className="card shadow p-3 mb-5 bg-white rounded" hover="true">
        //             <Card.Body>{
        //                 props.type === "movie" ?
        //                     <Card.Title>{props.title}</Card.Title>
        //                     :
        //                     <Card.Title>{props.name}</Card.Title>
        //             }
        //                 <Card.Text>{
        //                     props.type === "movie" ?
        //                         props.release_date
        //                         :
        //                         props.first_air_date
        //                 }
        //                     <span>{props.poster_path}</span>
        //                     <span>{props.type}</span>
        //                 </Card.Text>
        //             </Card.Body>
        //         </Card>
        //     // </Col>
    )
}

export default MovieItem