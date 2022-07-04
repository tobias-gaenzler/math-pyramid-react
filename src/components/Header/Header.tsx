import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import {
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Tooltip,
  TextField,
  InputAdornment,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import { AccountCircle } from "@mui/icons-material";
import { useUserContext } from "../../common/UserContext";

type Props = {};
const Header: React.FC<Props> = () => {
  const { userName, saveUserName } = useUserContext();
  const [userDialogOpen, setUserDialogOpen] = useState<boolean>(false);
  const userNameField = useRef<HTMLInputElement>();
  const setUser = () => {
    const currentValue = userNameField?.current?.value;
    // not blank
    if (currentValue && !/^\s*$/.test(currentValue)) {
      saveUserName(currentValue);
    }
    setUserDialogOpen(false);
  };
  useEffect(() => {
    window.setTimeout(function () {
      userNameField?.current?.focus();
    }, 200);
  });

  return (
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
              to="/play"
            >
              Play
            </Button>
            <Button
              sx={{ mr: 2 }}
              color="inherit"
              component={RouterLink}
              to="/practice"
            >
              Practice
            </Button>
          </Typography>
          <Tooltip title={userName}>
            <IconButton
              onClick={() => {
                setUserDialogOpen(true);
              }}
              size="large"
              color="inherit"
            >
              {/* {<Avatar>{Array.from(userName)[0]}</Avatar>} */}
              <AccountCircle />
              <Typography variant="h6" component="div">
                {userName}
              </Typography>
            </IconButton>
          </Tooltip>
          <IconButton
            component={RouterLink}
            to="/"
            size="large"
            color="inherit"
          >
            <HelpOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog open={userDialogOpen} onClose={setUser}>
        <DialogContent>
          <TextField
            inputRef={userNameField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            id="userName"
            label="User name"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                setUser();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={setUser}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Header;
