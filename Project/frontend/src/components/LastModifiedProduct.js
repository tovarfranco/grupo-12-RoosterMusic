import React from 'react';

function LastModifiedProduct(props) {
    return (
        <React.Fragment>
            {/* <!-- Último modificado --> */}
            <article className="modificacion">
                <div className="modificacion-imagen"><img src={props.image} alt="producto" /></div>
                <div className="modificacion-info">
                    <div className="modificacion-descripcion">
                        <h3>{props.name}</h3>
                        <h3>{props.description}</h3>
                    </div>
                    <div className="modificacion-opciones">
                        <ul>
                            <li><a href={props.image} target="_blank" rel="noreferrer">Ver foto</a></li>
                            <li><a href={props.url_site} target="_blank" rel="noreferrer">Ir al sitio</a></li>
                        </ul>
                    </div>
                </div>
            </article>
            {/* <!-- /Último modificado --> */}
        </React.Fragment>
    )
}

export default LastModifiedProduct;