// src/App.tsx
import React from "react";
import Container from "@mui/material/Container";
import AutoCompleteForm from "./AutoCompleteForm";

const App: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <h1>Fruit Selection Form</h1>
      <AutoCompleteForm />
    </Container>
  );
};

export default App;
