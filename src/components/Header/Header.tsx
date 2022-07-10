import React, { useState } from "react";
import "./Header.css";
import {
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import { AccountCircle } from "@mui/icons-material";
import { useUserContext } from "../../common";
import { MenuEntry, UserNameDialog } from "../../components";

type Props = {};
const Header: React.FC<Props> = () => {
  const { userName } = useUserContext();
  const [userNameDialogOpen, setUserNameDialogOpen] = useState<boolean>(false);

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
            <MenuEntry route="/play" title="Play" />
            <MenuEntry route="/practice" title="Practice" />
          </Typography>
          <Tooltip title={userName}>
            <IconButton
              onClick={() => {
                setUserNameDialogOpen(true);
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
      <UserNameDialog
        open={userNameDialogOpen}
        setOpen={setUserNameDialogOpen}
      />
    </Box>
  );
};

export default Header;
