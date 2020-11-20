import React from 'react';

const Icon = () => {
    return (
        <span className="icon is-right py-5">
            <i className="fas fa-exclamation-triangle"></i>
        </span>
    )
}

const FormError = ({ err }) => {
    if (err) {
        switch (err.type) {
            case "required":
                return (
                    <div>
                        <p className="help is-danger">This is required</p>
                        <Icon />
                    </div>
                )
            case "pattern":
                return (
                    <div>
                        <p className="help is-danger">Please enter a valid email address</p>
                        <Icon />
                    </div>
                )
            case "minLength":
                return (
                    <div>
                        <p className="help is-danger">Password must be atleast 6 characters long</p>
                        <Icon />
                    </div>
                )
            case "mismatch":
                return (
                    <div>
                        <p className="help is-danger">Passwords do not match</p>
                        <Icon />
                    </div>
                )
            case "taken":
                return (
                    <div>
                        <p className="help is-danger">Email is already taken</p>
                        <Icon />
                    </div>
                )
            case "incorrect":
                return (
                    <div>
                        <p className="help is-danger">Incorrect email or password</p>
                        <Icon />
                    </div>
                )
            default:
                return null;
        }
    }
    return null;
}
 
export default FormError;