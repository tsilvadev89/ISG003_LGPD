import React, { useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

const GenderInput = () => {
  const [gender, setGender] = useState('');

  const handleGenderChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setGender(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Sexo</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender"
        value={gender}
        onChange={handleGenderChange}
      >
        <FormControlLabel value="male" control={<Radio />} label="Masculino" />
        <FormControlLabel value="female" control={<Radio />} label="Feminino" />
      </RadioGroup>
    </FormControl>
  );
};

export default GenderInput;
