import { Container } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function NotFoundView() {
  return (
    <Container
      sx={{
        height: "100%",
        display: "grid",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        Sorry... nothing here. <RouterLink to="/">Go to start page</RouterLink>
      </div>
    </Container>
  );
}

export default NotFoundView;
