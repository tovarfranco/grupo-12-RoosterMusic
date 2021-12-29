import React from 'react';

function ProductList(props) {
    return (
        <React.Fragment>
            {/* <!-- Fila --> */}
            <tr role="row">
                <td className="td-product" role="cell">{props.id_product}</td>
                {/* <td className="td-product" role="cell"><a href={`http://localhost:3000/images/products/${props.image}`} target="_blank">Ver imagen</a></td> */}
                <td className="td-product" role="cell"><a href={`http://localhost:3000/images/products/${props.image}`} target="_blank"><img src={`http://localhost:3000/images/products/${props.image}`} /></a></td>
                <td className="td-product" role="cell">{props.name}</td>
                <td className="td-product" role="cell">{props.price}</td>
                <td className="td-product" role="cell">{props.brand}</td>
                <td className="td-product" role="cell">{props.origin}</td>
                <td className="td-product" role="cell">{props.category.name}</td>
                <td className="td-product" role="cell">{props.campaign.name}</td>
                <td className="td-product" role="cell">{props.availability}</td>
                <td className="td-product" role="cell"><a href={`http://localhost:3000/products/detail/${props.id_product}`} target="_blank">Ir a sitio</a></td>
            </tr>
            {/* <!-- /Fila --> */}
        </React.Fragment>
    )
}

export default ProductList;