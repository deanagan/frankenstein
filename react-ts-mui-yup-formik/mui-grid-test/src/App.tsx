import React, { useState } from "react";
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddUserModal from "./AddUserModal";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddUser = (user: User) => {
    setUsers([...users, { ...user }]);
  };

  return (
    <Container>
      <h1>User Management</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        Add User
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddUserModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleAddUser}
      />
    </Container>
  );
};

export default App;
