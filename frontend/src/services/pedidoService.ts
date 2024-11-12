import axios from 'axios';
import { Pedido } from '../models/Pedido';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/pedidos` || 'http://localhost:3000/api/pedidos';

export const pedidoService = {
  async getAllPedidos(): Promise<Pedido[]> {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async getPedidoById(id: number): Promise<Pedido> {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  async createPedido(pedido: Pedido): Promise<void> {
    await axios.post(BASE_URL, pedido);
  },

  async updatePedido(id: number, pedido: Partial<Pedido>): Promise<void> {
    await axios.put(`${BASE_URL}/${id}`, pedido);
  },

  async deletePedido(id: number): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
