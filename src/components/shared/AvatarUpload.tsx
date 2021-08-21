import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop } from "react-image-crop";

import { getCroppedImg } from "utils";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  id: string;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
  },
  pageTitle: {
    marginBottom: 12,
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 16,
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
  updateBtn: {
    fontSize: 14,
    fontWeight: "bold",
    height: 40,
    width: 117,
  },
  avatar: {
    width: 200,
    height: 200,
    display: "inline-block",
    overflow: "hidden",
    lineHeight: 1,
    verticalAlign: "middle",
    borderRadius: "50%",
    border: "1px solid white",
  },
}));

type Props = {
  image: string;
  onUpload: (imageFile: File) => void;
};

const AvatarUpload: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [crop, setCrop] = React.useState<Crop>({ aspect: 1 / 1, width: 100, height: 100, x: 0, y: 0, unit: "px" });

  const [image, setImage] = React.useState<string>(props.image);

  React.useEffect(() => {
    setImage(props.image);
  }, [props.image]);

  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const onLoad = React.useCallback((img: HTMLImageElement) => {
    imgRef.current = img;

    const aspect = 1 / 1;
    const width = img.width;
    const height = img.height;

    const diameter = Math.min(width, height);

    const y = (height - diameter) / 2;
    const x = (width - diameter) / 2;

    setCrop({
      unit: "px",
      width: diameter,
      height: diameter,
      x,
      y,
      aspect,
    });

    return false; // Return false if you set crop state in here.
  }, []);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        handleClickOpen();
        setImage(reader.result as string);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const [open, setOpen] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitAvatar = async () => {
    if (imgRef.current) {
      try {
        const croppedImageFile = await getCroppedImg(imgRef.current, crop, "avatar");
        props.onUpload(croppedImageFile);
      } catch (e) {
        console.error(e);
      } finally {
        handleClose();
      }
    }
  };

  return (
    <>
      <img className={classes.avatar} src={props.image} />

      {/* Upload Button */}
      <label htmlFor="upload-avatar">
        <Button variant="outlined" component="span">
          Upload Avatar
        </Button>
      </label>
      <input
        accept="image/*"
        className="hidden"
        id="upload-avatar"
        type="file"
        onChange={handleSelectFile}
        onClick={(e) => {
          e.currentTarget.value = "";
        }}
      />

      {/* Avatar Editor Dialog */}
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Crop your new profile picture
        </DialogTitle>

        <DialogContent dividers>
          <ReactCrop
            style={{ width: 414 }}
            imageStyle={{ width: "100%" }}
            src={image}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={(c) => setCrop(c)}
            circularCrop
            onImageLoaded={onLoad}
            keepSelection
          />
        </DialogContent>

        <DialogActions>
          <Button autoFocus color="primary" onClick={handleSubmitAvatar}>
            Set new profile picture
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AvatarUpload;
