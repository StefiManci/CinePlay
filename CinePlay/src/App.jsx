import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Navigation from "./Components/Navigation"
import Home from "./Paths/Home"
import Movie from "./Paths/Movie"
import Profile from "./Paths/Profile"
import Series from "./Paths/Series"
import Category from "./Paths/Search"
import Search from "./Paths/Search"
import Details from "./Components/Details"

const router=createBrowserRouter([{
  path:"/",
  element:<Navigation></Navigation>,
  children:[
    {
      path:"/",
      element:<Home></Home>,
    },
    {
      path:"/Movies",
      element:<Movie></Movie>
    },
    {
      path:"/Profile",
      element:<Profile></Profile>
    },
    {
      path:"/Series",
      element:<Series></Series>
    },
    {
      path:"/Search",
      element:<Search></Search>
    },
    {
      path:"/Details",
      element:<Details></Details>
    }
  ]
}])



function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
