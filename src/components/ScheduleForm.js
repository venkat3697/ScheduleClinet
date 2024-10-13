// src/components/ScheduleForm.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { Timer3Select } from '@mui/icons-material';

const ScheduleForm = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSchedule = (e) => {
    e.preventDefault();
    // handle schedule logic here
    console.log('Schedule:', { date, time, description });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Schedule a Meeting
      </Typography>
      <Box
        component="form"
        onSubmit={handleSchedule}
        sx={{ width: '100%', maxWidth: 400 }}
      >
        <TextField
          fullWidth
          margin="normal"
          id="date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          id="time"
          label="Time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          id="description"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Schedule
        </Button>
  
      </Box>
    </Box>
  );
};

export default ScheduleForm;
