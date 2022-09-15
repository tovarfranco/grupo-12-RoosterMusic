import React from 'react';
import { useEffect, useState } from 'react';                                                         // useState es para poder darle estados a los componentes FUNCIONALES (no de clase). useEffect es par poder manejar el ciclo de ida para componentes FUNCIOANLES y useRef sirve para seleccionar elementos del DOm muy parecido a los selectores de JS.
import palette from 'google-palette/palette'                                                         // Para generar paleta de colores.

// Solo para gráficos:
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function CategoryProductChartWrapper() {

    /* Valores iniciales */
    const [categories, setCategories] = useState([]);                                                // useState genera un ARRAY de 2 posiciones. La 1° es una variable que tiene el valor definido. La 2° es una FUNCION que permitirá setear un nuevo valor a la variable anterior. En este caso lavarialbe tiene un array [].

    /* DidMount pero con Hook. */
    useEffect(() => {                                                                                // Recibe un callback y un array de dependencias. El "DidMount" recibe SIEMPRE un array vacío, indicando que no mira ninguna dependencia/variable de seguimiento.
        console.log('%cSe montó el componente - DidMount', 'color: green');
        fetch('/api/categories')                                                                     // Obtención de datos.
            .then(response => response.json())
            .then(data => {
                setCategories(data.data)
            })
            .catch(error => console.log(error));
    }, []);

    /* DidUpdate pero con Hook. */
    useEffect(() => {                                                                                // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        console.log('%cSe actualizó el componente - DidUpdate', 'color: blue');
    }, [categories]);                                                                                // SUPER IMPORTANTE, daremos seguimiento al estado de esta variable.

    /* WillUnmount pero con Hook. */
    useEffect(() => {                                                                                // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        return () => console.log('%cSe desmontó el componente - WillUnmount', 'color: red');         // RETORNA UNA FUNCION SIEMPRE.
    }, []);                                                                                          // SUPER IMPORTANTE este array vacío

    /* Creo mi data para renderizar correctamente */
    let arrayResult = categories.map(item => (
        {
            name: item.name,
            total: item.products.length
        }
    ));

    /* Para graficar necesito un array de labels y un array de datos */
    let arrayResultLabels = arrayResult.map(item => item.name);
    let arrayResultData = arrayResult.map(item => item.total);

    /* Opciones del gráfico BAR */
    let options_bar = {
        responsive: true,
        maintainAspectRatio: true,                                                                   // Con esto se ve mejor.
        plugins: {
            legend: {
                display: false,                                                                      // No queremos mostrar la leyenda del dataset.
                position: 'top',
            },
            title: {
                display: true,
                text: 'Productos por Categoría',
                font: {
                    size: 18
                }
            },
        },
    };

    /* Data para el gráfico BAR*/
    let data_bar = {
        labels: arrayResultLabels,
        datasets: [
            {
                // label: 'Dataset 1',              // Es el nombre del dataset si queremos.
                data: arrayResultData,
                backgroundColor: 'rgba(57, 102, 245, 0.5)',
            },                                                                                       // Puede haber otro dataset.
        ],
    };

    /* Opciones del gráfico PIE */
    let options_pie = {
        responsive: true,
        maintainAspectRatio: false,                                                                  // Con esto se ve mejor.
        plugins: {
            legend: {
                display: true,                                                                       // No queremos mostrar la leyenda del dataset.
                position: 'left',
            },
            title: {
                display: true,
                text: 'Productos por Categoría',
                font: {
                    size: 18
                }
            }
        },
    };

    /* Data para el gráfico PIE*/
    let colours = palette('qualitative', arrayResultLabels.length, 2);                               // Largo del array de datos.

    let data_pie = {
        labels: arrayResultLabels,
        datasets: [
            {
                // label: 'Dataset 1',              // Es el nombre del dataset si queremos.
                data: arrayResultData,
                backgroundColor: colours.map(hex => '#' + hex)                                       // Se asigna un color de la paleta a cada categoría.
            },                                                                                       // Puede haber otro dataset.
        ],
    };

    /* Renderizo */
    return (
        <React.Fragment>
            {/* <!-- Seccion 3 --> */}
            <section>
                <h3>Gráficos</h3>
                <hr />
                <div className="container-modificaciones">

                    <div className="grupo-modificaciones">
                        <Bar data={data_bar} options={options_bar} />
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

export default CategoryProductChartWrapper;