import React from "react";

import MuiLink from "@material-ui/core/Link";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import { useDispatch } from "react-redux";

import Link from "components/core/Link";
import actions from "store/support/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 72,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 24,
    },
    linksBox: {
      marginBottom: 8,
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",

      "& li": {
        listStyle: "disc",
        marginRight: 8,
        fontSize: 12,
        marginBottom: 18,
        marginLeft: 8,

        [theme.breakpoints.down("xs")]: {
          listStyle: "none",
        },
      },
      "& li:first-child": {
        listStyle: "none",
      },
      "& li span": {
        paddingRight: 8,
      },
      "& li a": {
        paddingRight: 8,
      },
      "& .help": {
        listStyle: "disc",
      },
    },
    links: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
    },
    copyright: {
      textAlign: "center",
      listStyle: "none",
      paddingRight: 8,
    },
  })
);

type Props = {
  className?: string;
};

const Footer: React.FC<Props> = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <div className={clsx(classes.root, props.className)}>
      <ul className={classes.linksBox}>
        <li>
          <span className={classes.copyright}>SneakQIK.com © 2021</span>
        </li>
        <li>
          <Link color="initial" href="/about">
            About
          </Link>
        </li>
        {/* <li>
          <Link color="initial" href="/faq">
            FAQ
          </Link>
        </li> */}
        <li>
          <Link color="initial" href="/business/forbusinesses.html">
            For Businesses
          </Link>
        </li>

        <li>
          <MuiLink color="initial" role="button" onClick={() => dispatch(actions.showContactUsDialog())}>
            Contact us
          </MuiLink>
        </li>
        <li>
          <Link color="initial" href="/privacy-terms">
            Terms & Privacy
          </Link>
        </li>
        <li>ABN:76 160 237 525</li>
      </ul>
    </div>
  );
};

export default Footer;
