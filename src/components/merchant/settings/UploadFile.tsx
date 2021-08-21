import React from "react";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {},
  imgPreview: {
    width: 216,
    marginBottom: 15,

    "& img": {
      height: 108,
      objectFit: "cover",
    },
  },

  imgSelector: {
    width: "327px",
    height: "42px",
    maxWidth: "100%",
    padding: "7px 12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#C4C4C4",

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  uploadBtn: {
    height: "28px",
    width: "115px",
    padding: 0,
    color: "#6E33D4",
    borderColor: "#6E33D4",
  },
}));

export default function UploadFile(props) {
  const classes = useStyles();

  const [imagePreviewUrl, setImagePreviewUrl] = React.useState<string>("");

  const [file, setFile] = React.useState<File | null>(null);

  const handleChange = (event) => {
    event.preventDefault();

    const f = event.target.files[0];

    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   // setFile(file);
    //   setImagePreviewUrl(reader.result as string);
    // };

    // reader.readAsDataURL(f);

    setFile(f);

    props.onChange(f);
  };

  React.useEffect(() => {
    if (props.image instanceof File) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // setFile(file);
        setImagePreviewUrl(reader.result as string);
      };

      reader.readAsDataURL(props.image);
    } else {
      setImagePreviewUrl(props.image);
    }
  }, [props.image]);

  let imagePreview: React.ReactElement;
  if (imagePreviewUrl) {
    imagePreview = <img src={imagePreviewUrl} />;
  } else {
    imagePreview = <div className="previewText">Please select an Image for Preview</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.imgPreview}>{imagePreview}</div>

      <div className={classes.imgSelector}>
        <Button
          className={classes.uploadBtn} //
          variant="outlined"
          component="label"
          disableRipple
          disableElevation
        >
          + Choose file
          <input type="file" className="hidden" onChange={(e) => handleChange(e)} />
        </Button>

        <Typography variant="body1" style={{ flex: 1, textAlign: "right" }}>
          {file?.name}
        </Typography>
      </div>
    </div>
  );
}
