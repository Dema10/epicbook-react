import { Col, Form } from "react-bootstrap";

export default function Search( {search, handlerSearch} ) {
  return (
    <Col>
        <Form.Group>
            <Form.Control
                type="search"
                placeholder="Search..."
                value={search}
                onChange={handlerSearch}
            />
        </Form.Group>
    </Col>
  )
}
