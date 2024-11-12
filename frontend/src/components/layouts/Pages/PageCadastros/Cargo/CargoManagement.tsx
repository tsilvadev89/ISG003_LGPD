import React, { useState, useEffect } from 'react';
import { cargoService } from '../../../../../services/cargoService';
import { Cargo } from '../../../../../models/Cargo';
import {
  Stack,
  Button,
  Snackbar,
  Alert,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CargoTable from './CargoTable';
import CargoCardList from './CargoCardList';
import CargoForm from './CargoForm';

const CargoManagement: React.FC = () => {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [selectedCargo, setSelectedCargo] = useState<Cargo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  // Fetch para carregar cargos
  const fetchCargos = async () => {
    try {
      const response = await cargoService.getAllCargos();
      setCargos(response);
    } catch (error) {
      console.error('Erro ao buscar cargos:', error);
      setError('Erro ao buscar cargos.');
    }
  };

  useEffect(() => {
    fetchCargos();
  }, []);

  const handleCreate = () => {
    setSelectedCargo(null);
    setIsModalOpen(true);
  };

  const handleEdit = (cargo: Cargo) => {
    setSelectedCargo(cargo);
    setIsModalOpen(true);
  };

  const handleDeleteConfirmed = async (cargoId: number) => {
    try {
      await cargoService.deleteCargo(cargoId);
      setSuccess(true);
      fetchCargos();
    } catch (error) {
      console.error('Erro ao excluir cargo:', error);
      setError('Erro ao excluir cargo.');
    }
  };

  const handleSave = async (cargo: Cargo) => {
    try {
      if (cargo.cargo_id) {
        await cargoService.updateCargo(cargo.cargo_id, cargo);
      } else {
        await cargoService.createCargo(cargo);
      }
      setSuccess(true);
      fetchCargos();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar cargo:', error);
      setError('Erro ao salvar cargo.');
    }
  };

  return (
    <Stack spacing={3} padding={2}>
      <Typography variant="h4">Gerenciamento de Cargos</Typography>

      <Button variant="contained" onClick={handleCreate}>
        Novo Cargo
      </Button>
      
      {isMobile ? (
        <CargoCardList cargos={cargos} onEdit={handleEdit} />
      ) : (
        <CargoTable cargos={cargos} onEdit={handleEdit} />
      )}

      <CargoForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDeleteConfirmed}
        cargo={selectedCargo}
      />

      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">
          Operação realizada com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar open={Boolean(error)} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default CargoManagement;
