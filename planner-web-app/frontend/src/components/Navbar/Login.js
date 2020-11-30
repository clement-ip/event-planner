import React, { useContext } from "react";
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

import FormError from './FormErrors';
import { AuthContext } from '../../Context/AuthContext';
import AuthServices from '../../Services/AuthServices';

const Login = (props) => {
    const { register, handleSubmit, errors, setError, clearErrors } = useForm();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const onSubmitHandler = (data) => {
        const { email, password } = data;

        const user = {
            email,
            password
        };
        
        AuthServices.login(user).then(res => {
            if(!(res.isAuthenticated)){
                console.log("login unsucessful")
                {
                    [
                      {
                        type: "incorrect",
                        name: "email",
                        message: "incorrect email or password"
                      },
                      {
                        type: "incorrect",
                        name: "password",
                        message: "incorrect email or password"
                      }
                    ].forEach(({ name, type, message }) =>
                      setError(name, { type, message })
                    );
                }
            } else {
                clearErrors();
                console.log("login successful");
                props.modalRef.current.classList.remove('is-active');
                setIsAuthenticated(true);
                props.history.push('/hero');
            }
        });
    }

    const closeModalHandler = () => {
        clearErrors();
        props.modalRef.current.classList.remove('is-active');
    };

    return (
        // Login Modal
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="modal" ref={props.modalRef}>
                <div onClick={closeModalHandler} className="modal-background"></div>
                <div className="modal-card px-5">
                    {/* Head */}
                    <header className="modal-card-head">
                        <a onClick={closeModalHandler} className="is-white">
                            <span className="icon is-small">
                                <i className="lni lni-close"></i>
                            </span>
                        </a>
                        <p className="modal-card-title has-text-centered is-size-5"><b>Log In</b></p>
                    </header>

                    {/* Body */}
                    <section className="modal-card-body">
                        
                        {/* Email */}
                        <div className="field mx-5">
                            <label className="label">Email</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className={"input py-5 " + (errors.email ? "is-danger" : "")} type="email" placeholder="Email" name="email" ref={register({ required : true, pattern: /^\S+@\S+$/i })}></input>
                                <span className="icon is-left py-5">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <FormError err={errors.email} />
                            </div>
                        </div>
                        {/* Password */}
                        <div className="field mx-5">
                            <label className="label">Password</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className={"input py-5 " + (errors.password ? "is-danger" : "")} type="password" placeholder="Password" name="password" ref={register({ required : true, minLength : 6 })}></input>
                                <span className="icon is-left py-5">
                                    <i className="fas fa-key"></i>
                                </span>
                                <FormError err={errors.password} />
                            </div>
                        </div>

                        <br></br>

                        <div className="field mx-5">
                            <button className="button is-danger is-fullwidth has-shadow py-5">
                                <p className="is-size-4">Submit</p>
                            </button>
                        </div>
                    </section>
                    {/* Foot */}
                    <footer className="modal-card-foot">
                        <p>Don't have an account? <a><u>Sign up</u></a></p>
                    </footer>
                </div>
            </div>
        </form>
    );
}
 
export default withRouter(Login);