import axios from 'axios';
import type { Item } from '../types/item';

const api = axios.create({
  baseURL: 'https://backend-blog-mu.vercel.app',
});

export async function fetchItems(): Promise<Item[]> {
  const { data } = await api.get<Item[]>('/items');
  return data;
}

export async function fetchItemById(id: number): Promise<Item> {
  const { data } = await api.get<Item>(`/items/${id}`);
  return data;
}

export default api;
