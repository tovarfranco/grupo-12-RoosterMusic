import React from 'react';
import { useEffect, useState, useRef } from 'react';                                                         // useState es para poder darle estados a los componentes FUNCIONALES (no de clase). useEffect es par poder manejar el ciclo de ida para componentes FUNCIOANLES y useRef sirve para seleccionar elementos del DOm muy parecido a los selectores de JS.


function Search(props) {

    /* Valores iniciales */
    const [products, setProducts] = useState([]);                                                            // useState genera un ARRAY de 2 posiciones. La 1° es una variable que tiene el valor definido. La 2° es una FUNCION que permitirá setear un nuevo valor a la variable anterior. En este caso lavarialbe tiene un array [].
    const [nombre, setNombre] = useState('vacio');

    /* DidMount pero con Hook. */
    useEffect(() => {                                                                                        // Recibe un callback y un array de dependencias. El "DidMount" recibe SIEMPRE un array vacío, indicando que no mira ninguna dependencia/variable de seguimiento.
        console.log('%cSe montó el componente - DidMount', 'color: green');
        fetch('/api/products/search?keyword=bajo')                                                           // Obtención de datos.
            .then(response => response.json())
            .then(data => {
                setProducts(data.data)
            })
            .catch(error => console.log(error));
    }, []);

    /* DidUpdate pero con Hook. */
    useEffect(() => {                                                                                        // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        console.log('%cSe actualizó el componente - DidUpdate', 'color: blue');
    }, [products]);                                                                                          // SUPER IMPORTANTE, daremos seguimiento al estado de esta variable.

    /* WillUnmount pero con Hook. */
    useEffect(() => {                                                                                        // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        return () => console.log('%cSe desmontó el componente - WillUnmount', 'color: red');                 // RETORNA UNA FUNCION SIEMPRE.
    }, []);                                                                                                  // SUPER IMPORTANTE este array vacío

    /* Uso del useRef para seleccionar/cambiar elementos del DOM */
    /* useRef es MAS PERFORMANCE que el de JSnormal */
    let busqueda = useRef();                                                                                 // Definimos una variable donde guardaremos el resultado de nuestro querySelector. Pero qué seleccionamos? En el HTML veremos una etiqueta que tiene ref={}. Esta variable es un objeto literal con clave: CURRENT.

    const buscar = (e) => {
        e.preventDefault();

        setNombre(busqueda.current.value);														             // IMPORTANTE! este valor cambiará en la próxima renderización. NO DENTRO DE ESTA FUNCION. Igualmente no lo usamospara nada.

        fetch(`/api/products/search?keyword=${busqueda.current.value}`)		                                 // Debe usar este valor actual. Nombre no sirve porque en la próxima renderización cambiará su valor.
            .then(response => response.json())
            .then(data => {
                data.data.length > 0 ? setProducts(data.data) : setProducts([]);
            })
            .catch(error => console.log(error));

        //busqueda.current.value = '';                                                     		             // Reseteo el input.
    }

    return (
        <React.Fragment>
            {/* <!-- Buscador --> */}
            <form method="GET">
                <div className="form-group">
                    <label className="label-buscar">Buscar por nombre:</label>
                    <input type="text" className="control" ref={busqueda} />
                </div>
                <button className="boton-buscar" onClick={buscar}>Buscar</button>
            </form>
            {/* <!-- /Buscador --> */}

            {/* <!-- Resultados --> */}
            <section>
                {nombre !== 'vacio' &&
                    <div>
                        <h3>Productos por el nombre: {nombre}</h3>
                        <div className="container-articulos">
                            {
                                products.length > 0 && nombre !== '' && products.map((product, i) => {
                                    return (
                                        <article className="articulo" key={i}>
                                            <div className="articulo-imagen"><img src={`http://localhost:3000/images/products/${product.image}`} alt="producto" /></div>
                                            <hr />
                                            <div className="articulo-descripcion">
                                                <h3 className="texto-titulo-articulo">{product.brand}</h3>
                                                <h4 className="texto-descripcion-articulo">{product.name}</h4>
                                                <h3 className="texto-precio-articulo">U$S {product.price}</h3>
                                                <a className="a-sitio" href={`http://localhost:3000/products/detail/${product.id_product}`} target="_blank" rel="noreferrer">Ir al sitio</a>
                                            </div>
                                        </article>
                                    )
                                })
                            }
                            {(products.length === 0 || nombre === '') && <div className="no-match">No se encontraron productos</div>}
                        </div>
                    </div>
                }
            </section>
            {/* <!-- /Resultados --> */}
        </React.Fragment>
    )
}

export default Search;