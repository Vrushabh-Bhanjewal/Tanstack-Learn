import { deleteJson, getJson, updateJson } from '../component/API/apiData'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import style from './fetch.module.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

function FetchRq() {
  
  const [pageNo, setPageNo] =useState(0)

  const {data,isPending,isError,error}= useQuery({
    queryKey:['post',pageNo],
    queryFn:()=>getJson(pageNo),
    gcTime:200000,
    staleTime:10000,
    placeholderData:keepPreviousData,
    // refetchInterval:1000,
    // refetchIntervalInBackground:true,
  })
  // delete data
  const queryClient=useQueryClient()
  
  const deletePost= useMutation({
    mutationFn:(id)=>deleteJson(id),
    onSuccess:(res,id)=>{
      // console.log(res,id)
      queryClient.setQueryData(['post',pageNo],(curr)=>{
        return curr.filter((data)=>data.id!=id)
      })
    }
  })
// Update Post
  const updatePost=useMutation({
    mutationFn:(id)=>updateJson(id),
    onSuccess:((res,id)=>{
      queryClient.setQueryData(['post',pageNo],(curr)=>{
        // console.log(curr,res,id)
        return curr.map(data=>data.id==id ? {...data,title:res.data.title}:data )
      })
    })
  })
  if(isPending){
    return <h1 style={{margin:'2rem auto',width:'fit-content'}}>Loading ....</h1>
  }
  if(isError){
    return <h1 style={{margin:'2rem auto',width:'fit-content'}}>Error {error.message}</h1>
  }
  return (
    <div className={`${style.container} ${style.box}`}>
      <ul className={style.list}>
        {
          data?.map(curr=>{
            return <li key={curr.id} className={style.item}>
              <NavLink to={`/rq/${curr.id}`}>
                <p><b>ID : </b>{curr.id}</p>
                <p><b>Title : </b>{curr.title}</p>
                <p><b>Body : </b>{curr.body}</p>
              </NavLink>
              <button onClick={()=>deletePost.mutate(curr.id)} className={style.del} >Delete</button>
              <button onClick={()=>updatePost.mutate(curr.id)} className={style.del} >Update</button>
            </li>
          })
        }
      </ul>
      <div className={style.page}>
        <button disabled={pageNo==0?true:false} onClick={()=>setPageNo(prev=>prev-10)}>Prev</button>
        <p>{pageNo/10 +1}</p>
        <button disabled={(pageNo/10)==9?true:false} onClick={()=>setPageNo(prev=>prev+10)}>Next</button>
      </div>
    </div>
  )
}

export default FetchRq