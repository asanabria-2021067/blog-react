import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Items from '../pages/Items';
import ItemDetail from '../pages/ItemDetail';
import NotFound from '../pages/NotFound';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/items" element={<Items />} />
      <Route path="/items/:id" element={<ItemDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
