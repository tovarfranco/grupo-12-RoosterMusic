// Este App.js es un COMPONENTE, puede tener su propio css y su lógica. En sí un COMPONENTE es una función que retorna un bloque de HTML.

import logo from './logo.svg';                                  // Las imágenes debe ser importadas para poder utilizarlas.
import './App.css';                                             // Se importa un css. OJO con los css, afectan a toda la página.

function App() {                                                // Como dijimos básicamente el componente es una función.
  return (                                                      // Debe retornar una solo bloque de código HTML. Esto es JSX: los class ahora son className, deben CERRARSE todas lase etiquetas.
    <div className="App">      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;                                             // Siempre exportarlo de esta manera.
