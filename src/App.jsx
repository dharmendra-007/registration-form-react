import { useState } from 'react'
import './App.css'
import Registration from './components/Registration/Registration'
import Success from './components/success/Success'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
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
