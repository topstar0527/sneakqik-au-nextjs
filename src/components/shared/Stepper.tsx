import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyle = makeStyles({
  root: {
    position: "relative",
    display: "inline-flex",
    marginRight: "20px",
  },
  stepContainer: {
    display: "flex",
    flexDirection: "column",

    "& .step-status": {
      textAlign: "center",
      marginBottom: 15,
    },
    "& .items-stretch": {
      marginBottom: 22,
    },
  },
  bottom: {
    color: "#D2D2D2",
  },
  top: {
    position: "absolute",
    left: 0,
  },
  stepWrapper: {
    width: "140.69px",
    height: "40px",
    position: "relative",
    background: "#C4C4C4",
    marginRight: 8,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",

    "& .stepTitle": {
      fontSize: "14px",
      lineHeight: "24px",
      color: "#4A4A4A",
    },

    "&:after": {
      content: '""',
      position: "absolute",
      left: "0",
      bottom: "0",
      width: "0",
      height: "0",
      borderLeft: "20px solid white",
      borderTop: "20px solid transparent",
      borderBottom: "20px solid transparent",
    },
    "&:before": {
      content: '""',
      position: "absolute",
      right: "-20px",
      bottom: "0",
      width: "0",
      height: "0",
      borderLeft: "20px solid #C4C4C4",
      borderTop: "20px solid transparent",
      borderBottom: "20px solid transparent",
    },
    "&#first:after": {
      border: "none",
    },
    "&#first": {
      zIndex: 3,
      borderTopLeftRadius: "2px",
      borderBottomLeftRadius: "2px",
    },
    "&#second": {
      zIndex: 2,
      paddingLeft: 16,
    },
    "&#third": {
      zIndex: 1,
      paddingLeft: 16,
    },
  },
  selected: {
    cursor: "pointer",
    background: "#3D3D3DCC",

    "&:before": {
      borderLeft: "20px solid #3D3D3DCC",
    },

    "& .stepTitle": {
      fontWeight: "bold",
      color: "#ffffff",
    },
  },
});

type StepperProps = {
  actions: any;
  curLabel: string;
  nextLabel: string;
  step: number;
  value: number;
};

const Stepper: React.FunctionComponent<StepperProps> = (props) => {
  const classes = useStyle();

  return (
    <div className={classes.stepContainer}>
      <Typography className="step-status">{`STEP ${props.step} OF 3`}</Typography>
      <div className="flex items-stretch justify-start">
        <div
          id="first"
          className={`${classes.selected} ${classes.stepWrapper}`}
          onClick={() => {
            props.actions.goToStep(0);
          }}
        >
          <Typography className="stepTitle">Choose plan</Typography>
        </div>
        <div
          id="second"
          className={
            props.step === 2 || props.step === 3 ? `${classes.selected} ${classes.stepWrapper}` : classes.stepWrapper
          }
          onClick={() => {
            if (props.step === 3) {
              props.actions.goToStep(1);
            }
          }}
        >
          <Typography className="stepTitle">Log in details</Typography>
        </div>
        <div
          id="third"
          className={props.step === 3 ? `${classes.selected} ${classes.stepWrapper}` : classes.stepWrapper}
        >
          <Typography className="stepTitle">Business details</Typography>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
