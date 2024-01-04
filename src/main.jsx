import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Root from './Root.jsx'
import './index.css'
import SignUpForm from './SignUp.jsx';
import SignInForm from './Login.jsx';
import Important from './Important.jsx';
import Myday from './Myday.jsx';
import Planned from './Planned.jsx';
import Tasks from './Tasks.jsx';
import Search from './Search.jsx';
import List from './List.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path:'myday',
        element: <Myday />,
      },
      {
        path: 'important',
        element: <Important />,
      },
      {
        path: 'planned',
        element: <Planned />,
      },
      {
        path: 'tasks',
        element: <Tasks />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'list/:id',
        element: <List />,
      }
    ],
  },
  {
    path: '/signin',
    element: <SignInForm />,
  },
  {
    path: '/signup',
    element: <SignUpForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <RouterProvider router={router} />
  
);