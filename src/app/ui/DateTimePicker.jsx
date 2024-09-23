// src/components/ui/DateTimePicker.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ja } from 'date-fns/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const DateTimePicker = ({ label, value, onChange, name }) => {
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
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium mb-1">
        {label}
      </label>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <ThemeProvider theme={muiTheme}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
            <MuiDateTimePicker
              value={value}
              onChange={onChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name={name}
                  fullWidth
                />
              )}
            />
          </LocalizationProvider>
        </ThemeProvider>
      </motion.div>
    </div>
  );
};

export default DateTimePicker;
