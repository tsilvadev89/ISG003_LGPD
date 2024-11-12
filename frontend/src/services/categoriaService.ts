import axios from 'axios';
import { Categoria } from '../models/Categoria';

// Definindo a URL base a partir do .env para Vite
const BASE_URL = `${import.meta.env.VITE_BASE_URL}/categorias` || 'http://localhost:3000/api/categorias';

export const categoriaService = {
  async getAllCategorias(): Promise<Categoria[]> {
    const response = await axios.get(BASE_URL);

    // Se o backend retornar um único objeto em vez de um array, vamos envolvê-lo em um array
    const categorias = Array.isArray(response.data) ? response.data : [response.data];

    return categorias;
  },

  async getCategoriaById(id: number): Promise<Categoria> {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  async createCategoria(categoria: Categoria): Promise<void> {
    await axios.post(BASE_URL, categoria);
  },

  async updateCategoria(id: number, categoria: Partial<Categoria>): Promise<void> {
    await axios.put(`${BASE_URL}/${id}`, categoria);
  },

  async deleteCategoria(id: number): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
