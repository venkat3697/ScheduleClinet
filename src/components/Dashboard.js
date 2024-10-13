import React, { useEffect, useState } from "react"
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Box,
} from "@mui/material"
import Appointment from "./Appointment"
import SlotCard from "./SlotCard"
import CalendarComponent from "../middleware/GoogleCalendarApi"

import { GoogleLogin } from "@react-oauth/google"
import axios from "axios"

const Dashboard = () => {
  // const meetings = [
  //   { date: "2024-10-12", time: "10:00 AM", description: "Team Meeting" },
  //   { date: "2024-10-13", time: "2:00 PM", description: "Project Discussion" },
  // ];
  const [meetings, setMeetings] = useState([])

  const fetchAccessToken = async (idToken) => {
    const response = await axios.get(
      "https://developers.google.com/oauthplayground/?code=4/0AVG7fiSb7tt7FpHkYCxgsk5wPbwFgCMYbqEibhahnXX5VHMhGVpoJ-6tX90vuzEIHr2L2A&scope=https://www.googleapis.com/auth/calendar%20https://www.googleapis.com/auth/calendar.events"
    )
    const data = await response.json()
    return data.accessToken // Return the access token from your backend
  }
  const handleSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential // ID token received from Google
    // Exchange the ID token for an access token (if required, usually done server-side)
    const accessToken = await fetchAccessToken(idToken) // Implement this function based on your server logic

    // Use the access token for API requests
    // await createEvent(accessToken)
  }

  const handleError = (error) => {
    console.error("Login Failed:", error)
  }
  useEffect(() => {
    const getData = () => JSON.parse(localStorage.getItem("slots")) || []
    const storedData = getData()
    setMeetings(storedData)
  }, [])

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Container
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom>
            Scheduled Meetings
          </Typography>
          <List sx={{ width: "100%" }}>
            {meetings.map((meeting, index) => (
              <ListItem key={index}>
                <SlotCard slotData={meeting} />
              </ListItem>
            ))}
          </List>
        </Container>
        <Container sx={{ width: "50%" }}>
          <Appointment />
          <CalendarComponent />
          <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
        </Container>
      </Box>
    </>
  )
}

export default Dashboard
