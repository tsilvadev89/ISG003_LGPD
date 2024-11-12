import React, { useState } from 'react';
import { Cliente } from '../../../../../models/Cliente';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TableSortLabel,
  IconButton,
  Popover,
  TextField,
  Button,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';

interface UserTableUserProps {
  clientes: Cliente[];
  onEdit: (cliente: Cliente) => void;
}

const UserTableUser: React.FC<UserTableUserProps> = ({ clientes, onEdit }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Cliente>('primeiro_nome');
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const isMobile = useMediaQuery('(max-width:600px)'); // Responsividade

  const handleRequestSort = (property: keyof Cliente) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (property: keyof Cliente, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [property]: value }));
  };

  const handleSearchIconClick = (event: React.MouseEvent<HTMLElement>, property: keyof Cliente) => {
    setAnchorEl({ ...anchorEl, [property]: event.currentTarget });
  };

  const handlePopoverClose = (property: keyof Cliente) => {
    setAnchorEl({ ...anchorEl, [property]: null });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getSafeValue = (cliente: Cliente, property: keyof Cliente) => {
    const value = cliente[property];
    return value !== undefined && value !== null ? value.toString().toLowerCase() : "";
  };
  
  const filteredAndSortedClientes = clientes
    .filter((cliente) =>
      Object.keys(filters).every((key) =>
        getSafeValue(cliente, key as keyof Cliente).includes(filters[key].toLowerCase())
      )
    )
    .sort((a, b) => {
      const isAsc = order === 'asc';
      const aValue = getSafeValue(a, orderBy);
      const bValue = getSafeValue(b, orderBy);
      if (aValue < bValue) return isAsc ? -1 : 1;
      if (aValue > bValue) return isAsc ? 1 : -1;
      return 0;
    });
  

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader={isMobile}>
        <TableHead>
          <TableRow>
            {['Imagem', 'Nome', 'Email', 'Data de Nascimento'].map((header, index) => (
              <TableCell key={header} style={{ fontWeight: 'bold' }}>
                {index === 0 ? (
                  header
                ) : (
                  <TableSortLabel
                    active={orderBy === (index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : 'data_nascimento')}
                    direction={orderBy === (index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : 'data_nascimento') ? order : 'asc'}
                    onClick={() =>
                      handleRequestSort(
                        index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : 'data_nascimento'
                      )
                    }
                  >
                    {header}
                  </TableSortLabel>
                )}
                {index > 0 && (
                  <>
                    <IconButton
                      size="small"
                      color={filters[index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : 'data_nascimento'] ? 'primary' : 'default'}
                      onClick={(event) =>
                        handleSearchIconClick(
                          event,
                          index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : 'data_nascimento'
                        )
                      }
                    >
                      <SearchIcon fontSize="small" />
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl[index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : 'data_nascimento'])}
                      anchorEl={anchorEl[index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : 'data_nascimento']}
                      onClose={() => handlePopoverClose(index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : 'data_nascimento')}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <TextField
                        variant="outlined"
                        size="small"
                        placeholder={`Filtrar ${header}`}
                        onChange={(e) =>
                          handleFilterChange(
                            index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : 'data_nascimento',
                            e.target.value
                          )
                        }
                      />
                    </Popover>
                  </>
                )}
              </TableCell>
            ))}
            {Object.keys(filters).length > 0 && (
              <TableCell align="right">
                <Tooltip title="Limpar todos os filtros">
                  <IconButton onClick={clearFilters} color="primary">
                    <ClearAllIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredAndSortedClientes.map((cliente) => (
            <TableRow
              key={cliente.cliente_id}
              onClick={() => onEdit(cliente)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>
                <Avatar src={cliente.imagem_url} alt={cliente.primeiro_nome} />
              </TableCell>
              <TableCell>{`${cliente.primeiro_nome} ${cliente.sobrenome}`}</TableCell>
              <TableCell>{cliente.email}</TableCell>
              <TableCell>{new Date(cliente.data_nascimento).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTableUser;
