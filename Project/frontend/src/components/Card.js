import React from 'react';

function Card(props) {
    return (
        <React.Fragment>
            {/* <!-- Card --> */}
            <article className="metrica">
                <div className="metrica-descripcion">
                    <h3 className="texto-titulo-metrica">{props.name}</h3>
                    <h4 className="texto-descripcion-metrica">{props.total}</h4>
                </div>
            </article>
            {/* <!-- /Card --> */}
        </React.Fragment>
    )
}

export default Card;