import React from 'react'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.header}>Welcome to My App</h1>
        <button className={styles.btn}>Search</button>
      </div>
    </div>
  )
}

export default Header