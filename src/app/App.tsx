import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <div className="light">
      <RouterProvider router={router} />
    </div>
  );
}
