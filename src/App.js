import logo from "./logo.svg"
import "./App.css"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import ScheduleForm from "./components/ScheduleForm"
import Dashboard from "./components/Dashboard"
import NavBar from "./components/AppBar"
import Register from "./components/Register"
import Appointment from "./components/Appointment"
import ProtectedRoute from "./middleware/ProtectedRoute"
import TimeIntervalCalendar from "./components/TimeIntervalCalendar"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Function to check authentication state
  const checkAuth = () => {
    const token = localStorage.getItem("token")
    setIsAuthenticated(!!token) // Set to true if token exists
  }
  const handleLogin = () => {
    setIsAuthenticated(true) // Update the state to reflect login
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token") // Remove the token from local storage
    setIsAuthenticated(false) // Update the state to reflect logout
  }
  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
            <Dashboard />
            // </ProtectedRoute>
          }
        />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/schedule" element={<ScheduleForm />} />
        {/* <Route path="/calendar" element={<CalendarIntegration />} />*/}
        <Route path="/appointment/:id" element={<TimeIntervalCalendar />} />
      </Routes>
    </Router>
  )
}

export default App
