import { AccountCircle } from "@mui/icons-material";
import {
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useUserContext } from "../../common";
import { UserNameDialog } from "./UserNameDialog";

type Props = {};
const UserNameButton: React.FC<Props> = () => {
  const { userName } = useUserContext();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
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
      </IconButton>
      <UserNameDialog open={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  );
};
export { UserNameButton };
