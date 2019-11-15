import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faChartBar } from '@fortawesome/free-solid-svg-icons';

import Dashboard from '../Dashboard';
import Analytics from '../Analytics';
import { useAuth } from '../../context/useAuthentication';

import logoIcon from '../../assets/images/logo-icon.png';

import './styles.scss';

export default function Home() {

    return (
        <div>
            <Header />
            <Switch>
                <Route path='/analytics'>
                    <Analytics />
                </Route>
                <Route path='/'>
                    <Dashboard />
                </Route>                
                <Redirect path='/' />
            </Switch>
        </div>
    );
}

const Header = withRouter(({history}) => {
    const { unauthenticate } = useAuth();

    return (
        <div className='header'>
            <img className="logo-icon" src={logoIcon} alt="" />
            <div className='title'>PHARMATICA</div>
            <div className='user-details'>
                <div className='level'>1</div>
                <div className='info'>
                    <div className='email'>john.doe@ferma.com</div>
                    <div className='contributions'>Your contributions:<b>100</b></div>
                </div>
                <div className='graph' onClick={() => history.push('/analytics')}><FontAwesomeIcon icon={faChartBar} /></div>
                <div className='logout' onClick={() => unauthenticate()}><FontAwesomeIcon icon={faSignOutAlt} /></div>
            </div>
        </div>
    );
})
