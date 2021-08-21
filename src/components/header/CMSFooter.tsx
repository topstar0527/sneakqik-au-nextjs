import React from "react";

import Container from "@material-ui/core/Container";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import Link from "components/core/Link";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      borderTop: "1px solid rgba(0, 0, 0, 0.12)",
    },

    sitemap: {
      marginTop: 32,
      marginBottom: 32,
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      lineHeight: 1.4,

      [theme.breakpoints.down("sm")]: {
        marginTop: 16,
        marginBottom: 16,
      },

      "& li": {
        listStyle: "disc",
        paddingLeft: 4,
        paddingRight: 4,
        marginLeft: 8,
        marginRight: 8,
      },

      "& li:first-child": {
        listStyle: "none",
      },
    },
  });

type Props = WithStyles<typeof styles> & {
  className?: string;
};

const CMSFooter: React.FC<Props> = (props) => {
  const { className, classes } = props;

  return (
    <Container className={clsx(classes.root, className)} maxWidth="lg" style={{ maxWidth: 1174 }}>
      <ul className={classes.sitemap}>
        <li>
          <span>SneakQIK.com © 2021</span>
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
          <Link color="initial" href="/contact">
            Contact us
          </Link>
        </li>
        <li>
          <Link color="initial" href="/privacy-terms">
            Terms & Conditions
          </Link>
        </li>
        <li>ABN:76 160 237 525</li>
      </ul>
    </Container>
  );
};

export default withStyles(styles, {})(CMSFooter);
