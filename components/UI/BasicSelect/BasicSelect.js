import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {  Controller } from "react-hook-form";

// eslint-disable-next-line react/display-name
const BasicSelect = (props) => {
  return (
    <Box >
      <FormControl sx={{ width: "150px" }} fullWidth className={props.className}>
        <InputLabel id="demo-simple-select-label">{props.labelName}</InputLabel>
        <Controller
          render={({ field }) => (
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue=""
              label="Time"
              {...field}
            >
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
              <MenuItem value="Saturday">Saturday</MenuItem>
              <MenuItem value="Sunday">Sunday</MenuItem>
            </Select>
          )}
          control={props.control}
          name="selectedDay"
        />
      </FormControl>
    </Box>
  );
};
export default BasicSelect;
