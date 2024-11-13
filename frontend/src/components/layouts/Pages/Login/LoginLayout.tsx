import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider, Link, Snackbar, Stack, Alert } from '@mui/material';
import InputField from './InputField';
import Checkbox from './Checkbox';
import GoogleIcon from '@mui/icons-material/Google';
import FundoImg from '../../../../assets/Login/LoginImage.png';
import { authService } from '../../../../services/authService';
import { z } from 'zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const LoginLayout: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarDelete, setOpenSnackbarDelete] = useState(false);


  const { status } = useParams<{ status?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const loginSchema = z.object({
    email: z.string().email('Por favor, insira um e-mail válido'),
    senha: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  });

  useEffect(() => {
    // Verifica se há uma mensagem de erro ou sucesso via URL
    const state = location.state as { message?: string };

    // Caso haja uma mensagem no state, mostra ela
    if (state && state.message) {
      setDeleteError(state.message);
      setOpenSnackbarDelete(true); // Exibe a notificação
    }

    // Verifica o status na URL (como erro ou sucesso)
    if (status === 'erro') {
      setError('Erro ao fazer login. Por favor, verifique suas credenciais.');
      setOpenSnackbar(true); // Exibe a notificação de erro
    } else if (status === 'sucesso') {
      setError('Login realizado com sucesso!');
      setOpenSnackbar(true); // Exibe a notificação de sucesso
    }
  }, [location, status]);


  const handleLogin = async () => {
    try {
      // Validar os dados usando zod
      loginSchema.parse({ email, senha: password });

      // Chama o serviço de login e obtém o token e o usuário
      // console.log('Tentando fazer login com email:', email, 'e senha:', password); // Log para verificar os dados antes do login
      const { token, usuario } = await authService.login(email, password);
      // console.log('Resposta do login:', { token, usuario }); // Log para ver a resposta completa do login

      // Armazena o token no localStorage
      localStorage.setItem('authToken', token);
      // console.log('Token armazenado:', token); // Log do token

      // Acessando diretamente o id e tipo do usuário retornado
      const id = usuario.id;
      const tipo = usuario.tipo;

      // console.log('Usuário após login - ID:', id, 'Tipo:', tipo);

      // Armazena o usuário no localStorage com o id, email e tipo
      localStorage.setItem('user', JSON.stringify({ id, email, tipo }));
      // console.log('Usuário armazenado no localStorage:', { id, email, tipo }); 

      // Redireciona ou exibe mensagem de sucesso
      window.location.href = '/home';
    } catch (error: any) {
      console.error('Erro no login:', error);
      if (error instanceof z.ZodError) {
        setError(error.errors[0].message); // Mostra a primeira mensagem de erro do zod
      } else {
        setError('Email ou senha incorretos');
      }
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      margin={'0, auto'}
      sx={{ backgroundColor: '#f0f0f0' }}
    >
      {/* Contêiner principal com duas colunas */}
      <Box
        display="flex"
        flexDirection="row"
        bgcolor="#fff"
        borderRadius={2}
        boxShadow={3}
        overflow="hidden"
        sx={{
          width: { xs: 'auto', md: '1060px' },
          minWidth: '350px',
          height: { xs: '600px', md: '800px' },

        }}
      >
        {/* Coluna do formulário */}
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: { xs: '100%', md: '50%' },
            margin: '0, auto',
            height: 'auto',
            padding: 4,
          }}
        >
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            BEM VINDO
          </Typography>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Sistema controle salão beleza
          </Typography>

          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Senha"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Mensagem de erro */}
          {error && (
            <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
              {error}
            </Typography>
          )}

          <Box display="flex" justifyContent="space-between" width="100%" mt={1}>
            <Checkbox label="Relembrar" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
            <Link href="#" underline="hover">
              Esqueci Senha
            </Link>
          </Box>

          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleLogin}
            sx={{ marginTop: 2, paddingY: 1.5 }}
          >
            Login
          </Button>

          <Divider sx={{ width: '100%', marginTop: 3 }} />
          <Button
            variant="contained"
            fullWidth
            sx={{ marginTop: 1 }}
            startIcon={<GoogleIcon />}
          >
            Login com Google
          </Button>
        </Box>

        {/* Coluna de imagem */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            backgroundImage: `url(${FundoImg})`,
            backgroundSize: 'cover',
            width: '70%',
            height: '100%',
          }}
        />
      </Box>

      {/* Snackbar para exibir mensagens de erro */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        message={error}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} 
      />
       <Snackbar open={openSnackbarDelete} autoHideDuration={3000} onClose={() => setOpenSnackbarDelete(false)}>
        <Alert onClose={() => setOpenSnackbarDelete(false)} severity="error">
          {deleteError}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginLayout;
