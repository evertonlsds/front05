import React, { createContext, useState, useContext } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Home from './pages/Home'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';


export const AuthContext = createContext();

function ProtectedRoutes(props) {
    const { token } = useContext(AuthContext);

    return (
        <Route render={() => (token ? props.children : <Redirect to="/" />)} />
    )
}

function Routes() {
    const [token, setToken] = useState('');
    const [perfil, setPerfil] = useState('')
    const [open, setOpen] = useState(false);

    function logIn(newToken, newUser) {
        setToken(newToken);
        setPerfil(newUser);
    }


    function logOut() {
        setToken('')
        setPerfil('');
    }

    return (
        <AuthContext.Provider value={{ token, logIn, logOut, perfil, open, setOpen }}>
            <Router>
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/cadastro" component={SignUp} />
                    <ProtectedRoutes>
                        <Route path="/home" component={Home} />
                    </ProtectedRoutes>
                </Switch>
            </Router>
        </AuthContext.Provider>

    );
}


export default Routes