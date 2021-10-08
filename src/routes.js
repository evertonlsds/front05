import React, { createContext, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import Home from './pages/Home'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NewClient from './pages/NewClient';
import Clients from './pages/Clients';
import Charges from './pages/Charges';
import NewCharge from './pages/NewCharge';


export const AuthContext = createContext();

function ProtectedRoutes(props) {

    return (
        <Route render={() => (localStorage.getItem('token') ? props.children : <Redirect to="/" />)} />
    )
}

function Routes() {
    const [perfil, setPerfil] = useState('')
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [updateProfileSuccess, setupdateProfileSuccess] = useState(false);

    function logIn(newToken, newUser) {
        setPerfil(newUser);
        localStorage.setItem('token', newToken)
    }


    function logOut() {
        setPerfil('');
        localStorage.removeItem('token');
    }

    return (
        <AuthContext.Provider value={{ logIn, logOut, perfil, setPerfil, open, setOpen, modalOpen, setModalOpen, updateProfileSuccess, setupdateProfileSuccess }}>
            <Router>
                <Switch>
                    <Route path="/" exact component={SignIn} />
                    <Route path="/cadastro" component={SignUp} />
                    <ProtectedRoutes>
                        <Route path="/clients" component={Clients} />
                        <Route path="/charges" component={Charges} />
                        <Route path="/newclient" component={NewClient} />
                        <Route path="/newcharge" component={NewCharge} />
                        <Route path="/home" component={Home} />
                    </ProtectedRoutes>
                </Switch>
            </Router>
        </AuthContext.Provider>

    );
}


export default Routes