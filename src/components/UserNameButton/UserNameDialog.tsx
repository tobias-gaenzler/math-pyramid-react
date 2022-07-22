import { AccountCircle } from "@mui/icons-material";
import { Dialog, DialogContent, TextField, InputAdornment, DialogActions, Button } from "@mui/material";
import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useUserContext } from "../../common";

type Props = {
    open: boolean;
    setDialogOpen: Dispatch<SetStateAction<boolean>>
};
const UserNameDialog: React.FC<Props> = ({ open, setDialogOpen }: Props) => {
    const { saveUserName } = useUserContext();

    const userNameField = useRef<HTMLInputElement>();
    const closeDialog = () => { setDialogOpen(false) }
    const handleUserNameInput = () => {
        const currentValue = userNameField?.current?.value
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
        <Dialog open={open} onClose={closeDialog}>
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
                            handleUserNameInput();
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUserNameInput}>Save</Button>
            </DialogActions>
        </Dialog>)
}
export { UserNameDialog };