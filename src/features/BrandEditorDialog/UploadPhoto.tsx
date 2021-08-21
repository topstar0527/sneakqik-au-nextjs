import React from "react";

import IconButton from "@material-ui/core/IconButton";
import MobileStepper from "@material-ui/core/MobileStepper";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Dropzone from "react-dropzone";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { Crop } from "react-image-crop";
import { useDispatch, useSelector } from "react-redux";

import { GradientButton } from "components/Buttons";
import actions from "store/actions";
import { authActions } from "store/auth/actions";
import { getCroppedImg } from "utils";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 600,
    marginBottom: "18px",
  },

  fileInput: {},

  dropzone: {
    width: "100%",
    minHeight: "215px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px #000000 dashed",
    borderRadius: "2px",
    position: "relative",
    cursor: "pointer",
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

  footer: {
    marginBottom: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column-reverse",
      alignItems: "stretch",
      marginTop: "-8px",
    },
  },

  stepper: {
    [theme.breakpoints.down("xs")]: {
      alignSelf: "center",
      marginTop: "8px",
      marginBottom: "8px",
    },
  },

  comment: {
    paddingLeft: "18px",
    paddingRight: "18px",
    fontSize: 11,
    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginTop: "8px",
      marginBottom: "8px",
      paddingLeft: "inherit",
      paddingRight: "inherit",
    },
  },

  nextButton: {
    paddingLeft: 26,
    paddingRight: 26,
    marginTop: "8px",
    marginBottom: "8px",
  },
}));

export default function UploadPhoto() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const brandDraft = useSelector((state: any) => state.merchant.brands.draft.data);

  const [image, setImage] = React.useState("");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (imgRef.current) {
      try {
        const croppedImageFile = await getCroppedImg(imgRef.current, crop, "avatar");

        dispatch(
          actions.merchant.brands.updateBrandRequest({
            form: { isPublished: true, image: croppedImageFile },
            id: brandDraft.id,
          })
        );

        dispatch(authActions.updateUserRequest({ selectedBrand: brandDraft.id }));
      } catch (e) {
        // console.error(e);
      } finally {
        // handleClose();
      }
    }
  };

  const handleDrop = async (files: File[]) => {
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImage(reader.result as string);
      });
      reader.readAsDataURL(files[0]);
    }
  };

  const [crop, setCrop] = React.useState<Crop>({ aspect: 1 / 1, width: 100, height: 100, x: 0, y: 0, unit: "px" });

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

  return (
    <React.Fragment>
      <Typography className={classes.title} variant="h5" gutterBottom>
        Upload brand photo
      </Typography>

      <Dropzone onDrop={handleDrop} noClick={Boolean(image)} noKeyboard>
        {({ getInputProps, getRootProps }) => (
          <div
            {...getRootProps({
              className: classes.dropzone,
            })}
          >
            {image ? (
              <>
                <ReactCrop
                  style={{ width: "100%", height: "100%" }}
                  imageStyle={{ width: "100%", height: "100%", objectFit: "contain" }}
                  src={image}
                  crop={crop}
                  onChange={(newCrop) => setCrop(newCrop)}
                  onComplete={(c) => setCrop(c)}
                  circularCrop
                  onImageLoaded={onLoad}
                  keepSelection
                />
                <IconButton
                  aria-label="close"
                  className={classes.closeButton}
                  onClick={() => {
                    setImage("");
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <Typography variant="h6">{"Click to upload image"}</Typography>
            )}
            <input {...getInputProps()} />
          </div>
        )}
      </Dropzone>

      <hr className="my-4 -mx-6"></hr>

      <div className={classes.footer}>
        <MobileStepper
          className={classes.stepper}
          variant="dots"
          steps={4}
          position="static"
          activeStep={2}
          backButton={null}
          nextButton={null}
        />

        <GradientButton
          className={classes.nextButton}
          type="button"
          variant="contained"
          disableElevation
          onClick={handleSubmit}
          color="primary"
        >
          Publish
        </GradientButton>
      </div>
    </React.Fragment>
  );
}
