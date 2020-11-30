import React, { useState, useEffect, } from 'react';

const Interests = (props) => {
    const [data, setData] = useState({
        Interests:''
    })

    useEffect(()=> {
        const interests_info = props.Interests;
        setData({ interests:interests_info });

    },[])
    return (
        <div className="Interests_Card">
            <h1>Interests</h1>
            <p>{data.interests}</p>
        </div>
    )
}

export default Interests;