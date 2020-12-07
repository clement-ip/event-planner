import React from 'react';

const FormError = ({ err }) => {
    if (err) {
        switch (err.type) {
            case "required":
                return (
                    <div>
                        <p className="help is-danger">This is required</p>
                    </div>
                )
            default:
                return null;
        }
    }
    return null;
}

export default FormError;