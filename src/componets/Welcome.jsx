import { Alert } from "react-bootstrap";

export default function Welcome() {
  return (
    <Alert variant='danger' className="text-center">
          <h1>Benvenuto su DemaBooks!</h1>
          <h5>Scegli una categoria</h5>
    </Alert>
  )
}
