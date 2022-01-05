import React from 'react';

function UserList(props) {
    return (
        <React.Fragment>
            {/* <!-- Fila --> */}
            <tr role="row">
                <td className="td-user" role="cell">{props.id_user}</td>
                <td className="td-user" role="cell">{props.name}</td>
                <td className="td-user" role="cell">{props.surname}</td>
                <td className="td-user" role="cell">{props.document}</td>
                <td className="td-user" role="cell">{props.country}</td>
                <td className="td-user" role="cell">{props.address}</td>
                <td className="td-user" role="cell">{props.email}</td>
                {/* <td className="td-user" role="cell">{props.img}</td> */}
                <td className="td-user" role="cell"><img src={`http://localhost:3000/images/users/${props.img}`} alt="usuario"/></td>
            </tr>
        </React.Fragment>
    )
}

export default UserList;