import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (values: UserFormValues) => void;
}

interface UserFormValues {
  firstName: string;
  lastName: string;
  gender: string;
}

const AddUserModal: React.FC<AddUserModalProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const initialValues: UserFormValues = {
    firstName: "",
    lastName: "",
    gender: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    gender: Yup.string().required("Gender is required"),
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            onSave(values);
            resetForm();
            onClose();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <Field
                  name="firstName"
                  as={TextField}
                  label="First Name"
                  fullWidth
                  margin="normal"
                  error={touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
              </div>
              <div>
                <Field
                  name="lastName"
                  as={TextField}
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  error={touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                />
              </div>
              <div>
                <Field
                  name="gender"
                  as={TextField}
                  label="Gender"
                  select
                  fullWidth
                  margin="normal"
                  error={touched.gender && !!errors.gender}
                  helperText={touched.gender && errors.gender}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Field>
              </div>
              <DialogActions>
                <Button onClick={onClose} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
