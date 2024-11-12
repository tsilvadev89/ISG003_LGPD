import axios from 'axios';
import { Servico } from '../models/Servico';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/servicos` || 'http://localhost:3000/api/servicos';

export const servicoService = {
  async getAllServicos(): Promise<Servico[]> {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async getServicoById(id: number): Promise<Servico> {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  async createServico(servico: Servico): Promise<void> {
    await axios.post(BASE_URL, servico);
  },

  async updateServico(id: number, servico: Partial<Servico>): Promise<void> {
    await axios.put(`${BASE_URL}/${id}`, servico);
  },

  async deleteServico(id: number): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },

  async  getServicosByCategoria(categoriaId: number): Promise<Servico[]> {
    const response = await axios.get(`${BASE_URL}?categoriaId=${categoriaId}`);
    return response.data;
  },
};
