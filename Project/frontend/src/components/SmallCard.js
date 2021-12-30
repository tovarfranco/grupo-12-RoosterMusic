import React from 'react';

function SmallCard(props) {
    return (
        <React.Fragment>
            {/* <!-- SmallCard --> */}
            <div className="boton-categoria"><button>{props.name}</button></div>
            {/* <!-- /SmallCard --> */}
        </React.Fragment>
    )
}

export default SmallCard;