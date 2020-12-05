import React from 'react';

const Location_Map = (props) => {
    console.log(props)
    return (
        <div className="Location_Card">
            {/* <h1><strong>Country</strong>: {props.location_data.country}<br/></h1>
            <h1><strong>City</strong>: {props.location_data.city}<br/></h1> */}

            <h1><strong>Lat</strong>: {props.location_data.lat}<br/></h1>
            <h1><strong>Lon</strong>: {props.location_data.lon}<br/></h1>
        </div>
    )
}

export default Location_Map;