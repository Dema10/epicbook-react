import { useEffect, useState } from "react"
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import Spinner from "./Spinner";


const URL = 'https://striveschool-api.herokuapp.com/api/books/'
const keyURL = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTg1NDMyMDcsImV4cCI6MTcxOTc1MjgwN30.KZZCeMrDqdcojHeqccqyjSZi6vP5Bb7drHbALpJFJ5k'


export default function CommentArea({ asin }) {

    const [comments, setComments] = useState([]);
    const [commentToEdit, setCommentToEdit] = useState(null);
    const [loading, setLoading] = useState(false);
    const [add, setAdd] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(URL + asin + '/comments',{
            headers: { Authorization: `Bearer ${keyURL}`}
        })
            .then(res => res.json())
            .then(data => {
              setComments(data)
              setLoading(false);
            })
    }, [add, asin])
 
  return (
    <>
        <Spinner loading={loading} />
        <AddComment 
          comments={comments} 
          setComments={setComments} 
          asin={asin} 
          commentToEdit={commentToEdit} 
          setCommentToEdit={setCommentToEdit} 
          add={add} 
          setAdd={setAdd} 
        />
        <CommentList 
          comments={comments} 
          setCommentToEdit={setCommentToEdit} 
          add={add} 
          setAdd={setAdd} 
        />
    </>
  )
}
