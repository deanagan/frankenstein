// src/AutoCompleteForm.tsx
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

// Define the type for the fruit options
type FruitOption = {
  id: number;
  label: string;
};

const options: FruitOption[] = [
  { id: 1, label: "Apple" },
  { id: 2, label: "Banana" },
  { id: 3, label: "Cherry" },
];

// Define the form values type
type FormValues = {
  fruit: FruitOption | null;
};

// Define the validation schema using Yup
const validationSchema = Yup.object({
  fruit: Yup.object().required("Fruit is required"),
});

const AutoCompleteForm: React.FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      fruit: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Autocomplete
        id="fruit"
        options={options}
        getOptionLabel={(option) => option.label}
        onChange={(event, value) => formik.setFieldValue("fruit", value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select a fruit"
            error={formik.touched.fruit && Boolean(formik.errors.fruit)}
            helperText={
              formik.touched.fruit && formik.errors.fruit
                ? formik.errors.fruit
                : " "
            }
          />
        )}
        onBlur={formik.handleBlur}
      />
      <Box mt={2}>
        <Button color="primary" variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default AutoCompleteForm;
