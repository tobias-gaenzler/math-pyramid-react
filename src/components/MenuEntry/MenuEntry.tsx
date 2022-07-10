import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  route: string;
  title: string;
};
const MenuEntry: React.FC<Props> = ({ route, title }: Props) => {
  return (
    <Button sx={{ mr: 2 }} color="inherit" component={RouterLink} to={route}>
      {title}
    </Button>
  );
};

export { MenuEntry };
