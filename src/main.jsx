import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider,} from "react-router-dom"
import Root from './Root.jsx'
import './index.css'
import Important from './Important.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/important",
        element: <Important />,
      },
    ],
  },
    ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
