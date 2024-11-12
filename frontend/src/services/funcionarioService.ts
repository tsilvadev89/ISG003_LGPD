import axios from 'axios';
import { Funcionario } from '../models/Funcionario';


const BASE_URL = `${import.meta.env.VITE_BASE_URL}/funcionarios` || 'http://localhost:3000/api/funcionarios';


export const funcionarioService = {
  async getAllFuncionarios(): Promise<Funcionario[]> {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async getFuncionarioById(id: number): Promise<Funcionario> {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  async createFuncionario(funcionario: Funcionario): Promise<void> {
    await axios.post(BASE_URL, funcionario);
  },

  async updateFuncionario(id: number, funcionario: Partial<Funcionario>): Promise<void> {
    await axios.put(`${BASE_URL}/${id}`, funcionario);
  },

  async deleteFuncionario(id: number): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },
};
