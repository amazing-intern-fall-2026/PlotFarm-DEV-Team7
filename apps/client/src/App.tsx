import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './app/providers/AuthContext';
import { router } from './app/routes/router';

export function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
