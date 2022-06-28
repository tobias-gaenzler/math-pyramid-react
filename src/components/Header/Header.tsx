import React from "react";
import "./Header.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type Props = {};
const Header: React.FC<Props> = () => (
  <Box className="header">
    <Button>Math Pyramid</Button>
  </Box>
);

export default Header;
