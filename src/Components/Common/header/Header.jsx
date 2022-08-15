import React from 'react';
import { Navbar } from '../../Common';
import './Header.css';
import logo from '../header/dgt.png';

function Header () {
    return (
        <section className='header'>
            <section className='header-top'>
                 {/*<section className='header-top_logo'>
                    <img alt='logo' className='header-logo' src={logo}/>
                </section> */}
                <section className='header-top_navbar'>
                    <section className='header-top_navigation'>
                        <Navbar />
                    </section>              
                </section>  
            </section>
            {/*<hr className="header-top_seperator" />*/}
        </section>
    )
}

export default Header;