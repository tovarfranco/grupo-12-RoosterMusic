import React from 'react';

function ProductList(props) {
    return (
        <React.Fragment>
            {/* <!-- Fila --> */}
            <tr role="row">
                <td className="td-product" role="cell">{props.id_product}</td>
                <td className="td-product" role="cell"><a href={props.image} target="_blank" rel="noreferrer"><img src={props.image} alt="producto" /></a></td>
                <td className="td-product" role="cell">{props.name}</td>
                <td className="td-product" role="cell">{props.price}</td>
                <td className="td-product" role="cell">{props.brand}</td>
                <td className="td-product" role="cell">{props.origin}</td>
                <td className="td-product" role="cell">{props.category.name}</td>
                <td className="td-product" role="cell">{props.campaign.name}</td>
                <td className="td-product" role="cell">{props.availability}</td>
                <td className="td-product" role="cell"><a href={props.url_site} target="_blank" rel="noreferrer">Ir a sitio</a></td>
            </tr>
            {/* <!-- /Fila --> */}
        </React.Fragment>
    )
}

export default ProductList;