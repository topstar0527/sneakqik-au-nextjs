import React from "react";

import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import dynamic from "next/dynamic";

export const styles = () =>
  createStyles({
    root: {
      listStyleType: "none",
      display: "flex",
      margin: 0,
      justifyContent: "space-evenly",
      alignItems: "center",
      paddingTop: 3,
      minHeight: "32px",

      "& li": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingRight: 8,
        lineHeight: "16px",

        "& .value": {
          fontSize: "14px",
          fontWeight: 700,
        },

        "& .unit": {
          fontSize: 12,
        },
      },
    },
  });

const DynamicCountdownWithNoSSR = dynamic(() => import("react-countdown"), { ssr: false });

type Props = {
  date?: string | null;
  isSecond?: boolean;
};

type PropsWithStyles = Props & WithStyles<typeof styles>;

const ExpiryTimer: React.FC<PropsWithStyles> = (props) => {
  const { classes, date, isSecond = false } = props;

  const renderer = ({ completed, days, hours, minutes, seconds }) => {
    if (completed) {
      // Render a completed state
      return (
        <Typography className={classes.root} variant="body1">
          Expired
        </Typography>
      );
    } else {
      // Render a countdown
      return (
        <ul className={classes.root}>
          <li>
            <span className="value">{days}</span>
            <span className="unit">Days</span>
          </li>
          <li>
            <span className="value">{hours}</span>
            <span className="unit">Hrs</span>
          </li>
          <li>
            <span className="value">{minutes}</span>
            <span className="unit">Mins</span>
          </li>
          {isSecond && (
            <li>
              <span className="value">{seconds}</span>
              <span className="unit">Secs</span>
            </li>
          )}
        </ul>
      );
    }
  };

  return <DynamicCountdownWithNoSSR date={date || new Date()} renderer={renderer} />;
};

export default withStyles(styles, { name: "ExpiryTimer" })(ExpiryTimer);
