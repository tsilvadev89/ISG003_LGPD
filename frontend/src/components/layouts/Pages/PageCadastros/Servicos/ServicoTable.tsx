import React, { useState } from 'react';
import { Servico } from '../../../../../models/Servico';
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

interface ServicoTableProps {
  servicos: Servico[];
  categorias: Categoria[];
  onEdit: (servico: Servico) => void;
}

const ServicoTable: React.FC<ServicoTableProps> = ({ servicos, categorias, onEdit }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Servico>('nome');
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleRequestSort = (property: keyof Servico) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (property: keyof Servico, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [property]: value }));
  };

  const handleSearchIconClick = (event: React.MouseEvent<HTMLElement>, property: keyof Servico) => {
    setAnchorEl({ ...anchorEl, [property]: event.currentTarget });
  };

  const handlePopoverClose = (property: keyof Servico) => {
    setAnchorEl({ ...anchorEl, [property]: null });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getCategoriaNome = (categoriaId: number) => {
    const categoria = categorias.find((cat) => cat.categoria_id === categoriaId);
    return categoria ? categoria.nome : 'N/A';
  };

  const getSafeValue = (servico: Servico, property: keyof Servico) => {
    const value = servico[property];
    return value !== undefined && value !== null ? value.toString().toLowerCase() : "";
  };
  
  const filteredAndSortedServicos = servicos
    .filter((servico) =>
      Object.keys(filters).every((key) =>
        getSafeValue(servico, key as keyof Servico).includes(filters[key].toLowerCase())
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
            {['Imagem', 'Nome', 'Preço', 'Duração', 'Categoria'].map((header, index) => (
              <TableCell key={header} style={{ fontWeight: 'bold' }}>
                {index === 0 ? (
                  header
                ) : (
                  <TableSortLabel
                    active={orderBy === (index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'duracao' : 'categoria_id')}
                    direction={orderBy === (index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'duracao' : 'categoria_id') ? order : 'asc'}
                    onClick={() =>
                      handleRequestSort(
                        index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'duracao' : 'categoria_id'
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
                      color={filters[index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'duracao' : 'categoria_id'] ? 'primary' : 'default'}
                      onClick={(event) =>
                        handleSearchIconClick(
                          event,
                          index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'duracao' : 'categoria_id'
                        )
                      }
                    >
                      <SearchIcon fontSize="small" />
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl[index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'duracao' : 'categoria_id'])}
                      anchorEl={anchorEl[index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'duracao' : 'categoria_id']}
                      onClose={() => handlePopoverClose(index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'duracao' : 'categoria_id')}
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
                            index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'duracao' : 'categoria_id',
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
          {filteredAndSortedServicos.map((servico) => (
            <TableRow
              key={servico.servico_id}
              onClick={() => onEdit(servico)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>
                <Avatar src={servico.imagem_url} alt={servico.nome} />
              </TableCell>
              <TableCell>{servico.nome}</TableCell>
              <TableCell>{`R$ ${servico.preco.toFixed(2)}`}</TableCell>
              <TableCell>{servico.duracao}</TableCell>
              <TableCell>{getCategoriaNome(servico.categoria_id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServicoTable;
