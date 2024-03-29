import React from 'react'
import styles from '../styles/Navbar.module.css'


const Navbar = () => {
  return (
    <nav className={styles.container}>
    <img src="/public/images/logo.png" alt="" />
    <ul>
    <li><a href="#home">Home</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#products">Products</a></li>
  <li><a href="#about">About</a></li>
  <li><a href="#contact">Contact</a></li>
    </ul>
    </nav>
  )
}

export default Navbar