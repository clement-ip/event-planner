import React, { useState, useEffect, } from 'react';

const GenericProfileSection = (props) => {
    return (
        <div className="card" key={props.section_data.name}>
            <header class="card-header">
                <p class="card-header-title">
                    <h1><strong>{props.section_data.name}</strong>:</h1>
                </p>
                {/* <a href="#" class="card-header-icon">
                    <a class="card-header-icon card-toggle">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </a>
                </a> */}
            </header>
            <div class="card-content">
                <div class="content">
                    {props.section_data.data_body}<br/>
                </div>
            </div>
        </div>
    )
}

export default GenericProfileSection;