import { Container } from 'react-bootstrap';
import './App.css'
import MyFooter from './componets/MyFooter';
import MyNav from './componets/MyNav'
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import { ThemeContexts } from './modules/Contexts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  
  const [theme, setTheme] = useState('dark');
  const [search, setSearch] = useState('');
  const handlerSearch = (e) => setSearch(e.target.value)

  return (
    <>
      <ThemeContexts.Provider value={[theme, setTheme]}>
        <BrowserRouter>
          <MyNav search={search} handlerSearch={handlerSearch} />
          <Container className='my-3'>
            <Routes>
              <Route index element={<Home search={search} />} />
              <Route path='/details/:asin' element={<BookDetails />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>
          <MyFooter />
        </BrowserRouter>
      </ThemeContexts.Provider>
    </>
  )
}

export default App
