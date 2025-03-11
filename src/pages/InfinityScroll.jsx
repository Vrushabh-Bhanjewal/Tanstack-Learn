
import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { infinityUser } from '../component/API/apiData'
import style from './fetch.module.css'
import {useInView} from 'react-intersection-observer'

function InfinityScroll() {

    const {data, hasNextPage,fetchNextPage,status,isFetchingNextPage}=useInfiniteQuery({
        queryKey:['user'],
        queryFn:infinityUser,
        getNextPageParam:(lastPage,allPages)=>{
            // console.log("last page: ",lastPage,allPages)
            return lastPage.length == 10 ? allPages.length + 1 : undefined  
        }
    })

    // console.log(data)

    // const handleUserScroll=()=>{
    //     const bottom=window.scrollY + window.innerHeight >= document.documentElement.scrollHeight -1;
    //     if(bottom && hasNextPage){
    //         fetchNextPage()
    //     }
    // }
    const {ref,inView} = useInView({
        threshold:1
    })
    useEffect(()=>{
        // window.addEventListener('scroll',handleUserScroll)
        // return ()=> window.removeEventListener('scroll',handleUserScroll)
        if(inView && hasNextPage){
            fetchNextPage()
        }
    },[inView,fetchNextPage, hasNextPage])

    if(status=='loading'){
        return <h1 style={{margin:'2rem auto',width:'fit-content'}}>Loading ....</h1>
    }
    if(status =='error'){
        return <h1 style={{margin:'2rem auto',width:'fit-content'}}>Error {error.message}</h1>
    }
  return (
    <div>
    <div className={style['grid-two']}>
        {
            data?.pages.map((page)=>{
                return page.map(curr=>{
                    return <div className={style.user}>
                        <img src={curr.avatar_url} width="200px" alt={curr.login} />
                        <p>{curr.login}</p>
                    </div>
                })
            })
        }
        
    </div>
    <div ref={ref}>
        {/* {isFetchingNextPage && <h2 style={{textAlign:'center'}}>loading...</h2>} */}
        <h2 style={{textAlign:'center'}}>
            {isFetchingNextPage ? 'Loading More ...': hasNextPage ? "Scroll For More": "No Data"}
        </h2>
    </div>
    </div>
  )
}
export default InfinityScroll