import React, { useEffect, useState } from 'react'
import { getJson } from '../component/API/apiData'
import style from './fetch.module.css'

function FetchOld() {
  const [data,setData] =useState([])
  const [isError,setError] =useState(false)
  const [isLoading,setLoading] =useState(true)

  const getData = async()=>{
    try{
      const res=await getJson()
      console.log(res.data)
      if(res.status==200){
        setData(res.data)
        setLoading(false)
      }
    }catch(error){
      setLoading(false)
      setError(true)
      console.log(error)
      console.log(error.message)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  if(isLoading){
    return <h1>Loading...</h1>
  }
  if(isError){
    return <h1>Error...</h1>
  }
  return (
    <div className={`${style.container} ${style.box}`}>
      <ul className={style.list}>
        {
          data.map(curr=>{
            return <li key={curr.id} className={style.item}>
              <p> <b>Title </b>{curr.title}</p>
              <p><b>Body </b>{curr.body}</p>
            </li>
          })
        }
      </ul>
    </div>
  )
}

export default FetchOld