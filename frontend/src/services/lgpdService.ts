import axios from 'axios';
import { authService } from './authService ';


const BASE_URL = `${import.meta.env.VITE_BASE_URL}/lgpd` || 'http://localhost:3000/api/lgpd';

export const lgpdService = {

  // Método para obter todos os dados do usuário e preparar para download em CSV
  async getAllUserDataFuncionario(): Promise<void> {
    try {
      const userLogged = authService.getUser();
      if (!userLogged) {
        console.error('Usuário não está logado');
        return;
      }

      // Faz requisição para obter todos os dados relacionados ao usuário logado
      const response = await axios.get(`${BASE_URL}/${userLogged.id}/dados`);
      const userData = response.data;

      // Converte os dados para formato CSV
      const csvData = lgpdService.convertToCSV(userData);

      // Cria o arquivo para download
      lgpdService.downloadCSV(csvData, `user_data_${userLogged.id}.csv`);
    } catch (error) {
      console.error('Erro ao obter dados do usuário para LGPD:', error);
    }
  },

  // Função para converter os dados do usuário para CSV
  convertToCSV(data: any): string {
    const headers = Object.keys(data[0]).join(',') + '\n';
    const rows = data.map((row: any) =>
      Object.values(row).map(String).join(',')
    );
    return headers + rows.join('\n');
  },

  // Função para disparar o download do arquivo CSV
  downloadCSV(csvContent: string, filename: string): void {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
};
