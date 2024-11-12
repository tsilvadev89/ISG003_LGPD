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
import { Servico } from '../../../../../models/Servico';
import { Categoria } from '../../../../../models/Categoria';

interface ServicoFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (servico: Servico) => void;
  onDelete: (id: number) => void;
  servico: Servico | null;
  categorias: Categoria[];
}

const ServicoForm: React.FC<ServicoFormProps> = ({ open, onClose, onSave, onDelete, servico, categorias }) => {
  const [formData, setFormData] = useState<Partial<Servico>>({
    nome: '',
    descricao: '',
    preco: 0,
    duracao: '',
    categoria_id: 0,
    imagem_url: '',
    ativo: true,
  });
  const [copySuccess, setCopySuccess] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false);
  const botaoTexto = servico ? 'Atualizar' : 'Cadastrar';

  useEffect(() => {
    if (servico) {
      setFormData(servico);
    } else {
      setFormData({
        nome: '',
        descricao: '',
        preco: 0,
        duracao: '',
        categoria_id: 0,
        imagem_url: '',
        ativo: true,
      });
    }
  }, [servico]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'preco' ? Number(value) : value });
  };

  const handleSubmit = () => {
    setConfirmUpdateOpen(false);
    onSave(formData as Servico);
  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(false);
    onDelete(servico?.servico_id!);
    onClose();
  };

  const handleCopy = () => {
    const textToCopy = `${formData.nome}\nDescrição: ${formData.descricao}\nPreço: R$ ${formData.preco}\nDuração: ${formData.duracao}`;
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
              <TextField label="Duração" name="duracao" value={formData.duracao || ''} onChange={handleChange} fullWidth />
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
              {servico && (
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
        <DialogTitle>Confirmar {servico ? 'Atualização' : 'Cadastro'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja {servico ? 'atualizar' : 'cadastrar'} <strong>{formData.nome}</strong>?
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

export default ServicoForm;
