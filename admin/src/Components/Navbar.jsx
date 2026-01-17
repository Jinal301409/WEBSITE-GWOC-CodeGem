import React, { useState } from 'react'
import { navLinks, styles } from '../assets/dummyadmin.jsx'
import { MdAdminPanelSettings } from "react-icons/md";
import { FiMenu, FiX } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false)
  return (
    <nav className={styles.navWrapper}>
      <div className={styles.navContainer}>
        <div className={styles.logoSection}>
          <MdAdminPanelSettings className={styles.logoIcon} />
          <span className={styles.logoText}>Admin Panel</span>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)}
className={styles.menuButton}>
{menuOpen ? <FiX /> : <FiMenu />}
</button>
<div className={styles.desktopMenu}>
    {navLinks.map(link => (
        <NavLink key={link.name} to={link.href} className={({ isActive }) =>
            `${styles.navLinkBase} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`}>
        {link.icon}
        <span>{link.name}</span>
        </NavLink>
    ))}
</div>
      </div>
      {/* FOR MOBILE VIEW */}
{menuOpen && (
<div className={styles.mobileMenu}>
{navLinks.map(link => (
<NavLink key={link.name} to={link.href}
onClick={() => setMenuOpen(false)}
className={({ isActive }) =>
`${styles.navLinkBase} ${isActive ? styles.navLinkActive : styles. navLinkInactive}`}>
{link.icon}
<span>{link.name}</span>
</NavLink>
))}
</div>
)}
    </nav>
  )
}

export default Navbar
