import React, { useEffect, useState } from "react"

const CalendarComponent = () => {
  const event = {
    summary: "Meet in Hyderabad",
    location: "Hyderabad",
    description: "sjfhdigdfkgkdfgkjb",
    start: {
      dateTime: new Date().toISOString(),
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: new Date().toISOString(),
      timeZone: "Asia/Kolkata",
    },
  }
  const createEventInCalendar = async () => {
    await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " +
            "eyJhbGciOiJSUzI1NiIsImtpZCI6ImE1MGY2ZTcwZWY0YjU0OGE1ZmQ5MTQyZWVjZDFmYjhmNTRkY2U5ZWUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NjgzMTQwMTcwNjAtcTVycXFsaTEydDI3cHVtYXFjamdjZTFqb2F2NjJhNDAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NjgzMTQwMTcwNjAtcTVycXFsaTEydDI3cHVtYXFjamdjZTFqb2F2NjJhNDAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTI5NjgwNTg1NDIzNjU2NjI5NDciLCJlbWFpbCI6Im5hdmVlbi5ydW4xN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzI4Nzk4MzQzLCJuYW1lIjoiUyBWZW5rYXRhIE5hdmVlbiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NLeEIweFhHeExwSU1hUkZWME9vcFlXOTRxWVY3aUZwVG1qMnFYUGFfeGd3UUgzT2c9czk2LWMiLCJnaXZlbl9uYW1lIjoiUyIsImZhbWlseV9uYW1lIjoiVmVua2F0YSBOYXZlZW4iLCJpYXQiOjE3Mjg3OTg2NDMsImV4cCI6MTcyODgwMjI0MywianRpIjoiNTk2NmJiYTYxNDdlOGVmY2NhNjg3MTgxMzI4NDdiNjQ3NDNjNDBiZSJ9.LZdufx9Otp0iMVD41D_3z_YrM8ksMI9sqQgrsoEj4d7QDESDFZxO2rmojV9o7jRj2-oQIBwo0PzMSV2OA-DUzJj4LJw_Uw0aNpvHCYhuZ_e5q9VFXZAzstWXEQxlJe7DTNDHD3OsIsaNMc2L_TOKw3TgNfc0W7o4iI_7U_YZuBKonyNk1VDDBJeD7TjJrCg_KzzJpshMHXl7cZq8N42NNic0kOpnaBMY0_NQrZ0jOCx6W1qKwwhPiSn4FB_l6fYa-T9f7mCHUB14h1nyu0xlmYKgbcQD0qFnB6aHYXMEeqt8eA7mB2PwbfLVrXRZ-vIMHndw-hOmxE-JRFPN5D0upQ", // Access token for google
        },
        body: JSON.stringify(event),
      }
    )
      .then((data) => {
        return data.json()
      })
      .then((data) => {
        console.log(data)
        alert("Event created, check your Google Calendar!")
      })
  }

  return (
    <div>
      <h1>Google Calendar Integration</h1>

      <button onClick={createEventInCalendar}>Sign In</button>

      <>
        <button>Create Event From Now</button>
        <button>Create Event With Video Conference</button>
      </>
    </div>
  )
}

export default CalendarComponent
