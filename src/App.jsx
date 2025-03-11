import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import MainLayout from './component/layout/MainLayout'
import FetchOld from './pages/FetchOld'
import FetchRq from './pages/FetchRq'
import Home from './pages/home'
import FetchInd from './component/UI/FetchInd'
import InfinityScroll from './pages/InfinityScroll'

const router=createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/trad',
        element:<FetchOld/>
      },
      {
        path:'/rq',
        element:<FetchRq/>
      },
      {
        path:'/rq/:id',
        element:<FetchInd/>
      },
      {
        path:'/infinity',
        element:<InfinityScroll/>
      },
    ]
  },
])

function App() {
  const queryClient= new QueryClient()
  return (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  )
}

export default App
