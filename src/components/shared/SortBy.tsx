import React from "react";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  sort: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginLeft: "auto",
    marginBottom: 20,
    marginTop: 10,

    "& .MuiTypography-root": {
      paddingRight: 6,
    },

    "& .MuiSelect-root": {
      padding: 9,
      width: 117,
    },
  },
});

type Props = {
  onChange: (v) => void;
  value: any;
};

const SortBy: React.FC<Props> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.sort}>
      <Typography>Sort by</Typography>
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-outlined-label" />
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
        >
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="featured">Featured</MenuItem>
          <MenuItem value="mostpopular">Most popular</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortBy;
