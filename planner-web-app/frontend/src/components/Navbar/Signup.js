import React, { useContext } from "react";
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

import FormError from './FormErrors';
import { AuthContext } from '../../Context/AuthContext';
import AuthServices from '../../Services/AuthServices';

const Signup = (props) => {
    const { register, handleSubmit, errors, setError, clearErrors } = useForm();
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const onSubmitHandler = (data) => {
        const { name, email, password, password2 } = data;

        if(password !== password2) {
            setError("password2", {
                type: "mismatch",
                message: "password must match"
            });
        } else {
            const user = {
                name,
                email,
                password
            };

            AuthServices.register(user).then(({message}) => {
                const { msgBody, msgError} = message;
                if(msgError){
                    if(msgBody === "Email is already taken") {
                        setError("email", {
                            type: "taken",
                            message: msgBody
                        });
                    }
                } else {
                    console.log(msgBody);
                    clearErrors();
                    props.modalRef.current.classList.remove('is-active');
                    setIsAuthenticated(true);
                    props.history.push('/hero');
                }
            });
        }
    }

    const closeModalHandler = () => {
        clearErrors();
        props.modalRef.current.classList.remove('is-active');
    };

    return (
        // Signup Modal
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
                        <p className="modal-card-title has-text-centered is-size-5"><b>Sign Up</b></p>
                    </header>

                    {/* Body */}
                    <section className="modal-card-body">
                        {/* Name */}
                        <div className="field mx-5">
                            <label className="label">Name</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className={"input py-5 " + (errors.name ? "is-danger" : "")} type="text" placeholder="Full name" name="name" ref={register({ required: true })}></input>
                                <span className="icon is-left py-5">
                                    <i className="fas fa-user"></i>
                                </span>
                                <FormError err={errors.name} />
                            </div>
                        </div>
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

                        <div className="field mx-5">
                            <label className="label">Confirm password</label>
                            <div className="control has-icons-left has-icons-right">
                                <input className={"input py-5 " + (errors.password2 ? "is-danger" : "")} type="password" placeholder="Password" name="password2" ref={register({ required : true, minLength : 6 })}></input>
                                <span className="icon is-left py-5">
                                    <i className="fas fa-key"></i>
                                </span>
                                <FormError err={errors.password2} />
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
                        <p>Already have an account? <a><u>Log in</u></a></p>
                    </footer>
                </div>
            </div>
        </form>
    );
}

export default withRouter(Signup);