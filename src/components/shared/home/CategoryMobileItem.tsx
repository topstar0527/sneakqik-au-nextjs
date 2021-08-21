import React from "react";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    width: "100%",
    height: "90px",
  },
  mobileCategoryBtn: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "35px",
    marginBottom: 10,
  },
}));

export default function CategoryMobileItem(props) {
  const classes = useStyles();
  const { category, checked, onChangeCheck } = props;

  const handleCheck = () => {
    onChangeCheck(!checked, category);
  };

  return (
    <div className={classes.root}>
      <Checkbox
        checked={checked}
        value="categoryCheck"
        color="primary"
        className="absolute left-0 top-0"
        name="categoryCheck"
        onChange={handleCheck}
      />
      <Button variant="outlined" fullWidth className="absolute left-0 right-0 top-0 bottom-0" onClick={handleCheck} />
      <div className={classes.mobileCategoryBtn}>
        <img className={classes.icon} src={category.image} />
        <Typography>{category.name}</Typography>
      </div>
    </div>
  );
}
