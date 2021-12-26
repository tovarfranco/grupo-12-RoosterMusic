import React from 'react';                          // Se importa React.
import ReactDOM from 'react-dom';                   // Se importa el DOM.
import './index.css';                               // Se importa un css. OJO con los css, afectan a toda la página.
import App from './App';                            // IMPORTANTE, este es un COMPONENTE llamado App.
import reportWebVitals from './reportWebVitals';

ReactDOM.render(                                    // Se renderiza el COMPONENTE App en el div id=root. Ver que el COMPONENTE se lo utiliza como una etiqueta HTML.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')                   // El id=root.
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
