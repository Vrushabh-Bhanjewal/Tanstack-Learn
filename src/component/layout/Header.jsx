import React from 'react'
import style from './header.module.css'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <div className={`${style.container} ${style.header}`}>
      <h1 className={style.logo}>Vrushabh</h1>
      <ul className={style.list}>
        <NavLink to="/"><li>Home</li></NavLink>
        <NavLink to='/trad'><li>FetchOld</li></NavLink>
        <NavLink to="/rq"><li>FetchRq</li></NavLink>
        <NavLink to="/infinity"><li>Infinity Scroll</li></NavLink>
      </ul>
    </div>
  )
}
// className={(isActive)=> isActive && 'active-link'}
export default Header