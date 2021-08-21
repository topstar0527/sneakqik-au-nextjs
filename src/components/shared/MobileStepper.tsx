import React from "react";

import Box from "@material-ui/core/Box";
import CircularProgress, { CircularProgressProps } from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles({
  root: {
    position: "relative",
    display: "inline-flex",
    marginRight: "20px",
  },
  bottom: {
    color: "#D2D2D2",
  },
  top: {
    position: "absolute",
    left: 0,
  },
});

const CircularProgressWithLabel: React.FC<CircularProgressProps & { label: string; value: number }> = (props) => {
  const classes = useStyle();

  return (
    <Box position="relative" display="inline-flex" marginRight="20px">
      <CircularProgress
        className={classes.bottom}
        thickness={5}
        size={56}
        variant="determinate"
        {...props}
        value={100}
      />
      <CircularProgress
        className={classes.top}
        thickness={5}
        size={56}
        variant="static"
        {...props}
        value={props.value}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
};

type MobileStepperProps = {
  curLabel: string;
  nextLabel: string;
  step: number;
  value: number;
};

const MobileStepper: React.FunctionComponent<MobileStepperProps> = (props) => {
  return (
    <Box className="flex items-stretch justify-start" minWidth={240} marginBottom={4}>
      <CircularProgressWithLabel value={props.value} label={`${props.step} of 3`} />
      <div className="flex flex-col justify-around">
        <Typography
          variant="h6"
          component="h6"
          style={{ fontWeight: "bold", fontSize: "20px", lineHeight: "24px", color: "#2D2D2D" }}
        >
          {props.curLabel}
        </Typography>
        {props.nextLabel && (
          <Typography variant="body1" component="p" style={{ fontSize: "14px", lineHeight: "17px" }}>
            Next: {props.nextLabel}
          </Typography>
        )}
      </div>
    </Box>
  );
};

export default MobileStepper;
