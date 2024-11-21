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
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import dayjs, { Dayjs } from 'dayjs';
import DateField from '../ComponentesComuns/DateField';
import { Cliente } from '../../../../../models/Cliente';

interface PersonFormUserProps {
  open: boolean;
  onClose: () => void;
  onSave: (cliente: Cliente) => void;
  onDelete: (id: number) => void;
  cliente: Cliente | null;
  updateOneUser: boolean;
}

const PersonFormUser: React.FC<PersonFormUserProps> = ({ open, onClose, onSave, onDelete, cliente }) => {
  const [formData, setFormData] = useState<Partial<Cliente>>({
    primeiro_nome: '',
    sobrenome: '',
    email: '',
    data_nascimento: '',
    imagem_url: '',
  });
  const [copySuccess, setCopySuccess] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false);
  const botaoTexto = cliente ? 'Atualizar' : 'Cadastrar';

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    } else {
      setFormData({
        primeiro_nome: '',
        sobrenome: '',
        email: '',
        data_nascimento: '',
        imagem_url: '',
        senha: '',
      });
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Dayjs | null) => {
    const formattedDate = date ? date.format('YYYY-MM-DD') : '';
    setFormData({ ...formData, data_nascimento: formattedDate });
  };

  const handleSubmit = () => {
    setConfirmUpdateOpen(false);
    onSave(formData as Cliente);
  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(false);
    onDelete(cliente?.cliente_id!);
    onClose();
  };

  const handleCopy = () => {
    const textToCopy = `${formData.primeiro_nome} ${formData.sobrenome}\n${formData.email}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess(true);
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Card>
        <CardContent>
          <Stack alignItems="center" spacing={2}>
            <Avatar src={formData.imagem_url} sx={{ width: 56, height: 56 }} />
            <Typography variant="h6">
              {formData.primeiro_nome} {formData.sobrenome}
            </Typography>
            <Typography variant="body2">{formData.email}</Typography>
            <IconButton onClick={handleCopy}>
              <CopyAllIcon />
            </IconButton>
          </Stack>
          <Stack spacing={2} mt={2}>
            <TextField label="Nome" name="primeiro_nome" value={formData.primeiro_nome || ''} onChange={handleChange} fullWidth />
            <TextField label="Sobrenome" name="sobrenome" value={formData.sobrenome || ''} onChange={handleChange} fullWidth />
            <TextField label="Email" name="email" value={formData.email || ''} onChange={handleChange} fullWidth type="email" />
            <DateField label="Data de Nascimento" value={dayjs(formData.data_nascimento)} onChange={handleDateChange} />
            <TextField label="URL da Imagem" name="imagem_url" value={formData.imagem_url || ''} onChange={handleChange} fullWidth />
          </Stack>
        </CardContent>
        <CardActions>
          <Stack flexDirection="column" gap={2} alignItems="center" width="100%">
            <Button variant="contained" color="primary" onClick={() => setConfirmUpdateOpen(true)}>
              {botaoTexto}
            </Button>

            {cliente && (
              <Tooltip title="Para exclusão do usuario, acessar CONFIGURAÇÃO/EXCLUIR CONTA.">
                <span> {/* Necessário para Tooltip em botões desabilitados */}
                  <Button disabled startIcon={<DeleteIcon />} color="error" onClick={() => setConfirmDeleteOpen(true)}>
                    Excluir
                  </Button>
                </span>
              </Tooltip>
            )}

            <Button onClick={onClose}>Cancelar</Button>
          </Stack>
        </CardActions>
      </Card>

      <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir <strong>{formData.primeiro_nome} {formData.sobrenome}</strong>?
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
        <DialogTitle>Confirmar {cliente ? 'Atualização' : 'Cadastro'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja {cliente ? 'atualizar' : 'cadastrar'} <strong>{formData.primeiro_nome} {formData.sobrenome}</strong>?
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

export default PersonFormUser;
