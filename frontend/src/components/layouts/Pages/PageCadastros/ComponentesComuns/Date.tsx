import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { format } from 'date-fns';

const DateInput = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    setCurrentDate(format(today, 'yyyy-MM-dd'));
  }, []);

  return (
    <div>
      <TextField
        label="Data Cadastro"
        type="date"
        value={currentDate}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        margin="normal"
        disabled
      />
    </div>
  );
};

export default DateInput;