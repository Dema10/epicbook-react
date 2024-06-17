import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ThemeContexts } from "../modules/Contexts";

const URL = 'https://striveschool-api.herokuapp.com/api/comments/'
const keyURL = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTg1NDMyMDcsImV4cCI6MTcxOTc1MjgwN30.KZZCeMrDqdcojHeqccqyjSZi6vP5Bb7drHbALpJFJ5k'

export default function AddComment({ comments, setComments, asin, commentToEdit, setCommentToEdit, add, setAdd }) {

  const [input, setInput] = useState('');
  const [rate, setRate] = useState(0);
  const [themeCtx] = useContext(ThemeContexts);

  useEffect(() => {
    if (commentToEdit) {
      setInput(commentToEdit.comment);
      setRate(commentToEdit.rate);
    } else {
      setInput('');
      setRate(0);
    }
  }, [commentToEdit]);

  const createComment = (e) => {
    e.preventDefault();

    if (commentToEdit) {
      // Modifica commento esistente
      const updatedComment = { ...commentToEdit, comment: input, rate: rate };

      fetch(URL + commentToEdit._id, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${keyURL}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedComment)
      })
      .then(res => res.json())
      .then(data => {
        const updatedComments = comments.map(comment => comment._id === data._id ? data : comment);
        setComments(updatedComments);
        setInput('');
        setRate(0);
        setCommentToEdit(null);
        setAdd(!add);
      })
      .catch(error => console.error("Errore", error));
    } else {
      // Aggiungi nuovo commento
      const newComment = { comment: input, rate: rate, elementId: asin };
      fetch(URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${keyURL}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
      })
      .then(res => res.json())
      .then(data => {
        setComments([...comments, data]);
        setInput('');
        setRate(0);
        setAdd(!add);
      })
      .catch(error => console.error("Errore", error));
    }
  }

  return (
    <Form bg={themeCtx} data-bs-theme={themeCtx}>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Inserisci qui il tuo commento"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Select aria-label="Default select example" value={rate} onChange={(e) => setRate(parseInt(e.target.value))}>
          <option value={0}>Dai un voto da 1 a 5</option>
          <option value={1} selected={commentToEdit && commentToEdit.rate === 1}>1</option>
          <option value={2} selected={commentToEdit && commentToEdit.rate === 2}>2</option>
          <option value={3} selected={commentToEdit && commentToEdit.rate === 3}>3</option>
          <option value={4} selected={commentToEdit && commentToEdit.rate === 4}>4</option>
          <option value={5} selected={commentToEdit && commentToEdit.rate === 5}>5</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Button variant="outline-success" onClick={createComment} className="w-100">{commentToEdit ? 'Modifica' : 'Aggiungi'}</Button>
      </Form.Group>
      {commentToEdit && (
        <Form.Group className="mb-3">
          <Button variant="outline-danger" onClick={() => setCommentToEdit(null)} className="w-100">Annulla</Button>
        </Form.Group>
      )}
    </Form>
  )
}
