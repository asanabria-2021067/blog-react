import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import AppRouter from './router/AppRouter';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="grain" />
        <Navbar />
        <AppRouter />
      </AppProvider>
    </BrowserRouter>
  );
}
