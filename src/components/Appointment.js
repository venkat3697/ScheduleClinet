// src/components/Appointment.js
import React, { useState } from "react"
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import moment from "moment-timezone"
import { jwtDecode } from "jwt-decode"
import { getAvailableTimeSlots } from "../middleware/getSlots"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"

const Appointment = ({onFetchEvents}) => {
  const [appointmentData, setAppointmentData] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    timeZone: "",
    userId: "",
    slotMinutes: 30,
    eventId: uuidv4(),
    totalSlots: null,
  })

  const onChange = (e) =>
    setAppointmentData({ ...appointmentData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const decoded = jwtDecode(localStorage.getItem("token"))

      let formattedData = {
        ...appointmentData,
        start: moment
          .tz(appointmentData.start, appointmentData.timeZone)
          .format(),
        end: moment.tz(appointmentData.end, appointmentData.timeZone).format(),
        userId: decoded.userId,
      }
      const availableSlots = getAvailableTimeSlots(
        formattedData.start,
        formattedData.end,
        formattedData.slotMinutes
      )

      formattedData.totalSlots = availableSlots
      // const getData = () => JSON.parse(localStorage.getItem("slots")) || []
      // const storedData = getData()
      // storedData.push(formattedData)
      // localStorage.setItem("slots", JSON.stringify(storedData))
      const response = await axios.post('http://localhost:5000/user/event',formattedData)
      onFetchEvents()
      alert("Appointment scheduled successfully!",response.data)
    } catch (err) {
      console.error("Error scheduling appointment", err)
    }
  }

  // Function to generate time options in 15-minute intervals
  // const generateTimeOptions = (startTime, endTime) => {
  //   const times = []
  //   const start = moment(startTime, "HH:mm")
  //   const end = moment(endTime, "HH:mm")
  //   while (start <= end) {
  //     times.push(start.format("HH:mm"))
  //     start.add(15, "minutes")
  //   }
  //   return times
  // }

  // const timeOptions = generateTimeOptions("08:00", "20:00") // Set your desired range here

  return (
    <Container sx={{ justifyContent: "center" }}>
      <Typography variant="h5" gutterBottom align="center">
        Schedule an Availability
      </Typography>
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch", // Ensure full width for children
          margin: "0", // Center the box
          maxWidth: 600, // Optional: Set a max width for better readability
          padding: 2, // Padding around the form
          "& .MuiTextField-root, & .MuiFormControl-root": {
            marginBottom: 2, // Add margin bottom to prevent overlap
          },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="title"
          label="Title"
          name="title"
          onChange={onChange}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "40px", // Increase height for better appearance
            },
            "& .MuiInputLabel-root": {
              textAlign: "left",
            },
          }}
        />
        <TextField
          id="description"
          label="Description"
          name="description"
          onChange={onChange}
          multiline
          rows={1}
          fullWidth
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "40px", // Increase height for better appearance
            },
            "& .MuiInputLabel-root": {
              textAlign: "left",
            },
          }}
        />
        <TextField
          required
          id="start"
          label="Start Date & Time"
          name="start"
          type="datetime-local"
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
            style: { textAlign: "left" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "40px", // Increase height for better appearance
            },
          }}
        />
        <TextField
          required
          id="end"
          label="End Date & Time"
          name="end"
          type="datetime-local"
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
            style: { textAlign: "left" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "40px", // Increase height for better appearance
            },
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="timeZone-label">Time Zone</InputLabel>
          <Select
            labelId="timeZone-label"
            id="timeZone"
            name="timeZone"
            value={appointmentData.timeZone}
            onChange={onChange}
            required
            size="small"
            sx={{
              "& .MuiSelect-select": {
                height: "56px", // Ensure the dropdown height matches others
              },
            }}
          >
            {moment.tz.names().map((zone) => {
              const offset = moment.tz(zone).utcOffset() // Get the UTC offset
              const sign = offset >= 0 ? "+" : "-" // Determine the sign
              const hours = Math.abs(Math.floor(offset / 60)) // Get hours
              const minutes = Math.abs(offset % 60) // Get minutes

              // Format offset as UTC±HH:mm
              const formattedOffset = `UTC${sign}${String(hours).padStart(
                2,
                "0"
              )}:${String(minutes).padStart(2, "0")}`

              // Simplified display name for user-friendliness
              const displayName = zone.replace(/_/g, " ") // Replace underscores with spaces

              return (
                <MenuItem key={zone} value={zone}>
                  {`${displayName} ${formattedOffset}`}{" "}
                  {/* Display zone with offset */}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="slotMinutes-label">Duration</InputLabel>
          <Select
            labelId="slotMinutes-label"
            id="slotMinutes"
            name="slotMinutes"
            value={appointmentData.slotMinutes}
            onChange={onChange}
            required
            size="small"
            sx={{
              "& .MuiSelect-select": {
                height: "56px", // Ensure the dropdown height matches others
              },
            }}
          >
            <MenuItem value={30}>30 Minutes</MenuItem>
            <MenuItem value={40}>40 Minutes</MenuItem>
            <MenuItem value={60}>60 Minutes</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2, width: "100%", height: "40px" }} // Full width button
        >
          Schedule
        </Button>
      </Box>
    </Container>
  )
}

export default Appointment
