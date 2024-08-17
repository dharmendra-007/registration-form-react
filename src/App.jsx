import { useState } from 'react'
import './App.css'
import Registration from './components/Registration/Registration'
import Success from './components/success/Success'
import Login from './components/Login/Login'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "register",
    element: <Registration/>,
  },
  {
    path: "success",
    element: <Success/>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
