import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Watch from './pages/watch/Watch';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';

const user = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/register',
    element: !user ? <Register /> : <Home />,
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
