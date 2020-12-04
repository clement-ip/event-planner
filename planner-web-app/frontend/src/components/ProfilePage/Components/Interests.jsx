import React, { useState, useEffect, } from 'react';

const Interests = (props) => {
    return (
        <div className="Interests_Card">
            <h1><strong>Interests</strong>: {props.interests_data}<br/></h1>
        </div>
    )
}

export default Interests;