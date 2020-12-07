import React, {useEffect, useState, useRef } from "react";
<<<<<<< HEAD
=======
import axios from "axios";

import Calendar from '../Calendar/Calendar'
>>>>>>> 6bd81e1... adding panel functionality
import './EventForm.css';
import './EventFormBulma.sass';
import EventForm from "./EventForm";

function EventCalendar(){

    const formRefs = {
        title : useRef(null),
        description : useRef(null),
        duration : useRef(null),
        contact : useRef(null)
    }

    const panels = ['title', 'description', 'duration', 'contact'];
    const [panelsIdx, setPanelIdx] = useState(0);

    const submitBtnRef = useRef(null);
    const nextBtnRef = useRef(null);
    const backBtnRef = useRef(null);
    const fullFormRef = useRef(null);

    useEffect(() => {
        backBtnRef.current.classList.add('is-hidden');
        nextBtnRef.current.classList.remove('is-hidden');
        submitBtnRef.current.classList.add('is-hidden');
    }, [])

    const nextBtnHandler = () => {
        const panel = panels[panelsIdx + 1];
        updatePanel(panel);
        setPanelIdx(panelsIdx + 1)
    }

    const backBtnHandler = () => {
        const panel = panels[panelsIdx - 1];
        updatePanel(panel);
        setPanelIdx(panelsIdx - 1)
    }

    const panelHandler = event => {
        const panel = event.target.name;
        updatePanel(panel);
        const idx = panels.findIndex((e) => e === panel);
        setPanelIdx(idx);
    }

    const updatePanel = panel => {
        Object.keys(formRefs).map(key => {
            key === panel ? 
                formRefs[key].current.classList.remove('is-hidden')
            :   formRefs[key].current.classList.add('is-hidden')
        })
        updateNavBtns(panel)
    }

    const updateNavBtns = panel => {
        if(panel === "title") {
            nextBtnRef.current.classList.remove('is-hidden');
            backBtnRef.current.classList.add('is-hidden');
            submitBtnRef.current.classList.add('is-hidden');
        } else if (panel === "contact") {
            nextBtnRef.current.classList.add('is-hidden');
            backBtnRef.current.classList.remove('is-hidden');
            submitBtnRef.current.classList.remove('is-hidden');
        } else {
            nextBtnRef.current.classList.remove('is-hidden');
            backBtnRef.current.classList.remove('is-hidden');
            submitBtnRef.current.classList.add('is-hidden');
        }
    }

    return(
        <div className="columns" style={{minHeight : "96vh"}}>
            <div className="column is-one-fifth has-background-white-bis">
                <div className="menu px-3">
                    <p className="menu-label my-0 is-size-3">Create Event</p>
                    <ul className="menu-list ml-4">
                        <li>
                            <ul>
                                <li><a onClick={panelHandler} name="title">Title</a></li>
                                <li><a onClick={panelHandler} name="duration">Duration</a></li>
                                <li><a onClick={panelHandler} name="description">Description</a></li>
                                <li><a onClick={panelHandler} name="contact">Contact</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>  
            </div>
            <div className="column card" style={{display: "flex", flexDirection: "column"}}>
                <div className="columns">
                    <div className="column is-5 is-offset-one-quarter">
                        <div className="container is-5">
                            <EventForm formRefs={formRefs} fullFormRef={fullFormRef}></EventForm>
                        </div>
                    </div>
                </div>
                <div style={{marginTop : "auto"}}>
                    <hr className="my-0"></hr>
                    <div className="navbar">
                        <div className="navbar-menu is-active">
                            <div className="navbar-start">
                                <div className="navbar-item" ref={backBtnRef}>
                                    <a onClick={backBtnHandler} className="button is-primary is-outlined">
                                        Back
                                    </a>
                                </div>
                            </div>
                            <div className="navbar-end">
                                <div className="navbar-item" ref={nextBtnRef}>
                                    <a onClick={nextBtnHandler} className="button is-primary">
                                        Next
                                    </a>
                                </div>
                                <div className="navbar-item" ref={submitBtnRef}>
                                    <button className="button is-primary" type="submit" form="createEventForm">
                                        <b>Submit</b>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCalendar;