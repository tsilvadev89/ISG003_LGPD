import React, { useState } from 'react';
import { Categoria } from '../../../../../models/Categoria';
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

interface CategoriaTableProps {
  categorias: Categoria[];
  onEdit: (categoria: Categoria) => void;
}

const CategoriaTable: React.FC<CategoriaTableProps> = ({ categorias, onEdit }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Categoria>('nome');
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleRequestSort = (property: keyof Categoria) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (property: keyof Categoria, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [property]: value }));
  };

  const handleSearchIconClick = (event: React.MouseEvent<HTMLElement>, property: keyof Categoria) => {
    setAnchorEl({ ...anchorEl, [property]: event.currentTarget });
  };

  const handlePopoverClose = (property: keyof Categoria) => {
    setAnchorEl({ ...anchorEl, [property]: null });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getSafeValue = (categoria: Categoria, property: keyof Categoria) => {
    const value = categoria[property];
    return value !== undefined && value !== null ? value.toString().toLowerCase() : "";
  };
  
  const filteredAndSortedCategorias = categorias
    .filter((categoria) =>
      Object.keys(filters).every((key) =>
        getSafeValue(categoria, key as keyof Categoria).includes(filters[key].toLowerCase())
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
            {['Imagem', 'Nome', 'Descrição', 'Tipo'].map((header, index) => (
              <TableCell key={header} style={{ fontWeight: 'bold' }}>
                {index === 0 ? (
                  header
                ) : (
                  <TableSortLabel
                    active={orderBy === (index === 1 ? 'nome' : index === 2 ? 'descricao' : 'tipo')}
                    direction={orderBy === (index === 1 ? 'nome' : index === 2 ? 'descricao' : 'tipo') ? order : 'asc'}
                    onClick={() =>
                      handleRequestSort(
                        index === 1 ? 'nome' : index === 2 ? 'descricao' : 'tipo'
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
                      color={filters[index === 1 ? 'nome' : index === 2 ? 'descricao' : 'tipo'] ? 'primary' : 'default'}
                      onClick={(event) =>
                        handleSearchIconClick(
                          event,
                          index === 1 ? 'nome' : index === 2 ? 'descricao' : 'tipo'
                        )
                      }
                    >
                      <SearchIcon fontSize="small" />
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl[index === 1 ? 'nome' : index === 2 ? 'descricao' : 'tipo'])}
                      anchorEl={anchorEl[index === 1 ? 'nome' : index === 2 ? 'descricao' : 'tipo']}
                      onClose={() => handlePopoverClose(index === 1 ? 'nome' : index === 2 ? 'descricao' : 'tipo')}
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
                            index === 1 ? 'nome' : index === 2 ? 'descricao' : 'tipo',
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
          {filteredAndSortedCategorias.map((categoria) => (
            <TableRow
              key={categoria.categoria_id}
              onClick={() => onEdit(categoria)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>
                <Avatar src={categoria.imagem_url} alt={categoria.nome} />
              </TableCell>
              <TableCell>{categoria.nome}</TableCell>
              <TableCell>{categoria.descricao}</TableCell>
              <TableCell>{categoria.tipo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriaTable;
