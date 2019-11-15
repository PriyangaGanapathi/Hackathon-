import React from 'react';
import { Switch, Route, Redirect, withRouter, Link } from 'react-router-dom';
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
                {/* <Redirect path='/' /> */}
            </Switch>
        </div>
    );
}

const Header = withRouter(({history}) => {
    const { unauthenticate, contributions, username, email, level } = useAuth();

    return (
        <div className='header'>
            <img className="logo-icon" src={logoIcon} alt="" />
             <Link to="/">
              <div className='title'>PHARMATICA</div>
             </Link>
            <div className='user-details'>
                <div className='level'>{level}</div>
                <div className='info'>
                    <div className='email'>{email}</div>
                    <div className='contributions'>Your contributions:<b>{contributions}</b></div>
                </div>
                <div className='graph' onClick={() => history.push('/analytics')}><FontAwesomeIcon icon={faChartBar} /></div>
                <div className='logout' onClick={() => unauthenticate()}><FontAwesomeIcon icon={faSignOutAlt} /></div>
        </div>
      </div>
    );
})
