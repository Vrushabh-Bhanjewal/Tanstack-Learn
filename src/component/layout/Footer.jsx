import React from 'react'
import style from './header.module.css'
import { NavLink } from 'react-router-dom'
function Footer() {
  return (
    <div>
      <div className={`${style.container} ${style.header} ${style.footer}`}>
      <h1 className={style.logo}>@Vrushabh copyright </h1>
      <ul className={style.list}>
        <NavLink to="/"><li>Home</li></NavLink>
        <NavLink to='/trad'><li>FetchOld</li></NavLink>
        <NavLink to="/rq"><li>FetchRq</li></NavLink>
        <NavLink to="/infinity"><li>FetchRq</li></NavLink>
      </ul>
    </div>
    </div>
  )
}

export default Footer