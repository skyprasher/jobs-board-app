"use client";
import {
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { TablePagination } from "@mui/material";

function JobsTable({ jobs, set, loggedin }) {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const deleteJob = (id: string) => {
    axios
      .delete(`http://localhost:5000/api/${id}`)
      .then(() => {
        axios
          .get("http://localhost:5000/api")
          .then((res) => set(res.data))
          .catch((err) => console.error("API error:", err));
      })

      .catch((err) => console.error("Delete job error:", err));
  };
  return (
    <Stack m={6} display="flex" direction="column" justifyContent="center">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5">Title</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Company</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Location</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5">Salary</Typography>
            </TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs
            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((job) => (
              <TableRow key={job?._id}>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.company}</TableCell>
                <TableCell>{job?.location}</TableCell>
                <TableCell>{job?.salary}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    disabled={!loggedin}
                    onClick={() => router.push(`/job/${job._id}`)}
                  >
                    <MdModeEditOutline />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    color="error"
                    disabled={!loggedin}
                    onClick={() => deleteJob(job._id)}
                  >
                    <MdDeleteOutline />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={jobs.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </Stack>
  );
}

export default JobsTable;
