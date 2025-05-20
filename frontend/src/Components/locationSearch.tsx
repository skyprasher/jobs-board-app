import { Stack, TextField } from "@mui/material";
import React from "react";

interface LocationSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

function LocationSearch({ searchTerm, onSearchChange }: LocationSearchProps) {
  return (
    <Stack alignItems="center">
      <TextField
        label="Filter by Location"
        variant="outlined"
        size="small"
        sx={{ width: 500 }}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </Stack>
  );
}

export default LocationSearch;
