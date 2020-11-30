import React, { useState, useContext, useEffect, } from 'react';

const About = (props) => {
    return (
        <div className="About_Card">
            <h1><strong>About</strong>: {props.about_data}<br/></h1>
        </div>
    )
}

export default About;