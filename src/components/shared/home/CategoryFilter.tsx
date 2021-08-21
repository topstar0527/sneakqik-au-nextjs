import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import _ from "lodash";

import CustomInputBase from "components/core/CustomInputBase";

const useStyles = makeStyles(() => ({
  formControl: {},
  chip: {
    color: "rgba(74, 74, 74, 0.6)",
    "&.selected": {
      background: "#6E33D4",
      color: "#ffffff",
      fontWeight: "bold",
    },
    height: 24,
    fontSize: 14,
    margin: 1,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4A4A4A",
  },
}));

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  categories: string[];
  cats: Category[];
  onCategoryChange?: (categories: string[]) => void;
};

const CategoryFilter: React.FC<Props> = (props) => {
  const classes = useStyles();

  const { categories = [], cats = [], onCategoryChange = _.noop } = props;
  const catsSelected = cats.filter((item) => categories.includes(item.id));

  return (
    <div>
      <Typography className={classes.menuTitle} display="inline">
        Filter by Categories
      </Typography>{" "}
      {catsSelected.length > 0 && (
        <Chip
          size="small"
          className={classes.chip}
          label="clear"
          clickable
          onClick={() => onCategoryChange([])}
          onDelete={() => onCategoryChange([])}
        />
      )}
      <div className="my-3">
        {catsSelected.map((category: Category, index: number) => (
          <Chip key={index} size="small" className={clsx(classes.chip, "selected")} label={category.name} />
        ))}
      </div>
      <FormControl className={classes.formControl} fullWidth>
        <Select
          id="category-filter-select"
          multiple
          value={categories}
          onChange={(event) => {
            onCategoryChange(event.target.value);
          }}
          renderValue={(selected: any) => {
            if (selected.length == 0) {
              return "All Categories";
            }
            return selected.length + " Selected";
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
            getContentAnchorEl: null,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left",
            },
            disableScrollLock: true,
          }}
          input={<CustomInputBase />}
          displayEmpty
        >
          {cats.map((category: Category) => (
            <MenuItem
              key={category.id} //
              value={category.id}
              disableGutters
              dense={false}
              style={{ padding: 0 }}
            >
              <Checkbox
                checked={categories.indexOf(category.id) > -1} //
                style={{ padding: "12px 8px 12px 16px" }}
              />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CategoryFilter;
