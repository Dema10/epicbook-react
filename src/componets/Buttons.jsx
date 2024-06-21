import { Button } from 'react-bootstrap';
import AllTheBooks from './AllTheBooks';
import fantasy from '../books/fantasy.json';
import history from '../books/history.json';
import horror from '../books/horror.json';
import romance from '../books/romance.json';
import scifi from '../books/scifi.json';
import { useState } from 'react';
import Spinner from './Spinner';

export default function Buttons({ search }) {
    const [type, setType] = useState('fantasy'); // il mio progetto di base partiva vuoto causa test ho dovuto farlo partire con un valore
    const [loading, setLoading] = useState(false);

    const handleButtonClick = (selectedType) => {
      setLoading(true);
      setTimeout(() => {
        setType(selectedType);
        setLoading(false);
      }, 1000);
    }

  return (
    <>
      <div className='d-flex justify-content-center mb-3'>
        <Button variant="danger" className='mx-1 rounded-5' onClick={() => handleButtonClick('fantasy')}>Fantasy</Button>
        <Button variant="danger" className='mx-1 rounded-5' onClick={() => handleButtonClick('history')}>History</Button>
        <Button variant="danger" className='mx-1 rounded-5' onClick={() => handleButtonClick('horror')}>Horror</Button>
        <Button variant="danger" className='mx-1 rounded-5' onClick={() => handleButtonClick('romance')}>Romance</Button>
        <Button variant="danger" className='mx-1 rounded-5' onClick={() => handleButtonClick('scifi')}>SciFi</Button>
        {type && (
          <Button variant="danger" className='mx-1 rounded-5' onClick={() => setType('')}><i className='bi bi-trash'></i></Button>
        )}
      </div>
      {loading ? (
        <Spinner loading={loading}/>
      ) : (
        <>
          {type === 'fantasy' && <AllTheBooks books={fantasy} search={search} />}
          {type === 'history' && <AllTheBooks books={history} search={search} />}
          {type === 'horror' && <AllTheBooks books={horror} search={search} />}
          {type === 'romance' && <AllTheBooks books={romance} search={search} />}
          {type === 'scifi' && <AllTheBooks books={scifi} search={search} />}
        </>
      )}
    </>
  );
}
