import React, { useContext } from 'react';
import { AuthContext } from "../Context/AuthContext";

const Footer = () => {
    const {user} = useContext(AuthContext);
    return (
        <footer className="footer">
            <div className="container">
                <div className="columns">
                    <div className="column is-one-third">
                        <p className="is-size-3"><b>Timinar</b></p>
                        <p className="has-text-grey">Connecting People in Time of Need.</p>
                    </div>
                    <div className="column is-2 mt-2">
                        <p><strong>Explore</strong></p>
                        <p className="is-size-7"><a href='/' className="has-text-grey">Home</a></p>
                        <p className="is-size-7"><a href={`/viewProfile/${user.userID}`} className="has-text-grey">Profile</a></p>
                        <p className="is-size-7"><a href='/about' className="has-text-grey">About</a></p>
                    </div>
                    <div className="column is-3 mt-2">
                        <p><strong>Connect</strong></p>
                        <p className="is-size-7">
                            <span className="icon">
                                <i className="fab fa-github-alt"></i>
                            </span>
                            <a href="https://csil-git1.cs.surrey.sfu.ca/kci1/470-planner-web-app" className="has-text-grey">
                                Gitlab
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;