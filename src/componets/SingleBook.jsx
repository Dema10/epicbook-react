import { Col, Card, Button } from "react-bootstrap";
import { useContext } from 'react';
import { ThemeContexts } from '../modules/Contexts';
import { useNavigate } from "react-router-dom";

export default function SingleBook({ book, selected, setSelected }) {
  const [themeCtx] = useContext(ThemeContexts);
  const navigate = useNavigate();

  const borderColor = themeCtx === 'light' ? 'black' : 'white';

  return (
    <Col xs={12} sm={6} md={4} lg={4} className="mb-3">
      <Card
        bg={themeCtx}
        data-bs-theme={themeCtx}
        onClick={() => setSelected(book.asin)}
        style={{
          height: '100%',
          border: selected === book.asin ? '3px solid red' : `1px solid ${borderColor}`,
        }}
      >
        <div className="ratio ratio-1x1">
          <Card.Img variant="top" src={book.img} className="card-img-top" style={{ objectFit: 'contain' }} />
        </div>
        <Card.Body>
          <Card.Title className="text-truncate">{book.title}</Card.Title>
          <Button onClick={() => navigate(`/details/${book.asin}`)} 
                  variant="outline-info"
                  className="w-100">
            Detail
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
