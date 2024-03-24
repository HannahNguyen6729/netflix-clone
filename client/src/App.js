import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Watch from './pages/Watch';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

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
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
