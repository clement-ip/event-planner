import React, { useState, useEffect, } from 'react';

const Skills = (props) => {
    const [data, setData] = useState({
        skills:''
    })

    useEffect(()=> {
        const skills_info = props.skills;
        setData({ skills:skills_info });
    }, [])

    return (
        <div className="Skills_Card">
            <h1>Skills</h1>
            <p>{data.skills}</p>
        </div>
    )
}

export default Skills;