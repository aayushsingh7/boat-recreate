import React from 'react'
import styles from '../styles/Navbar.module.css'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className={styles.container}>
    <img src="/public/images/logo.png" alt="" />
    <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About</Link></li>
  <li><Link to="/contact">Contact</Link></li>
  {/* <li><Link to="/features">Features</Link></li> */}
  {/* <li><Link to="/products">Products</Link></li> */}
    </ul>
    </nav>
  )
}

export default Navbar