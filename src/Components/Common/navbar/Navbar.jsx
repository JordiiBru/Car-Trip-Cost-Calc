import React from 'react';
import './Navbar.css';
import me_pic from '../navbar/profile_git.png'

function Navbar () {
    return (
        <section className='navbar'>
            <a href="/" className="navbar-item">Home</a>
            <a href="/about" className="navbar-item">About</a>
            <a href="/contact" className="navbar-item">Contact</a>
            <section className='navbar-item'> @JordiiBru</section>
            <section className='navbar-item'>
                <img alt='me' className='profile_pic' src={me_pic} />
            </section>
        </section>
    )
}

export default Navbar;


