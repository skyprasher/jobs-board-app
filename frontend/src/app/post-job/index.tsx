"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";

function CreateAndPostJob() {
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const stringOnlyRegex = /^[a-zA-Z\s]+$/;
    if (!stringOnlyRegex.test(title.trim())) {
      newErrors.title = "Title must contain only letters";
    }
    if (title.trim().length < 3)
      newErrors.title = "Title must be at least 3 characters";
    if (!salary || isNaN(Number(salary)))
      newErrors.salary = "Salary must be a valid number";
    if (location.trim().length < 2)
      newErrors.location = "valid location is required";
    if (company.trim().length < 1)
      newErrors.company = "Company name is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const newJob = {
      title,
      salary,
      location,
      company,
      description,
    };

    axios
      .post("http://localhost:5000/api", newJob)
      .then(() => {
        router.push("/"); // Redirect to homepage after posting
      })
      .catch((err) => console.error("Create job error:", err));
  };

  return (
    <Stack m={4} spacing={2}>
      <Typography variant="h4">Post a New Job</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            required
          />
          <TextField
            label="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            error={!!errors.salary}
            helperText={errors.salary}
            required
          />
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            error={!!errors.location}
            helperText={errors.location}
            required
          />
          <TextField
            label="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            error={!!errors.company}
            helperText={errors.company}
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
          />
          <Stack width="100%">
            <Grid display="flex" justifyContent="center">
              <Button variant="contained" color="primary" type="submit">
                Post Job
              </Button>
            </Grid>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
}

export default CreateAndPostJob;
