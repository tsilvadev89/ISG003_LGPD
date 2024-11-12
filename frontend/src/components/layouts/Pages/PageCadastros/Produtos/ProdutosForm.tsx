import React, { useEffect, useState } from 'react';
import {
  Dialog,
  Button,
  TextField,
  Stack,
  Avatar,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { Produto } from '../../../../../models/Produto';
import { Categoria } from '../../../../../models/Categoria';

interface ProdutoFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (produto: Produto) => void;
  onDelete: (id: number) => void;
  produto: Produto | null;
  categorias: Categoria[];
}

const ProdutoForm: React.FC<ProdutoFormProps> = ({ open, onClose, onSave, onDelete, produto, categorias }) => {
  const [formData, setFormData] = useState<Partial<Produto>>({
    nome: '',
    descricao: '',
    preco: 0,
    estoque: 0,
    categoria_id: 0,
    imagem_url: '',
    ativo: true,
  });
  const [copySuccess, setCopySuccess] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false);
  const botaoTexto = produto ? 'Atualizar' : 'Cadastrar';

  useEffect(() => {
    if (produto) {
      setFormData(produto);
    } else {
      setFormData({
        nome: '',
        descricao: '',
        preco: 0,
        estoque: 0,
        categoria_id: 0,
        imagem_url: '',
        ativo: true,
      });
    }
  }, [produto]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'preco' || name === 'estoque' ? Number(value) : value });
  };

  const handleSubmit = () => {
    setConfirmUpdateOpen(false);
    onSave(formData as Produto);
  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(false);
    onDelete(produto?.produto_id!);
    onClose();
  };

  const handleCopy = () => {
    const textToCopy = `${formData.nome}\nDescrição: ${formData.descricao}\nPreço: R$ ${formData.preco}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess(true);
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent sx={{ overflowY: 'auto', maxHeight: '80vh' }}>
        <Card>
          <CardContent>
            <Stack alignItems="center" spacing={2}>
              <Avatar src={formData.imagem_url} sx={{ width: 56, height: 56 }} />
              <Typography variant="h6">{formData.nome}</Typography>
              <IconButton onClick={handleCopy}>
                <CopyAllIcon />
              </IconButton>
            </Stack>
            <Stack spacing={2} mt={2}>
              <TextField label="Nome" name="nome" value={formData.nome || ''} onChange={handleChange} fullWidth />
              <TextField label="Descrição" name="descricao" value={formData.descricao || ''} onChange={handleChange} fullWidth multiline rows={3} />
              <TextField label="Preço" name="preco" type="number" value={formData.preco || ''} onChange={handleChange} fullWidth />
              <TextField label="Estoque" name="estoque" type="number" value={formData.estoque || ''} onChange={handleChange} fullWidth />
              <TextField
                select
                label="Categoria"
                name="categoria_id"
                value={formData.categoria_id || ''}
                onChange={(e) => setFormData({ ...formData, categoria_id: Number(e.target.value) })}
                fullWidth
              >
                {categorias.map((categoria) => (
                  <MenuItem key={categoria.categoria_id} value={categoria.categoria_id}>
                    {categoria.nome}
                  </MenuItem>
                ))}
              </TextField>
              <TextField label="URL da Imagem" name="imagem_url" value={formData.imagem_url || ''} onChange={handleChange} fullWidth />
            </Stack>
          </CardContent>
          <CardActions>
            <Stack flexDirection={'column'} gap={2} alignItems={'center'} width={'100%'}>
              <Button variant="contained" color="primary" onClick={() => setConfirmUpdateOpen(true)}>
                {botaoTexto}
              </Button>
              {produto && (
                <Button startIcon={<DeleteIcon />} color="error" onClick={() => setConfirmDeleteOpen(true)}>
                  Excluir
                </Button>
              )}
              <Button onClick={onClose}>Cancelar</Button>
            </Stack>
          </CardActions>
        </Card>
      </DialogContent>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir <strong>{formData.nome}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Cancelar</Button>
          <Button onClick={handleDeleteClick} color="error">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmUpdateOpen} onClose={() => setConfirmUpdateOpen(false)}>
        <DialogTitle>Confirmar {produto ? 'Atualização' : 'Cadastro'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja {produto ? 'atualizar' : 'cadastrar'} <strong>{formData.nome}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmUpdateOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>{botaoTexto}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={copySuccess} autoHideDuration={3000} onClose={() => setCopySuccess(false)}>
        <Alert onClose={() => setCopySuccess(false)} severity="success">
          Detalhes copiados para a área de transferência!
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ProdutoForm;
