// src/components/AppBar.js
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const NavBar = ({ isAuthenticated, onLogout }) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Scheduling Platform
          </Typography>
          <Box>
            {/* <Button color="inherit" component={Link} to="/">
              Home
            </Button> */}

            {isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} to="/dashboard">
                  Dashboard
                </Button>
                <Button color="inherit" onClick={onLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default NavBar;
