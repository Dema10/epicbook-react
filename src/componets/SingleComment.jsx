import { Button, ListGroup } from 'react-bootstrap'
import { StarFill } from 'react-bootstrap-icons';

const URL = 'https://striveschool-api.herokuapp.com/api/comments/'
const keyURL = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTg1NDMyMDcsImV4cCI6MTcxOTc1MjgwN30.KZZCeMrDqdcojHeqccqyjSZi6vP5Bb7drHbALpJFJ5k'


export default function SingleComment({ comment, setCommentToEdit, add, setAdd }) {

  const handleEdit = (comment) => {
    setCommentToEdit(comment);
  }

  const removeComment = (comment) => {
    fetch(URL + comment._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${keyURL}`
      }
    })
    .then(res => res.json())
    .then(data => {
      /* console.log(data) */
      setAdd(!add);
    })
    .catch(error => console.error('Errore', error))
  }

  return (
    <ListGroup.Item className=' d-flex justify-content-between align-items-center'>
      <div>
        <p className='mb-1'>{comment.comment}</p>
        <p className='mb-1'> {Array.from({length:comment.rate}).map(rate => <StarFill />)}</p>
      </div>
      <div className='btn-group ms-2'>
        <Button variant='outline-warning' onClick={() => handleEdit(comment)}><i className='bi bi-pencil'></i></Button>
        <Button variant='outline-danger' onClick={() => removeComment(comment)}><i className='bi bi-trash'></i></Button>
      </div>
    </ListGroup.Item>
  )
}
