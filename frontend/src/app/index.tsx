"use client";
import JobsTable from "@/Components/jobsTable";
import LocationSearch from "@/Components/locationSearch";
import { useAuth } from "@/context/AuthContext";
import { Button, Grid, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Job {
  _id: string;
  title: string;
  salary: string;
  location: string;
  company: string;
  description: string;
}

function Home() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error("API error:", err));
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job?.location.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  // console.log("data", data);
  // const isLoggedIn = !!localStorage.getItem("token");
  const { isLoggedIn, logout } = useAuth();

  return (
    <Stack width="100%" justifyContent="center">
      <Grid>
        <Stack direction="row" m={2} justifyContent="space-between">
          <Typography variant="h3" color="secondary">
            Jobs Board
          </Typography>
          <Stack direction="row" gap={2}>
            <Button
              onClick={() => (isLoggedIn ? logout() : router.push("/login"))}
            >
              <Typography variant="h6">
                {isLoggedIn ? "logout" : "login"}
              </Typography>
            </Button>
            <Button
              variant="contained"
              onClick={() => router.push("/post-job")}
            >
              <Typography variant="h6">Post Job</Typography>
            </Button>
          </Stack>
        </Stack>
        <LocationSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <JobsTable jobs={filteredJobs} set={setJobs} loggedin={isLoggedIn} />
      </Grid>
    </Stack>
  );
}

export default Home;
