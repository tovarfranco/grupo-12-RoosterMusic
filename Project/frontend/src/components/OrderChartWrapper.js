import React from 'react';
import { useEffect, useState } from 'react';                                                                          // useState es para poder darle estados a los componentes FUNCIONALES (no de clase). useEffect es par poder manejar el ciclo de ida para componentes FUNCIOANLES y useRef sirve para seleccionar elementos del DOm muy parecido a los selectores de JS.
import palette from 'google-palette/palette'                                                                          // Para generar paleta de colores.

// Solo para gráficos:
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function OrderChartWrapper() {

    /* Valores iniciales */
    const [orders, setOrders] = useState([]);                                                                         // useState genera un ARRAY de 2 posiciones. La 1° es una variable que tiene el valor definido. La 2° es una FUNCION que permitirá setear un nuevo valor a la variable anterior. En este caso lavarialbe tiene un array [].

    /* DidMount pero con Hook. */
    useEffect(() => {                                                                                                 // Recibe un callback y un array de dependencias. El "DidMount" recibe SIEMPRE un array vacío, indicando que no mira ninguna dependencia/variable de seguimiento.
        console.log('%cSe montó el componente - DidMount', 'color: green');
        fetch('/api/orders')                                                                                          // Obtención de datos.
            .then(response => response.json())
            .then(data => {
                setOrders(data.data)
            })
            .catch(error => console.log(error));
    }, []);

    /* DidUpdate pero con Hook. */
    useEffect(() => {                                                                                                 // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        console.log('%cSe actualizó el componente - DidUpdate', 'color: blue');
    }, [orders]);                                                                                                     // SUPER IMPORTANTE, daremos seguimiento al estado de esta variable.

    /* WillUnmount pero con Hook. */
    useEffect(() => {                                                                                                 // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        return () => console.log('%cSe desmontó el componente - WillUnmount', 'color: red');                          // RETORNA UNA FUNCION SIEMPRE.
    }, []);                                                                                                           // SUPER IMPORTANTE este array vacío

    /* Creo mi data para renderizar correctamente LINE -------------------------------*/
    /* Sumarizo (hago conteo) - Resultado es un objeto */
    let result_line = orders.reduce((acc, { last_modified_date }) => (                                                // Destructuring.
        {
            ...acc,
            [last_modified_date]: (acc[last_modified_date] || 0) + 1
        }
    ), {});

    /* Paso mi resultado objeto a array de objetos */
    let arrayResult_line = Object.keys(result_line).map(key => (
        {
            name: key,
            total: `${result_line[key]}`
        }
    ));

    /* Para graficar necesito un array de labels y un array de datos */
    let arrayResultLabels_line = arrayResult_line.map(item => item.name);
    let arrayResultData_line = arrayResult_line.map(item => item.total);

    /* Opciones del gráfico LINE */
    let options_line = {
        responsive: true,
        maintainAspectRatio: true,                                                                                    // Con esto se ve mejor.
        plugins: {
            legend: {
                display: false,                                                                                       // No queremos mostrar la leyenda del dataset.
                position: 'top',
            },
            title: {
                display: true,
                text: 'Ventas por día',
                font: {
                    size: 18
                }
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    /* Data para el gráfico LINE*/
    let data_line = {
        labels: arrayResultLabels_line,
        datasets: [
            {
                // label: 'Dataset 1',              // Es el nombre del dataset si queremos.
                data: arrayResultData_line,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 1)',
                lineTension: 0.4
            },                                                                                                        // Puede haber otro dataset.
        ],
    };

    /* Creo mi data para renderizar correctamente PIE --------------------------------*/
    /* Sumarizo (hago conteo) - Resultado es un objeto */
    let result_pie = orders.reduce((acc, { product: { category: { name } } }) => (                                    // Destructuring.
        {
            ...acc,
            [name]: (acc[name] || 0) + 1
        }
    ), {});

    /* Paso mi resultado objeto a array de objetos */
    let arrayResult_pie = Object.keys(result_pie).map(key => (
        {
            name: key,
            total: `${result_pie[key]}`
        }
    ));

    /* Para graficar necesito un array de labels y un array de datos */
    let arrayResultLabels_pie = arrayResult_pie.map(item => item.name);
    let arrayResultData_pie = arrayResult_pie.map(item => item.total);

    /* Opciones del gráfico PIE */
    let options_pie = {
        responsive: true,
        maintainAspectRatio: false,                                                                                   // Con esto se ve mejor.
        plugins: {
            legend: {
                display: true,                                                                                        // No queremos mostrar la leyenda del dataset.
                position: 'left',
            },
            title: {
                display: true,
                text: 'Categorías más vendidas',
                font: {
                    size: 18
                }
            }
        },
    };

    /* Data para el gráfico PIE*/
    let colours = palette('qualitative', arrayResultLabels_pie.length, 2);                                            // Largo del array de datos.

    let data_pie = {
        labels: arrayResultLabels_pie,
        datasets: [
            {
                // label: 'Dataset 1',              // Es el nombre del dataset si queremos.
                data: arrayResultData_pie,
                backgroundColor: colours.map(hex => '#' + hex)                                                        // Se asigna un color de la paleta a cada categoría.
            },                                                                                                        // Puede haber otro dataset.
        ],
    };

    /* Renderizo */
    return (
        <React.Fragment>
            {/* <!-- Seccion 3 --> */}
            <section>
                <h3>Ventas</h3>
                <hr />
                <div className="container-modificaciones">

                    <div className="grupo-modificaciones">
                        <Line data={data_line} options={options_line} />
                    </div>

                    <div className="grupo-modificaciones">
                        <Doughnut data={data_pie} options={options_pie} />
                    </div>

                </div>
            </section>
            {/* <!-- /Seccion 3 --> */}
        </React.Fragment>
    )
}

export default OrderChartWrapper;