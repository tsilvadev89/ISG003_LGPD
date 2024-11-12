import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

interface DateFieldProps {
  label: string;
  value?: Dayjs | null;
  onChange: (date: Dayjs | null) => void;
  inputFormat?: string;
}

const DateField: React.FC<DateFieldProps> = ({ label, value, onChange, inputFormat = 'DD/MM/YYYY' }) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={onChange} 
      format={inputFormat} 
      slotProps={{ textField: { fullWidth: true, required: true } }} 
    />
  );
};

export default DateField;
