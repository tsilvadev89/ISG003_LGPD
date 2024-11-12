import React, { useState } from 'react';
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
  IconButton,
  Popover,
  TextField,
  Tooltip,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearAllIcon from '@mui/icons-material/ClearAll';

interface CargoTableProps {
  cargos: Cargo[];
  onEdit: (cargo: Cargo) => void;
}

const CargoTable: React.FC<CargoTableProps> = ({ cargos, onEdit }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Cargo>('nome');
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleRequestSort = (property: keyof Cargo) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (property: keyof Cargo, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [property]: value }));
  };

  const handleSearchIconClick = (event: React.MouseEvent<HTMLElement>, property: keyof Cargo) => {
    setAnchorEl({ ...anchorEl, [property]: event.currentTarget });
  };

  const handlePopoverClose = (property: keyof Cargo) => {
    setAnchorEl({ ...anchorEl, [property]: null });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getSafeValue = (cargo: Cargo, property: keyof Cargo) => {
    const value = cargo[property];
    return value !== undefined && value !== null ? value.toString().toLowerCase() : "";
  };
  
  const filteredAndSortedCargos = cargos
    .filter((cargo) =>
      Object.keys(filters).every((key) =>
        getSafeValue(cargo, key as keyof Cargo).includes(filters[key].toLowerCase())
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
            {['Imagem', 'Nome', 'Descrição'].map((header, index) => (
              <TableCell key={header} style={{ fontWeight: 'bold' }}>
                {index === 0 ? (
                  header
                ) : (
                  <TableSortLabel
                    active={orderBy === (index === 1 ? 'nome' : 'descricao')}
                    direction={orderBy === (index === 1 ? 'nome' : 'descricao') ? order : 'asc'}
                    onClick={() =>
                      handleRequestSort(index === 1 ? 'nome' : 'descricao')
                    }
                  >
                    {header}
                  </TableSortLabel>
                )}
                {index > 0 && (
                  <>
                    <IconButton
                      size="small"
                      color={filters[index === 1 ? 'nome' : 'descricao'] ? 'primary' : 'default'}
                      onClick={(event) =>
                        handleSearchIconClick(
                          event,
                          index === 1 ? 'nome' : 'descricao'
                        )
                      }
                    >
                      <SearchIcon fontSize="small" />
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl[index === 1 ? 'nome' : 'descricao'])}
                      anchorEl={anchorEl[index === 1 ? 'nome' : 'descricao']}
                      onClose={() => handlePopoverClose(index === 1 ? 'nome' : 'descricao')}
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
                            index === 1 ? 'nome' : 'descricao',
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
          {filteredAndSortedCargos.map((cargo) => (
            <TableRow
              key={cargo.cargo_id}
              onClick={() => onEdit(cargo)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>
                <Avatar src={cargo.imagem_url} alt={cargo.nome} />
              </TableCell>
              <TableCell>{cargo.nome}</TableCell>
              <TableCell>{cargo.descricao}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CargoTable;
