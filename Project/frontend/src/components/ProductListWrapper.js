import React from 'react';

function ProductListWrapper() {
    return (
        <React.Fragment>
            {/* <!-- Seccion 2 --> */}
                    <section>
                        <h3>Listado de productos</h3>
                        <hr />
                        <div class="container-tabla">
                            <table role="table">
                                <thead role="rowgroup">
                                    <tr role="row">
                                        <th role="columnheader">ID</th>
                                        <th role="columnheader">Nombre</th>
                                        <th role="columnheader">Precio</th>
                                        <th role="columnheader">Imagen</th>
                                        <th role="columnheader">Marca</th>
                                        <th role="columnheader">Modelo</th>
                                        <th role="columnheader">Origen</th>
                                        <th role="columnheader">Categoria</th>
                                        <th role="columnheader">Campaña</th>
                                        <th role="columnheader">Disponibilidad</th>
                                    </tr>
                                </thead>
                                <tbody role="rowgroup">
                                    <tr role="row">
                                        <td class="td-product" role="cell">1</td>
                                        <td class="td-product" role="cell">Reproductor de Audio</td>
                                        <td class="td-product" role="cell">100.00</td>
                                        <td class="td-product" role="cell">./imagen.jpg</td>
                                        <td class="td-product" role="cell">Winco</td>
                                        <td class="td-product" role="cell">2020</td>
                                        <td class="td-product" role="cell">China</td>
                                        <td class="td-product" role="cell">Audio</td>
                                        <td class="td-product" role="cell">Oferta</td>
                                        <td class="td-product" role="cell">En STOCK</td>
                                    </tr>
                                    <tr role="row">
                                        <td class="td-product" role="cell">1</td>
                                        <td class="td-product" role="cell">Reproductor de Audio</td>
                                        <td class="td-product" role="cell">100.00</td>
                                        <td class="td-product" role="cell">./imagen.jpg</td>
                                        <td class="td-product" role="cell">Winco</td>
                                        <td class="td-product" role="cell">2020</td>
                                        <td class="td-product" role="cell">China</td>
                                        <td class="td-product" role="cell">Audio</td>
                                        <td class="td-product" role="cell">Oferta</td>
                                        <td class="td-product" role="cell">En STOCK</td>
                                    </tr>
                                    <tr role="row">
                                        <td class="td-product" role="cell">1</td>
                                        <td class="td-product" role="cell">Reproductor de Audio</td>
                                        <td class="td-product" role="cell">100.00</td>
                                        <td class="td-product" role="cell">./imagen.jpg</td>
                                        <td class="td-product" role="cell">Winco</td>
                                        <td class="td-product" role="cell">2020</td>
                                        <td class="td-product" role="cell">China</td>
                                        <td class="td-product" role="cell">Audio</td>
                                        <td class="td-product" role="cell">Oferta</td>
                                        <td class="td-product" role="cell">En STOCK</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    {/* <!-- /Seccion 2 --> */}
        </React.Fragment>
    )
}

export default ProductListWrapper;