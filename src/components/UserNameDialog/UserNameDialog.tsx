import { AccountCircle } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  DialogActions,
  Button,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useUserContext } from "../../common";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const UserNameDialog: React.FC<Props> = ({
  open: dialogOpen,
  setOpen: setDialogOpen,
}: Props) => {
  const { saveUserName } = useUserContext();
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
    window.setTimeout(function () {
      userNameField?.current?.focus();
    }, 200);
  });
  return (
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
  );
};
export { UserNameDialog };
