import React from 'react';

function UserListWrapper() {
    return (
        <React.Fragment>
            {/* <!-- Seccion 2 --> */}
            <section>
                <h3>Listado de usuarios</h3>
                <hr />
                    <div class="container-tabla">
                        <table role="table">
                            <thead role="rowgroup">
                                <tr role="row">
                                    <th role="columnheader">ID</th>
                                    <th role="columnheader">Nombre</th>
                                    <th role="columnheader">Apellido</th>
                                    <th role="columnheader">Documento</th>
                                    <th role="columnheader">Pais</th>
                                    <th role="columnheader">Domicilio</th>
                                    <th role="columnheader">Nacimiento</th>
                                    <th role="columnheader">Email</th>
                                    <th role="columnheader">Imagen</th>
                                </tr>
                            </thead>
                            <tbody role="rowgroup">
                                <tr role="row">
                                    <td class="td-user" role="cell">1</td>
                                    <td class="td-user" role="cell">Franco</td>
                                    <td class="td-user" role="cell">Ruben</td>
                                    <td class="td-user" role="cell">40789652</td>
                                    <td class="td-user" role="cell">Argentina</td>
                                    <td class="td-user" role="cell">Alvear 1234</td>
                                    <td class="td-user" role="cell">09/10/1995</td>
                                    <td class="td-user" role="cell">franco5123@hotmail.com</td>
                                    <td class="td-user" role="cell">./avatar.jpg</td>
                                </tr>
                                <tr role="row">
                                    <td class="td-user" role="cell">1</td>
                                    <td class="td-user" role="cell">Franco</td>
                                    <td class="td-user" role="cell">Ruben</td>
                                    <td class="td-user" role="cell">40789652</td>
                                    <td class="td-user" role="cell">Argentina</td>
                                    <td class="td-user" role="cell">Alvear 1234</td>
                                    <td class="td-user" role="cell">09/10/1995</td>
                                    <td class="td-user" role="cell">franco5123@hotmail.com</td>
                                    <td class="td-user" role="cell">./avatar.jpg</td>
                                </tr>
                                <tr role="row">
                                    <td class="td-user" role="cell">1</td>
                                    <td class="td-user" role="cell">Franco</td>
                                    <td class="td-user" role="cell">Ruben</td>
                                    <td class="td-user" role="cell">40789652</td>
                                    <td class="td-user" role="cell">Argentina</td>
                                    <td class="td-user" role="cell">Alvear 1234</td>
                                    <td class="td-user" role="cell">09/10/1995</td>
                                    <td class="td-user" role="cell">franco5123@hotmail.com</td>
                                    <td class="td-user" role="cell">./avatar.jpg</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </section>
            {/* <!-- /Seccion 2 --> */}
        </React.Fragment>
    )
}

export default UserListWrapper;