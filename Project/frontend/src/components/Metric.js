import React from 'react';

function Metric(props) {
    return (
        <React.Fragment>
            {/* <!-- Metrica --> */}
            <article className="metrica">
                <div className="metrica-imagen"><i className={`fas ${props.icon}`}></i></div>
                <div className="metrica-descripcion">
                    <h3 className="texto-titulo-metrica">{props.name}</h3>
                    <h4 className="texto-descripcion-metrica">{props.total}</h4>
                </div>
            </article>
            {/* <!-- /Metrica --> */}
        </React.Fragment>
    )
}

export default Metric;