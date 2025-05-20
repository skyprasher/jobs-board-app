"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

function JobDetail({ id }) {
  const [job, setJob] = useState<any>(null);
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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/${id}`)
      .then((res) => {
        setJob(res.data);
        setTitle(res.data.title);
        setSalary(res.data.salary);
        setLocation(res.data.location);
        setCompany(res.data.company);
        setDescription(res.data.description);
      })
      .catch((err) => console.error("Job fetch error:", err));
  }, [id]);

  const handleUpdate = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const updatedJob = {
      title,
      salary,
      location,
      company,
      description,
    };

    axios
      .put(`http://localhost:5000/api/${id}`, updatedJob)
      .then(() => {
        router.push("/");
      })
      .catch((err) => console.error("Update job error:", err));
  };

  if (!job) return <Typography>Loading...</Typography>;

  return (
    <Stack m={2} gap={2}>
      <Typography variant="h4">Job Details</Typography>
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
      <Button onClick={handleUpdate}>Update Job</Button>
    </Stack>
  );
}

export default JobDetail;
