import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../Context/AuthContext';

/* 
    Credit to https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
    for public, private, restricted routing components
*/
const PrivateRoute = ({component: Component, ...rest}) => {
    const { isAuthenticated } = useContext(AuthContext);

    return ( 
        <Route {...rest} render={props => (
            isAuthenticated ? 
                <Component {...props} />
            :   <Redirect to={{
                    pathname: "/",
                    login: true,
                }}/>
        )}/>
    );
}
 
export default PrivateRoute;