import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Dashboard, Login, Register, LandingPage,Chatbox, Transactions, BusinessMetrics} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/ai',
    element: <Chatbox />,
  },
  {
    path: '/transaction-history',
    element: <Transactions/>,
  },
  {
    path: '/business-metrics',
    element: <BusinessMetrics />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
