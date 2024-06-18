import { useParams } from "react-router-dom"
import fantasy from '../books/fantasy.json';
import history from '../books/history.json';
import horror from '../books/horror.json';
import romance from '../books/romance.json';
import scifi from '../books/scifi.json';
import { Card, Col, Row } from "react-bootstrap";
import { useContext } from "react";
import { ThemeContexts } from "../modules/Contexts";
import CommentArea from "../componets/CommentArea";

export default function BookDetails() {

    const { asin } = useParams();
    const [themeCtx] = useContext(ThemeContexts);
    const allBooks = [...fantasy, ...history, ...horror, ...romance, ...scifi];
    /* console.log(allBooks); */
    const book = allBooks.find(book => book.asin === asin);
    if(!book) {
        return <div>Libro non trovato</div>;
    }


  return (
    <Row>
        <Col xs={12}>
            <Row>
                <Col xs={12} md={6}>
                    <Card
                    bg={themeCtx}
                    data-bs-theme={themeCtx}
                    className="mb-3"
                    style={{width: '20rem'}}
                    >
                    <Card.Img variant="top" src={book.img} />
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    <Card bg={themeCtx} data-bs-theme={themeCtx} className="mb-3">
                        <Card.Body>
                            <h1>BOOK DETAILS</h1>
                            <Card.Title> Title: {book.title}</Card.Title>
                            <Card.Text>
                                Category: {book.category}
                            </Card.Text>
                            <Card.Text>
                                Price: <b>{book.price} €</b>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Col>
        <Col xs={12}>
            <CommentArea asin={asin} className="mb-3"/>
        </Col>
    </Row>
  )
}
