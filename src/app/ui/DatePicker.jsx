// src/app/ui/DatePicker.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ja } from 'date-fns/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const DatePicker = ({ label, value, onChange, name }) => {
  const { theme } = useTheme();

  const muiTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme === 'dark' ? 'dark' : 'light',
        },
      }),
    [theme]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <ThemeProvider theme={muiTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
          <MuiDatePicker
            label={label}
            value={value}
            onChange={onChange}
            renderInput={(params) => (
              <TextField {...params} name={name} fullWidth />
            )}
          />
        </LocalizationProvider>
      </ThemeProvider>
    </motion.div>
  );
};

export default DatePicker;
