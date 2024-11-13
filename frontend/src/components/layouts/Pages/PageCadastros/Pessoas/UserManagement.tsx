import React, { useState, useEffect } from 'react';
import { clienteService } from '../../../../../services/clienteService';
import { funcionarioService } from '../../../../../services/funcionarioService';
import { cargoService } from '../../../../../services/cargoService';
import { Cliente } from '../../../../../models/Cliente';
import { Funcionario } from '../../../../../models/Funcionario';
import { Cargo } from '../../../../../models/Cargo';
import {
  Stack,
  Button,
  Snackbar,
  Alert,
  Typography,
  useMediaQuery,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import UserTableUser from './UserTableUser';
import UserTableFunc from './UserTableFunc';
import UserCardListUser from './UserCardListUser';
import UserCardListFunc from './UserCardListFunc';
import PersonFormUser from './PersonFormUser';
import PersonFormFunc from './PersonFormFunc';
import { authService } from '../../../../../services/authService';

interface UserManagementProps {
  admin: boolean;
  updateOneUser: boolean;
}

const UserManagement: React.FC<UserManagementProps> = ({ admin, updateOneUser }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [selectedUser, setSelectedUser] = useState<Cliente | Funcionario | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'clientes' | 'funcionarios'>('clientes');
  const isMobile = useMediaQuery('(max-width:600px)');

  // Função para buscar os clientes com base no filtro de admin, id e updateOneUser
  const fetchClientes = async () => {
    try {
      const userLogged = authService.getUser();
      const response = await clienteService.getAllClientes();

      let filteredClientes;

      // Caso admin seja true e updateOneUser seja false, retorna todos os clientes
      if (admin && !updateOneUser) {
        filteredClientes = response;
      } else {
        // Nos outros casos, filtra apenas o usuário logado
        filteredClientes = userLogged
          ? response.filter(
            (cliente) =>
              cliente.cliente_id === userLogged.id && cliente.email === userLogged.email
          )
          : [];
      }

      setClientes(filteredClientes);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    }
  };

  // Função para buscar os funcionários com base no filtro de admin, id e updateOneUser
  const fetchFuncionarios = async () => {
    try {
      const userLogged = authService.getUser();
      const response = await funcionarioService.getAllFuncionarios();

      let filteredFuncionarios;

      // Caso admin seja true e updateOneUser seja false, retorna todos os funcionários
      if (admin && !updateOneUser) {
        filteredFuncionarios = response;
      } else {
        // Nos outros casos, filtra apenas o usuário logado
        filteredFuncionarios = userLogged
          ? response.filter(
            (funcionario) =>
              funcionario.funcionario_id === userLogged.id && funcionario.email === userLogged.email
          )
          : [];
      }

      setFuncionarios(filteredFuncionarios);
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
    }
  };

  const fetchCargos = async () => {
    try {
      const response = await cargoService.getAllCargos();
      setCargos(response);
    } catch (error) {
      console.error('Erro ao buscar cargos:', error);
    }
  };
  // Chama as funções de fetch dependendo do tipo de usuário/admin
  useEffect(() => {
    fetchClientes();
    fetchFuncionarios();
    fetchCargos();
  }, [admin, updateOneUser, view]);




  const handleCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: Cliente | Funcionario) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteConfirmed = async (userId: number) => {
    try {
      if (view === 'clientes') {
        await clienteService.deleteCliente(userId);
      } else {
        await funcionarioService.deleteFuncionario(userId);
      }
      setSuccess(true);
      view === 'clientes' ? fetchClientes() : fetchFuncionarios();
    } catch (error) {
      setError(`Erro ao excluir ${view === 'clientes' ? 'cliente' : 'funcionário'}.`);
    }
  };

  const handleSave = async (user: Cliente | Funcionario) => {
    try {
      if (view === 'clientes') {
        const cliente = user as Cliente;
        if (cliente.cliente_id) {
          await clienteService.updateCliente(cliente.cliente_id, cliente);
        } else {
          await clienteService.createCliente(cliente);
        }
      } else {
        const funcionario = user as Funcionario;
        if (funcionario.funcionario_id) {
          await funcionarioService.updateFuncionario(funcionario.funcionario_id, funcionario);
        } else {
          await funcionarioService.createFuncionario(funcionario);
        }
      }
      setSuccess(true);
      view === 'clientes' ? fetchClientes() : fetchFuncionarios();
      setIsModalOpen(false);
    } catch (error) {
      setError(`Erro ao salvar ${view === 'clientes' ? 'cliente' : 'funcionário'}.`);
    }
  };

  return (
    <Stack spacing={3} padding={2}>
      <Typography variant="h4">Gerenciamento de {view === 'clientes' ? 'Clientes' : 'Funcionários'}</Typography>

      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(e, newView) => setView(newView)}
        aria-label="View selection"
      >
        <ToggleButton
          value="clientes"
          aria-label="Clientes"
          disabled={!admin}>

          Clientes
        </ToggleButton>

        <ToggleButton
          value="funcionarios"
          aria-label="Funcionários"
          disabled={!admin}
        >
          Funcionários
        </ToggleButton>

      </ToggleButtonGroup>

      <Stack display={updateOneUser || !admin ? 'none' : 'block'}>
        <Button variant="contained" onClick={handleCreate} disabled={updateOneUser}>
          Novo {view === 'clientes' ? 'Cliente' : 'Funcionário'}
        </Button>
      </Stack>

      {isMobile ? (
        view === 'clientes' ? (
          <UserCardListUser clientes={clientes} onEdit={handleEdit} />
        ) : (
          <UserCardListFunc funcionarios={funcionarios} cargos={cargos} onEdit={handleEdit} />
        )
      ) : view === 'clientes' ? (
        <UserTableUser clientes={clientes} onEdit={handleEdit} />
      ) : (
        <UserTableFunc funcionarios={funcionarios} cargos={cargos} onEdit={handleEdit} />
      )}

      {view === 'clientes' ? (
        <PersonFormUser
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          onDelete={handleDeleteConfirmed}
          cliente={selectedUser as Cliente | null}
          updateOneUser={updateOneUser}
        />
      ) : (
        <PersonFormFunc
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          onDelete={handleDeleteConfirmed}
          funcionario={selectedUser as Funcionario | null}
          cargos={cargos}
          updateOneUser={updateOneUser}
        />
      )}

      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Operação realizada com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default UserManagement;
