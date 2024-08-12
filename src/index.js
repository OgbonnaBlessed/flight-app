import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter as Router,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { AuthProvider } from './AuthContext';
import Things from './Pages/Things';
import Packages from './Pages/Packages';
import Stays from './Pages/Stays';
import MultiCity from './Pages/MultiCity';
import OneWay from './Pages/OneWay';
import RoundTrip from './Pages/RoundTrip';
import Search from './Pages/Search';
import Favorites from './Pages/Favorites';
import Trips from './Pages/Trips';
import SearchStay from './Pages/SearchStay';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/stays",
    element: <Stays />,
  },
  {
    path: "/flights/round",
    element: <RoundTrip />,
  },
  {
    path: "/packages",
    element: <Packages />,
  },
  {
    path: "/things",
    element: <Things />,
  },
  {
    path: "/flights/multi",
    element: <MultiCity />
  },
  {
    path: "/flights/oneway",
    element: <OneWay />
  },
  {
    path: "/flights/round",
    element: <RoundTrip />
  },
  {
    path: "/search",
    element: <Search />
  },
  {
    path: "/favorites",
    element: <Favorites />
  },
  {
    path: "/trips",
    element: <Trips />
  },
  {
    path: "/search-stays",
    element: <SearchStay />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);