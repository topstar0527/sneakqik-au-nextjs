import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 27,
    height: 27,
    borderRadius: "50%",
  },
}));
export default function IconWrapper(props) {
  const classes = useStyles();

  return <div className={classes.root} {...props}></div>;
}
