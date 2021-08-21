import React from "react";

import Typography from "@material-ui/core/Typography";

export type CopyrightProps = {
  className?: string;
};

export default function Copyright(props: CopyrightProps) {
  const { className } = props;
  return (
    <Typography className={className} variant="body2" color="textSecondary" align="center">
      Copyright © 2021 SneakQIK.com All Rights Reserved.
    </Typography>
  );
}
