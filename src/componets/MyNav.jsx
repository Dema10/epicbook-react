import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Search from './Search';
import { useContext } from 'react';
import { ThemeContexts } from '../modules/Contexts';

function MyNav({ search, handlerSearch }) {
  
  const [themeCtx, setThemeCtx] = useContext(ThemeContexts);


  return (
    <Navbar expand="lg" bg={themeCtx} data-bs-theme={themeCtx}>
      <Container>
        <Navbar.Brand href="#home">React-EpicBook</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#browse">Browse</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Search search={search} handlerSearch={handlerSearch} />
        {themeCtx === 'dark' ? (
          <Button className='mx-5' variant="outline-light" onClick={() => {
            themeCtx === 'light' ? setThemeCtx('dark') : setThemeCtx('light')
          }}>
            <i className="bi bi-sun"></i>
          </Button>
        ) : (
          <Button className='mx-5' variant="outline-dark" onClick={() => {
            themeCtx === 'light' ? setThemeCtx('dark') : setThemeCtx('light')
          }}>
            <i className="bi bi-moon"></i>
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default MyNav;