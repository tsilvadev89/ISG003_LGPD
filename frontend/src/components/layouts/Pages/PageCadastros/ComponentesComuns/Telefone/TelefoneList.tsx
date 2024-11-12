import { useState } from 'react';
import { Button, Grid, IconButton, Tooltip, Stack } from '@mui/material';
import { RemoveCircleOutline, AddCircleOutline, Phone, PhoneIphone } from '@mui/icons-material';
import ResidentialPhoneInput from './TelResindencial';
import CellPhoneInput from './TelCelular';

const MultiplePhonesInput = () => {
  const [phones, setPhones] = useState([{ phoneNumber: '', type: 'residential' }]);

  const handlePhoneChange = (index: number, value: string) => {
    const newPhones = [...phones];
    newPhones[index].phoneNumber = value;
    setPhones(newPhones);
  };

  const handlePhoneTypeChange = (index: number, type: 'residential' | 'cell') => {
    const newPhones = [...phones];
    newPhones[index].type = type;
    setPhones(newPhones);
  };

  const addPhone = () => {
    setPhones([...phones, { phoneNumber: '', type: 'residential' }]);
  };

  const removePhone = (index: number) => {
    const newPhones = phones.filter((_, i) => i !== index);
    setPhones(newPhones);
  };

  return (
    <Stack gap={2}>
      {phones.map((phone, index) => (
        <Grid key={index} container spacing={2} alignItems="center">
          <Grid item xs={9} marginBottom={0}>
            {phone.type === 'residential' ? (
              <ResidentialPhoneInput
                value={phone.phoneNumber}
                onChange={(value: string) => handlePhoneChange(index, value)}
              />
            ) : (
              <CellPhoneInput
                value={phone.phoneNumber}
                onChange={(value: string) => handlePhoneChange(index, value)}
              />
            )}
          </Grid>
          <Stack direction={`row`} marginLeft={1}>
            
              <Tooltip title="Mudar para Telefone">
                <IconButton
                  onClick={() => handlePhoneTypeChange(index, 'residential')}
                  color={phone.type === 'residential' ? 'primary' : 'default'}
                >
                  <Phone />
                </IconButton>
              </Tooltip>
              <Tooltip title="Mudar para Celular">
                <IconButton
                  onClick={() => handlePhoneTypeChange(index, 'cell')}
                  color={phone.type === 'cell' ? 'primary' : 'default'}
                >
                  <PhoneIphone />
                </IconButton>
              </Tooltip>
              <Tooltip title="Deletar Telefone">
                <IconButton onClick={() => removePhone(index)} color="error">
                  <RemoveCircleOutline />
                </IconButton>
              </Tooltip>
            
          </Stack>
        </Grid>
      ))}
      <Tooltip title="Adicionar Novo Telefone">
        <Button
          variant="outlined"
          onClick={addPhone}
          startIcon={<AddCircleOutline />}
          sx={{ color: '#4caf50' }}
        >
          Adicionar Telefone
        </Button>
      </Tooltip>
    </Stack>
  );
};

export default MultiplePhonesInput;
