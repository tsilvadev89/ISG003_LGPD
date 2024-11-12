import React, { useState } from 'react';
import { Produto } from '../../../../../models/Produto';
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

interface ProdutoTableProps {
  produtos: Produto[];
  categorias: Categoria[];
  onEdit: (produto: Produto) => void;
}

const ProdutoTable: React.FC<ProdutoTableProps> = ({ produtos, categorias, onEdit }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<keyof Produto>('nome');
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [anchorEl, setAnchorEl] = useState<{ [key: string]: HTMLElement | null }>({});
  const isMobile = useMediaQuery('(max-width:600px)'); // Responsividade

  const handleRequestSort = (property: keyof Produto) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (property: keyof Produto, value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, [property]: value }));
  };

  const handleSearchIconClick = (event: React.MouseEvent<HTMLElement>, property: keyof Produto) => {
    setAnchorEl({ ...anchorEl, [property]: event.currentTarget });
  };

  const handlePopoverClose = (property: keyof Produto) => {
    setAnchorEl({ ...anchorEl, [property]: null });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getCategoriaNome = (categoriaId: number) => {
    const categoria = categorias.find((cat) => cat.categoria_id === categoriaId);
    return categoria ? categoria.nome : 'N/A';
  };

  const getSafeValue = (produto: Produto, property: keyof Produto) => {
    const value = produto[property];
    return value !== undefined && value !== null ? value.toString().toLowerCase() : "";
  };
  
  const filteredAndSortedProdutos = produtos
    .filter((produto) =>
      Object.keys(filters).every((key) =>
        getSafeValue(produto, key as keyof Produto).includes(filters[key].toLowerCase())
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
            {['Imagem', 'Nome', 'Preço', 'Estoque', 'Categoria'].map((header, index) => (
              <TableCell key={header} style={{ fontWeight: 'bold' }}>
                {index === 0 ? (
                  header
                ) : (
                  <TableSortLabel
                    active={orderBy === (index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'estoque' : 'categoria_id')}
                    direction={orderBy === (index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'estoque' : 'categoria_id') ? order : 'asc'}
                    onClick={() =>
                      handleRequestSort(
                        index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'estoque' : 'categoria_id'
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
                      color={filters[index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'estoque' : 'categoria_id'] ? 'primary' : 'default'}
                      onClick={(event) =>
                        handleSearchIconClick(
                          event,
                          index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'estoque' : 'categoria_id'
                        )
                      }
                    >
                      <SearchIcon fontSize="small" />
                    </IconButton>
                    <Popover
                      open={Boolean(anchorEl[index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'estoque' : 'categoria_id'])}
                      anchorEl={anchorEl[index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'estoque' : 'categoria_id']}
                      onClose={() => handlePopoverClose(index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'estoque' : 'categoria_id')}
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
                            index === 1 ? 'nome' : index === 2 ? 'preco' : index === 3 ? 'estoque' : 'categoria_id',
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
          {filteredAndSortedProdutos.map((produto) => (
            <TableRow
              key={produto.produto_id}
              onClick={() => onEdit(produto)}
              style={{ cursor: 'pointer' }}
            >
              <TableCell>
                <Avatar src={produto.imagem_url} alt={produto.nome} />
              </TableCell>
              <TableCell>{produto.nome}</TableCell>
              <TableCell>{`R$ ${produto.preco.toFixed(2)}`}</TableCell>
              <TableCell>{produto.estoque}</TableCell>
              <TableCell>{getCategoriaNome(produto.categoria_id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProdutoTable;
