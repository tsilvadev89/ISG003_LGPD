import axios from 'axios';
import { authService } from './authService';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/lgpd` || 'http://localhost:3000/api/lgpd';

export const lgpdService = {

  // Método para obter todos os dados do usuário e preparar para download em JSON
  async getAllUserDataFuncionario(userName: string): Promise<void> {
    try {
      const userLogged = authService.getUser();
      if (!userLogged) {
        console.error('Usuário não está logado');
        return;
      }

      // Pega o token do usuário logado
      const token = authService.getToken();
      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      // Faz a requisição para obter os dados do usuário, passando o token no header
      const response = await axios.get(`${BASE_URL}/user/data`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userData = response.data;

      // Cria o arquivo JSON para download com o nome do usuário
      lgpdService.downloadJSON(userData, `${userName}_data_${userLogged.id}.json`);
    } catch (error) {
      console.error('Erro ao obter dados do usuário para LGPD:', error);
    }
  },

  // Função para disparar o download do arquivo JSON
  downloadJSON(jsonContent: any, filename: string): void {
    const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
};
