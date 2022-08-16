import React from 'react';
import './Navbar.css';
import me_pic from '../navbar/prof_pic.png'

function Navbar () {
    return (
        <section className='navbar'>
            <a href="/" className="navbar-item">Home</a>
            <a href="https://github.com/JordiiBru/Car-Trip-Cost-Calc/blob/master/README.md" className="navbar-item">About</a>
            <a href="https://twitter.com/jordi_bru" className="navbar-item">Contact</a>
            <a href="https://github.com/JordiiBru"className='navbar-item'> @JordiiBru</a>
            <section className='navbar-item'>
                <img alt='me' className='profile_pic' src={me_pic} />
            </section>
        </section>
    )
}

export default Navbar;


