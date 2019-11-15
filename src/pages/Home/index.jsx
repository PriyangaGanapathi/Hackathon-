import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../Dashboard';


import './styles.scss';

export default function Home() {

    return (
        <div>
            <Header/>
            <Switch>                
                <Route path='/'>
                    <Dashboard/>
                </Route>
                <Redirect path='/'/>
            </Switch>
        </div>
    );
}

function Header() {
    return (
        <div class='header'>            
            <div class='title'>FERMA KG VERIFICATION TOOL</div>
        </div>
    );
}