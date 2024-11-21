import React, { useState } from 'react';
import { Funcionario } from '../../../../../models/Funcionario';
import { Cargo } from '../../../../../models/Cargo';
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
  useMediaQuery,
  IconButton,
  Popover,
  TextField,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';

interface UserTableFuncProps {
  funcionarios: Funcionario[];
  cargos: Cargo[];
  onEdit: (funcionario: Funcionario) => void;
}

const UserTableFunc: React.FC<UserTableFuncProps> = ({ funcionarios, cargos, onEdit }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Funcionario>('primeiro_nome');
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const isMobile = useMediaQuery('(max-width:600px)'); // Responsividade

  const getCargoNome = (cargoId: number) => {
    const cargo = cargos.find((c) => c.cargo_id === cargoId);
    return cargo ? cargo.nome : 'Cargo não encontrado';
  };

  const handleRequestSort = (property: keyof Funcionario) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (property: keyof Funcionario, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [property]: value }));
  };

  const handleSearchIconClick = (event: React.MouseEvent<HTMLElement>, property: keyof Funcionario) => {
    setAnchorEl({ ...anchorEl, [property]: event.currentTarget });
  };

  const handlePopoverClose = (property: keyof Funcionario) => {
    setAnchorEl({ ...anchorEl, [property]: null });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getSafeValue = (funcionario: Funcionario, property: keyof Funcionario) => {
    const value = funcionario[property];
    return value !== undefined && value !== null ? value.toString().toLowerCase() : "";
  };
  
  const filteredAndSortedFuncionarios = funcionarios
    .filter((funcionario) =>
      Object.keys(filters).every((key) =>
        getSafeValue(funcionario, key as keyof Funcionario).includes(filters[key].toLowerCase())
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
            {['Imagem', 'Nome', 'Email', 'Cargo', 'Data de Contratação'].map((header, index) => (
              <TableCell key={header} style={{ fontWeight: 'bold' }}>
                {index === 0 ? (
                  header
                ) : (
                  <TableSortLabel
                    active={orderBy === (index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : index === 3 ? 'cargo_id' : 'data_contratacao')}
                    direction={orderBy === (index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : index === 3 ? 'cargo_id' : 'data_contratacao') ? order : 'asc'}
                    onClick={() =>
                      handleRequestSort(
                        index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : index === 3 ? 'cargo_id' : 'data_contratacao'
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
                      color={filters[index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : index === 3 ? 'cargo_id' : 'data_contratacao'] ? 'primary' : 'default'}
                      onClick={(event) =>
                        handleSearchIconClick(
                          event,
                          index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : index === 3 ? 'cargo_id' : 'data_contratacao'
                        )
                      }
                    >
                      <SearchIcon fontSize="small" />
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl[index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : index === 3 ? 'cargo_id' : 'data_contratacao'])}
                      anchorEl={anchorEl[index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : index === 3 ? 'cargo_id' : 'data_contratacao']}
                      onClose={() => handlePopoverClose(index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : index === 3 ? 'cargo_id' : 'data_contratacao')}
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
                            index === 1 ? 'primeiro_nome' : index === 2 ? 'email' : index === 3 ? 'cargo_id' : 'data_contratacao',
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
          {filteredAndSortedFuncionarios.map((funcionario) => (
            <TableRow
              key={funcionario.funcionario_id}
              onClick={() => onEdit(funcionario)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>
                <Avatar src={funcionario.imagem_url} alt={funcionario.primeiro_nome} />
              </TableCell>
              <TableCell>{`${funcionario.primeiro_nome} ${funcionario.sobrenome}`}</TableCell>
              <TableCell>{funcionario.email}</TableCell>
              <TableCell>{funcionario.cargo?.nome || getCargoNome(funcionario.cargo_id)}</TableCell>
              <TableCell>{new Date(funcionario.data_contratacao).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTableFunc;
