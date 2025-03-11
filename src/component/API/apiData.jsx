import axios from 'axios'

const api=axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})
export const getJson= async(pageNo)=>{
    try {
        // console.log(pageNo)
        const res= await api.get(`/posts?_start=${pageNo}&_limit=10`)
        return res.status=200 ? res.data :[]
    } catch (error) {
        console.log(error)
    }
}

export const getJosnInd=async(id)=>{
    try {
        // console.log(id)
        const res= await api.get(`/posts/${id}`)
        // console.log(res)
        return res.status==200 ? res.data : [] 
    } catch (error) {
        console.log(error)
    }
}

export const deleteJson=async (id)=>{
    try {
        return  await api.delete(`/posts/${id}`)
    } catch (error) {
        console.log(error)        
    }
}
export const updateJson=async(id)=>{
    try {
        return await api.patch(`/posts/${id}`,{title:"i am updated"})
    } catch (error) {
        console.log(error)
    }
}
// infinity
export const infinityUser=async({pageParam=1})=>{
    try {
        const res= await axios.get(`https://api.github.com/users?per_page=10&page=${pageParam}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}