import { useState } from "react";

import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import moment, { Moment, unitOfTime } from "moment";

import { filters } from "data/demo";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: 15,
    marginBottom: 8,

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      marginTop: 12,
    },
  },
  chip: {
    "&.selected": {
      background: "#6E33D4",
      color: "#ffffff",
      fontWeight: "bold",
    },
    background: "#C4C4C4",
    height: 26,
    fontSize: 14,
    marginRight: theme.spacing(0.5),

    [theme.breakpoints.down("xs")]: {
      marginBottom: 10,
    },
  },

  sortby: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    visibility: "hidden",
    "& .MuiTypography-root": {
      paddingRight: 6,
    },

    "& .MuiSelect-root": {
      padding: 9,
      width: 117,
    },

    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

type Props = {
  onPeriodChange?: (start: Moment, end: Moment) => void;
  onTypeChange: (type: string) => void;
  type: string;
};

const FilterSection: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { onTypeChange, type = "all" } = props;

  const [filterBy, setFilterBy] = useState("day");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterBy(event.target.value as string);

    let start, end;

    if (event.target.value !== "all") {
      start = moment().startOf(event.target.value as unitOfTime.Base);
      end = moment().endOf(event.target.value as unitOfTime.Base);
    } else {
      start = moment(0);
      end = moment();
    }

    props.onPeriodChange && props.onPeriodChange(start, end);
  };

  return (
    <div className={classes.root}>
      <div>
        {filters.types.map((t) => {
          return (
            <Chip
              key={t.id}
              label={t.name}
              clickable
              className={clsx(classes.chip, t.value === type && "selected")}
              onClick={() => onTypeChange(t.value)}
            />
          );
        })}
      </div>

      <div className={classes.sortby}>
        <Typography>Filter by</Typography>
        <FormControl variant="outlined">
          <InputLabel id="filter-by-label" />
          <Select labelId="filter-by-label" id="filter-by" value={filterBy} onChange={handleChange}>
            {filters.periods.map((filter) => (
              <MenuItem key={filter.id} value={filter.value}>
                {filter.name}
              </MenuItem>
            ))}
            {/* <Divider />
            {filters.times.map((filter) => (
              <MenuItem key={filter.id} value={filter.name}>
                {filter.name}
              </MenuItem>
            ))} */}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default FilterSection;
