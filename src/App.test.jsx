import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";
import  Welcome from "./componets/Welcome";
import  App  from "./App";

// TEST 1: Verifica che il componente Welcome venga montato correttamente.

test('Cerco il titolo in Welcome', () => {
    // dico che il test deve avvenire al render di Welcome
    render(<Welcome />)

    // dichiaro la costante con il testo da cercare in pagina
    const welcometitle = screen.getByText(/Benvenuto su DemaBooks!/i)
    // verifico che welcometitle sia presente in pagina
    expect(welcometitle).toBeInTheDocument();
});

//TEST 2: Verifica che vengano effettivamente renderizzate tante bootstrap cards quanti sono i libri nel file json utilizzato.

// ho assegnato un data-testid al componente card per poter avere un aggancio alle card
test('Cerco il data test id delle card', async () => {
    render(<App />)

    //Attendo che vengano trovati tutti gli id
    const card = await screen.findAllByTestId('single-card')
    // Verifico che ci siano effettivamente 150
    expect(card).toHaveLength(150);
});


//TEST 3: Verifico che il componente CommentArea venga renderizzato correttamente.

test('Cerco il placeholder all interno di commentarea', () => {
    render(<App />)

    const commentarea = screen.getByPlaceholderText(/inserisci qui il tuo commento/i)
    //Verifico che venga trovato
    expect(commentarea).toBeInTheDocument();
});


//TEST 4: Verifica, Magari con più test che il filtraggio dei libri tramite navbar si comporti come previsto.

//ES.1
test('Filtro i libri in base alla ricerca nella navbar', async () => {
    render(<App />)

    const searchInput = screen.getByPlaceholderText(/search.../i)

    //Simulo un evento di cambia valore sull'input di ricerca
    fireEvent.change(searchInput, {target: { value: "destiny"} })

    //Cerco tutti i risultati con il testid assegnato in precedenza
    const cardFilter = await screen.findAllByTestId('single-card')

    //Verifico che ci siano solo 3 testid trovati
    expect(cardFilter).toHaveLength(3);
});

//ES.2
test('Filtro i libri in base alla ricerca nella navbar', async () => {
    render(<App />)

    const searchInput = screen.getByPlaceholderText(/search.../i)

    //Simulo un evento di cambia valore sull'input di ricerca
    fireEvent.change(searchInput, {target: { value: "grimoire"} })

    //Cerco tutti i risultati con il testid assegnato in precedenza
    const cardFilter = await screen.findAllByTestId('single-card')

    //Verifico che ci siano solo 1 testid trovato
    expect(cardFilter).toHaveLength(1);
});




//TEST 5: Verifica che cliccando su un libro, il suo bordo cambi colore.

test('Verifico che al click del primo libro si applichi un bordo rosso di 3px', async () => {
    render(<App />)

    //Seleziono l'id dei libri
    const books = await screen.findAllByTestId('single-card')

    //Decido di predere il libro ad indice 0
    const firstBook = books[0]

    //Simulo il click sul libro
    fireEvent.click(firstBook)

    //Mi aspetto che dopo il click venga trovato il bordo rosso
    expect(firstBook).toHaveStyle("border: 3px solid red");
});


//TEST 6: Verifica che, cliccando su di un secondo libro dopo il primo, il bordo del primo torni normale.

test('Verifico che al click sul secondo libro il bordo del primo torni al suo stato iniziale' , async () => {
    render(<App />)

    //Seleziono l'id dei libri
    const books = await screen.findAllByTestId('single-card')

    //Prendo il libro ad indice 0
    const firstBook = books[0]

    //Prendo anche il libro ad indice 1
    const secondBook = books[1]

    //Simulo il click sul secondo libro
    fireEvent.click(secondBook)

    //Mi aspetto che il bordo del primo libro sia tornato al bordo iniziale
    expect(firstBook).not.toHaveStyle("border: 3px solid red");

    //Mi aspetto che il secondo libro abbia il bordo rosso
    expect(secondBook).toHaveStyle("border: 3px solid red");
});


//TEST 7: Verifica che all'avvio della pagina, senza aver ancora cliccato su nessun libro, non ci siano istanze del componente SingleComment all'interno del DOM.

test('Verifico che al caricamento della pagina non ci sia nessun commento presente sul primo libro', async () =>{
    render(<App />)

    const books = await screen.findAllByTestId('single-card')

    //Prendo il libro ad indice 0
    const firstBook = books[0]

    //Mi aspetto che il primo libro sia selezionato
    expect(firstBook).toBeInTheDocument()

    //Adesso verifico che non ci sia il commento prova per il test "ho usato queryByText perchè un elemento non trovato restituisce null e queryByText non manda in errore il test rispetto ad getByText"
    const comment = screen.queryByText(/prova per il test/i)

    //Mi aspetto che il commento non venga trovato
    expect(comment).not.toBeInTheDocument();
});


//TEST 8: Verifica infine che, cliccando su di un libro con recensioni, esse vengano caricate correttamente all'interno del DOM.

test('Verifico che al caricamento della pagina e al click sul primo libro venga caricato la recensione', async () =>{
    render(<App />)

    const books = await screen.findAllByTestId('single-card')

    //Prendo il libro ad indice 0
    const firstBook = books[0]

    //Mi aspetto che il primo libro sia selezionato
    expect(firstBook).toBeInTheDocument()

    //Simulo il click sul libro
    fireEvent.click(firstBook)

    //Adesso verifico che il commento venga trovato a schermo essendoci una chiamata fetch nel mezzo anche qui utilizzeremo await per attendere il rendering
    const comment = await screen.findByText(/prova per il test/i)

    //Mi aspetto che il commento venga trovato
    expect(comment).toBeInTheDocument();
});