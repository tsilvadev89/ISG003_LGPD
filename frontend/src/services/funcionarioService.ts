import axios from 'axios';
import { Funcionario } from '../models/Funcionario';
import { authService } from './authService';


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

    // Função que verifica se o usuário logado é um funcionário
    async isFuncionario(): Promise<boolean> {
      try {
        const userLogged = authService.getUser();
        if (!userLogged) return false;
  
        // Obtém a lista de funcionários
        const funcionarios = await this.getAllFuncionarios();
  
        // Verifica se existe um funcionário com o mesmo id e email
        return funcionarios.some(
          (funcionario) =>
            funcionario.funcionario_id === userLogged.id &&
            funcionario.email === userLogged.email
        );
      } catch (error) {
        console.error('Erro ao verificar se o usuário é um funcionário:', error);
        return false;
      }
    }
    
};
