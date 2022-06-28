import React from "react";
import "./Header.css";
import {
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuIcon from "@mui/icons-material/MenuOutlined";

type Props = {};
const Header: React.FC<Props> = () => (
  <Box className="header" sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <CssBaseline />
      <Toolbar className="header-toolbar">
        <IconButton
          component={RouterLink}
          to="/"
          size="medium"
          edge="start"
          color="inherit"
          sx={{ mr: 0 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Button
            sx={{ mr: 2 }}
            color="inherit"
            component={RouterLink}
            to="/practice"
          >
            Practice
          </Button>
        </Typography>
        <IconButton component={RouterLink} to="/" size="large" color="inherit">
          <HelpOutlineIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Header;
