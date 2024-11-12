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
import dayjs, { Dayjs } from 'dayjs';
import DateField from '../ComponentesComuns/DateField';
import { Funcionario } from '../../../../../models/Funcionario';
import { Cargo } from '../../../../../models/Cargo';

interface PersonFormFuncProps {
  open: boolean;
  onClose: () => void;
  onSave: (funcionario: Funcionario) => void;
  onDelete: (id: number) => void;
  funcionario: Funcionario | null;
  cargos: Cargo[];
}

const PersonFormFunc: React.FC<PersonFormFuncProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  funcionario,
  cargos,
}) => {
  const [formData, setFormData] = useState<Partial<Funcionario>>({
    primeiro_nome: '',
    sobrenome: '',
    email: '',
    cargo_id: 0,
    data_contratacao: '',
    imagem_url: '',
  });
  const [copySuccess, setCopySuccess] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [confirmUpdateOpen, setConfirmUpdateOpen] = useState(false);

  useEffect(() => {
    if (funcionario) {
      setFormData(funcionario);
    } else {
      setFormData({
        primeiro_nome: '',
        sobrenome: '',
        email: '',
        cargo_id: 0,
        data_contratacao: '',
        imagem_url: '',
      });
    }
  }, [funcionario]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date: Dayjs | null) => {
    const formattedDate = date ? date.format('YYYY-MM-DD') : '';
    setFormData({ ...formData, data_contratacao: formattedDate });
  };

  const handleSubmit = () => {
    setConfirmUpdateOpen(false);
    onSave(formData as Funcionario);
  };

  const handleDeleteClick = () => {
    setConfirmDeleteOpen(false);
    onDelete(funcionario?.funcionario_id!);
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
      <DialogContent sx={{ overflowY: 'auto', maxHeight: '80vh' }}>
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
              <TextField
                label="Nome"
                name="primeiro_nome"
                value={formData.primeiro_nome || ''}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Sobrenome"
                name="sobrenome"
                value={formData.sobrenome || ''}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                fullWidth
                type="email"
              />
              <TextField
                select
                label="Cargo"
                name="cargo_id"
                value={formData.cargo_id || ''}
                onChange={(e) =>
                  setFormData({ ...formData, cargo_id: Number(e.target.value) })
                }
                fullWidth
              >
                {cargos.map((cargo) => (
                  <MenuItem key={cargo.cargo_id} value={cargo.cargo_id}>
                    {cargo.nome}
                  </MenuItem>
                ))}
              </TextField>
              <DateField
                label="Data de Contratação"
                value={dayjs(formData.data_contratacao)}
                onChange={handleDateChange}
              />
              <TextField
                label="URL da Imagem"
                name="imagem_url"
                value={formData.imagem_url || ''}
                onChange={handleChange}
                fullWidth
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Stack flexDirection={'column'} gap={2} alignItems={'center'} alignContent={'center'} width={'100%'}>
              <Button variant="contained" color="primary" onClick={() => setConfirmUpdateOpen(true)}>
                {funcionario ? 'Atualizar' : 'Cadastrar'}
              </Button>
              {funcionario && (
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
        <DialogTitle>Confirmar {funcionario ? 'Atualização' : 'Cadastro'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja {funcionario ? 'atualizar' : 'cadastrar'} <strong>{formData.primeiro_nome} {formData.sobrenome}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmUpdateOpen(false)}>Cancelar</Button>
          <Button onClick={handleSubmit}>{funcionario ? 'Atualizar' : 'Cadastrar'}</Button>
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

export default PersonFormFunc;
