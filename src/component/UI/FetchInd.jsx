import { useQueries, useQuery } from '@tanstack/react-query'
import React from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { getJosnInd } from '../API/apiData'
import style from '../../pages/fetch.module.css'
function FetchInd() {
    const {id} = useParams()
    const {data,isPending,isLoading,isError,error}=useQuery({
        queryKey:['post',id],
        queryFn:()=>getJosnInd(id),
    })
    // console.log(id)
    if(isPending){
        return <h1 style={{margin:'2rem auto',width:'fit-content'}}>Loading ....</h1>
      }
      if(isError){
        return <h1 style={{margin:'2rem auto',width:'fit-content'}}>Error {error.message}</h1>
      }
  return (
    <div className={style.box}>
        <ul className={`${style.list} ${style.item}`}>
            <p><b>Id : </b>{data.id}</p>
            <p><b>Title </b>{data.title}</p>
            <p><b>Body </b>{data.body}</p>
        </ul>
        <NavLink to="/rq" className={style.btn}>
        <button>Back</button>
        </NavLink>
    </div>
  )
}

export default FetchInd