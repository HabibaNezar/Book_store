import './App.css'
import 'flowbite';
import Home from './Component/Home/Home';
import{QueryClient , QueryClientProvider} from '@tanstack/react-query'
import Navbar from './Component/Navbar/Navbar';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './Component/Layout/Layout';
import Category from './Component/Category/Category';
import Languages from './Component/Languages/Languages';
import CategoryDetails from './Component/Category/CategoryDetails';
import BookDetails from './Component/Home/BookDetails';
import LanguageDetails from './Component/Languages/LanguageDetails';
import Newest from './Component/Newest/Newest';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import UserContextProvider from '../Context/UserContext';

function App() {
  let Query = new QueryClient()
  let router = createBrowserRouter([
    {path:'' , element:<Layout/> , children:[
      {index:true , element:<Login/>},
      {path:'category' , element:<Category/>},
      {path:'categoryDetails/:title' , element:<CategoryDetails/>},
      {path:'languages' , element:<Languages/>},
      {path:'/languageDetails/:lang' , element:<LanguageDetails/>},
      {path:'newest' , element:<Newest/>},
      {path:'home' , element:<Home/>},
      {path:'bookDetails/:bookId' , element:<BookDetails/>},
      {path:'login' , element:<Login/>},
      {path:'register' , element:<Register/>},
    ]}
  ])

  return (
    <>
      <UserContextProvider>
        <QueryClientProvider client={Query}>
          <RouterProvider router={router}>
          </RouterProvider>
        </QueryClientProvider>
      </UserContextProvider>
    </>
  )
}

export default App
