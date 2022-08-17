import React from 'react';
import { Navbar } from '../../Common';
import './Header.css';
import spanish from './../../Pictures/spanish.png'
import english from './../../Pictures/english.jpeg'
import catalan from './../../Pictures/cat.png'

function Header () {
    return (
        <section className='header'>
            <section className='header-top'>
                {/*<img alt='eng' className='english-flag' src={english}/>
                <img alt='sp' className='spanish-flag' src={spanish}/>
                <img alt='cat' className='cat-flag' src={catalan}/>*/}
                <section className='header-top_navbar'>
                    <section className='header-top_navigation'>
                        <Navbar />
                    </section>              
                </section>  
            </section>
        </section>
    )
}

export default Header;