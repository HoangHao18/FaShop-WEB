import React from 'react';
import './layout.css';

import Sidebar from '../Sidebar/Sidebar';
import TopNav from '../TopNav/TopNav';
import Routes from '../Routes';

import { BrowserRouter, Route } from 'react-router-dom';

const Layout = () => {
    return(
        <BrowserRouter>
            <Route render={ (props) => (
                <div className='layout'>
                    <Sidebar {...props}/>
                    <div className='layout__content'>
                        <TopNav/>
                        <div className='layout__content-main'>
                            <Routes/>
                        </div>
                    </div>
                </div>
            )

            }/>
        </BrowserRouter>
    )
}

export default Layout;