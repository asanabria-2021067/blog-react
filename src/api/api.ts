import axios from 'axios';
import type { Item } from '../types/item';

const api = axios.create({
  baseURL: 'https://backend-blog-mu.vercel.app',
});

// Deterministic price based on item id
function assignPrice(item: Item): Item {
  if (item.price != null) return item;
  const base = 9.99 + ((item.id * 13 + 7) % 40);
  return { ...item, price: Math.round(base * 100) / 100 };
}

export async function fetchItems(): Promise<Item[]> {
  const { data } = await api.get<Item[]>('/items');
  return data.map(assignPrice);
}

export async function fetchItemById(id: number): Promise<Item> {
  const { data } = await api.get<Item>(`/items/${id}`);
  return assignPrice(data);
}

export default api;
