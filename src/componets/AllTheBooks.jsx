import { Col, Row } from "react-bootstrap";
import SingleBook from "./SingleBook";
import { useState } from "react";
import CommentArea from "./CommentArea";

export default function AllTheBooks(props) {
    /* console.log(props.books); */
    const [selected, setSelected] = useState(false);

  return (
    <Row>
      <Col md={9}>
        <Row>
            {props.books
            .filter(book => book.title.toLowerCase().includes(props.search))
            .map(book => <SingleBook selected={selected} setSelected={setSelected} key={book.asin} book={book} />)}
        </Row>
      </Col>
      <Col md={3}>
        <CommentArea asin={selected} />
      </Col>
    </Row>
  )
}
