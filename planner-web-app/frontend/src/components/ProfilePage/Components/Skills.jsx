import React, { useState, useEffect, } from 'react';

const Skills = (props) => {
    return (
        <div className="Skills_Card">
            <h1><strong>Skills</strong>: {props.skills_data}<br/></h1>
        </div>
    )
}

export default Skills;