import axios from 'axios';
import { Cliente } from '../models/Cliente';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/clientes` || 'http://localhost:3000/api/clientes';

export const clienteService = {
  async getAllClientes(): Promise<Cliente[]> {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async getClienteById(id: number): Promise<Cliente> {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  async createCliente(cliente: Cliente): Promise<void> {
    await axios.post(BASE_URL, cliente);
  },

  async updateCliente(id: number, cliente: Partial<Cliente>): Promise<void> {
    await axios.put(`${BASE_URL}/${id}`, cliente);
  },

  async deleteCliente(id: number): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
