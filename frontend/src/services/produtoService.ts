import axios from 'axios';
import { Produto } from '../models/Produto';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/produtos` || 'http://localhost:3000/api/produtos';

export const produtoService = {
  async getAllProdutos(): Promise<Produto[]> {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async getProdutoById(id: number): Promise<Produto> {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  async createProduto(produto: Produto): Promise<void> {
    await axios.post(BASE_URL, produto);
  },

  async updateProduto(id: number, produto: Partial<Produto>): Promise<void> {
    await axios.put(`${BASE_URL}/${id}`, produto);
  },

  async deleteProduto(id: number): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
