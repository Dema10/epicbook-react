import { Container } from 'react-bootstrap';
import './App.css'
import MyFooter from './componets/MyFooter';
import MyNav from './componets/MyNav'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Welcome from './componets/Welcome';
import Buttons from './componets/Buttons';
import { useState } from 'react';
import { ThemeContexts } from './modules/Contexts';


function App() {
  
  const [theme, setTheme] = useState('dark');
  const [search, setSearch] = useState('');
  const handlerSearch = (e) => setSearch(e.target.value)

  return (
    <>
      <ThemeContexts.Provider value={[theme, setTheme]}>
        <MyNav search={search} handlerSearch={handlerSearch} />
        <Container className='my-3'>
            <Welcome />
            <Buttons search={search} />
        </Container>
        <MyFooter />
      </ThemeContexts.Provider>
    </>
  )
}

export default App
