// import React, { useState, useEffect } from 'react';
// import { TextField, Box, List, ListItem, ListItemText, Typography } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// function TimeIntervalCalendar() {
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [intervals, setIntervals] = useState([]);

//   // Default start and end time for the day
//   const startTime = "09:00";
//   const endTime = "09:50";
//   const duration = 30; // in minutes

//   // Function to calculate intervals
//   const getIntervalsForDateRange = (startDate, endDate) => {
//     if (!startDate || !endDate) return [];

//     let intervals = [];
//     let start = new Date(startDate);
//     let end = new Date(endDate);

//     // Loop through each day
//     for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
//       let dayIntervals = getIntervalsForDay(new Date(day), startTime, endTime, duration);
//       intervals.push(...dayIntervals);
//     }

//     return intervals;
//   };

//   const getIntervalsForDay = (day, startTime, endTime, duration) => {
//     let intervals = [];

//     // Set start and end times for the current day
//     let startDateTime = new Date(day);
//     let endDateTime = new Date(day);

//     let [startHour, startMinute] = startTime.split(':').map(Number);
//     let [endHour, endMinute] = endTime.split(':').map(Number);

//     startDateTime.setHours(startHour, startMinute, 0, 0);
//     endDateTime.setHours(endHour, endMinute, 0, 0);

//     let intervalDuration = duration * 60 * 1000;

//     while (startDateTime.getTime() + intervalDuration <= endDateTime.getTime()) {
//       let nextIntervalTime = new Date(startDateTime.getTime() + intervalDuration);
//       intervals.push({
//         date: day.toLocaleDateString(),
//         start: formatTime(startDateTime),
//         end: formatTime(nextIntervalTime)
//       });
//       startDateTime = nextIntervalTime;
//     }

//     return intervals;
//   };

//   const formatTime = (time) => {
//     return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   // Use useEffect to calculate intervals when startDate or endDate changes
//   useEffect(() => {
//     if (startDate && endDate) {
//       const calculatedIntervals = getIntervalsForDateRange(startDate, endDate);
//       setIntervals(calculatedIntervals);
//     }
//   }, [startDate, endDate]); // Depend on startDate and endDate changes

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
//         <DatePicker
//           label="Start Date"
//           value={startDate}
//           onChange={(newValue) => setStartDate(newValue)}
//           renderInput={(params) => <TextField {...params} />}
//         />

//         <DatePicker
//           label="End Date"
//           value={endDate}
//           onChange={(newValue) => setEndDate(newValue)}
//           renderInput={(params) => <TextField {...params} />}
//         />

//         <Typography variant="h6">Time Intervals</Typography>
//         <List>
//           {intervals.length > 0 ? (
//             intervals.map((interval, index) => (
//               <ListItem key={index}>
//                 <ListItemText primary={`${interval.date}: ${interval.start} - ${interval.end}`} />
//               </ListItem>
//             ))
//           ) : (
//             <Typography>No intervals to show</Typography>
//           )}
//         </List>
//       </Box>
//     </LocalizationProvider>
//   );
// }

// export default TimeIntervalCalendar;

import React, { useState, useEffect } from "react"
import {
  TextField,
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  IconButton,
} from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useParams } from "react-router-dom"
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend"
function TimeIntervalCalendar() {
  const getData = () => JSON.parse(localStorage.getItem("slots")) || []
  const storedData = getData()
  const { id } = useParams()

  const filteredEvent = storedData.filter((item) => id === item.eventId)

  const BookEvent = () => {
    alert("Event Booked")
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
          <Typography variant="h4">Time Slots</Typography>
          {filteredEvent.length > 0 && (
            <Typography variant="h6">{filteredEvent[0].title}</Typography>
          )}
          <List sx={{ width: "300px" }}>
            {filteredEvent.length > 0 && filteredEvent[0].totalSlots ? (
              filteredEvent[0].totalSlots.length > 0 ? (
                filteredEvent[0].totalSlots.map((interval, index) => (
                  <ListItem
                    key={index}
                    disableGutters
                    secondaryAction={
                      <IconButton aria-label="book" onClick={BookEvent}>
                        <ScheduleSendIcon color="success" />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`${interval.date}: ${interval.slotStart} - ${interval.slotEnd}`}
                    />
                  </ListItem>
                ))
              ) : (
                <Typography>No slots to show</Typography>
              )
            ) : (
              <Typography>No slots to show</Typography>
            )}
          </List>
        </Box>
      </LocalizationProvider>
    </>
  )
}

export default TimeIntervalCalendar
