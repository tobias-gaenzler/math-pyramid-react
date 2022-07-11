import { AccountCircle } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../../common";

type Props = {};
const UserNameButton: React.FC<Props> = () => {
  const { userName, saveUserName } = useUserContext();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const userNameField = useRef<HTMLInputElement>();
  const setUser = () => {
    const currentValue = userNameField?.current?.value;
    // not blank
    if (currentValue && !/^\s*$/.test(currentValue)) {
      saveUserName(currentValue);
    }
    setDialogOpen(false);
  };
  useEffect(() => {
    // fix focus on input field after dialog opens
    window.setTimeout(function () {
      userNameField?.current?.focus();
    }, 200);
  });
  return (
    <IconButton
      onClick={() => {
        setDialogOpen(true);
      }}
      size="large"
      color="inherit"
    >
      {/* {<Avatar>{Array.from(userName)[0]}</Avatar>} */}
      <AccountCircle />
      <Typography variant="h6" component="div">
        {userName}
      </Typography>
      <Dialog open={dialogOpen} onClose={setUser}>
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
    </IconButton>
  );
};
export { UserNameButton };
