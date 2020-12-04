import React, { useRef, redirect } from 'react';
import { useHistory } from "react-router-dom";

function SearchBar() {
    const history = useHistory();
    // const navigateTo = () => history.push('/search');
    function navigateTo()
    {
        var name = document.getElementById("search").value;
        history.push('/search/' + name);
    }
  
    
    const searchInputRef = useRef(null);
    const searchIconRef = useRef(null);
    const searchBtnRef = useRef(null);

    // When the search bad is clicked make it bigger
    const searchClickHandler = () => {
        searchIconRef.current.classList.remove('is-small');
        searchInputRef.current.classList.remove('is-small');
        searchBtnRef.current.classList.remove('is-small');
    }

    // Search bar normal sized when unclicked
    const searchBlurkHandler = () => {
        searchIconRef.current.classList.add('is-small');
        searchInputRef.current.classList.add('is-small');
        searchBtnRef.current.classList.add('is-small');
    }

    return (
        <div className="navbar-item">
            <div  className="field has-addons">
                <p className="control">
                    <input id="search" onClick={searchClickHandler} onBlur={searchBlurkHandler} className="input is-small is-rounded" type="text" ref={searchInputRef} placeholder="Search" style={{width: "254px"}} />
                </p>
                <a className="button is-small is-primary is-rounded" onClick={() => navigateTo()} ref={searchBtnRef} style={{borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px"}}>
                    <span className="icon is-small is-left" ref={searchIconRef}>
                        <i className="fas fa-search"></i>
                    </span>
                </a>
            </div>
        </div>
    );
}


export default SearchBar;