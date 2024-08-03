import { Container } from "@mui/material";
import { ReactNode } from "react";

export default function CustomContainer({ children }: { children: ReactNode }) {
  return (
    <Container maxWidth={false} sx={{ maxWidth: "1480px" }}>
      {children}
    </Container>
  );
}
