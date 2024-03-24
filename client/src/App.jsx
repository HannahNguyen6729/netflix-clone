import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Watch from './pages/watch/Watch';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { useContext } from 'react';
import { AuthContext } from './authContext/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: '/',
      element: user ? <Home /> : <Register />,
    },
    {
      path: '/register',
      element: !user ? <Register /> : <Home />,
    },
    {
      path: '/login',
      element: !user ? <Login /> : <Home />,
    },
    {
      path: '/movies',
      element: user ? <Home type="movie" /> : <Login />,
    },
    {
      path: '/series',
      element: user ? <Home type="series" /> : <Login />,
    },
    {
      path: '/watch',
      element: user ? <Watch /> : <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
