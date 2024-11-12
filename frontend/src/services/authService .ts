import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/auth` || 'http://localhost:3000/api/auth';

interface User {
  funcionario_id: any;
  cliente_id: any;
  id: number;
  email: string;
  tipo: string; // pode incluir outros campos do usuário conforme sua necessidade
}

export const authService = {
  // Função para fazer login e retornar o token e os dados do usuário
  async login(email: string, senha: string): Promise<{ token: string; usuario: User }> {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, senha });
      
      // Verifique se a resposta contém os dados esperados
      if (!response.data || !response.data.token || !response.data.usuario) {
        throw new Error('Dados inválidos na resposta');
      }

      const { token, usuario } = response.data;

      // Armazena o token no localStorage
      this.storeToken(token);

      // Armazena as informações do usuário no localStorage
      this.storeUser(usuario);

      return { token, usuario };  // Retorna os dados para quem chamou a função, caso necessário

    } catch (error) {
      // Melhorar o tratamento de erros para ser mais informativo
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Erro desconhecido ao fazer login');
      } else {
        throw new Error('Erro ao fazer login');
      }
    }
  },

  // Função para armazenar o token no localStorage
  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  },

  // Função para armazenar as informações do usuário no localStorage
  storeUser(userData: User): void {

    /* console.log('AuthService - ', userData); 
    alert('AuthService - ' + JSON.stringify(userData)) */
    localStorage.setItem('user', JSON.stringify(userData));
  },

  // Função para obter o token armazenado
  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  // Função para obter o usuário armazenado
  getUser(): User | null {
    const user = localStorage.getItem('user');
    /* alert('Usuário recuperado do localStorage: ' + user); */
    return user ? JSON.parse(user) : null;
  },

  // Função para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Verifica se o token existe
  },

  // Função para fazer logout e limpar os dados armazenados
  logout(): void {
    // Limpar o token e o usuário do localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // (Opcional) Realizar requisição para o backend para invalidar o token (caso o backend suporte)
    // axios.post(`${BASE_URL}/logout`, {}, { headers: { Authorization: `Bearer ${this.getToken()}` } })
    //   .then(response => {
    //     console.log("Logout bem-sucedido", response);
    //   })
    //   .catch(error => {
    //     console.error("Erro no logout no backend", error);
    //   });
  },
};
