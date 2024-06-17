import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";
import { useContext } from "react";
import { ThemeContexts } from "../modules/Contexts";


export default function CommentList({ comments, setCommentToEdit, add, setAdd }) {

  const [themeCtx] = useContext(ThemeContexts);

  return (
    <ListGroup className='mb-3' bg={themeCtx} data-bs-theme={themeCtx}>
        {comments.map(
          comment => <SingleComment 
            key={comment._id} 
            comment={comment} 
            setCommentToEdit={setCommentToEdit} 
            add={add} 
            setAdd={setAdd} 
            />
          )}
    </ListGroup>
  )
}
