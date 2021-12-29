import React from 'react';                                   // Se importa React.
import ReactDOM from 'react-dom';                            // Se importa el DOM.
import App from './components/App';                          // IMPORTANTE, este es un COMPONENTE llamado App.
import './assets/css/normalize.css';                         // Se importa un css. OJO con los css, afectan a toda la página.
import './assets/css/index.css';                             // Se importa un css. OJO con los css, afectan a toda la página.

import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'             // Siempre en el index.js debemos importar este módulo que me permitirá usar rutas en React.

ReactDOM.render(                                             // Se renderiza el COMPONENTE App en el div id=root. Ver que el COMPONENTE se lo utiliza como una etiqueta HTML.  // Debemos englobar a la App en este componente para poder usar rutas internamente.
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')                            // El id=root.
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();