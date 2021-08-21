import React from "react";

import IconButton from "@material-ui/core/IconButton";
import { createStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import clsx from "clsx";
import "swiper/swiper-bundle.min.css";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation]);

export const styles = createStyles({
  root: {},

  label: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#4A4A4A",
    marginBottom: 4,
  },
  // style slider
  slider: {
    width: "calc(100% + 8px)",
    height: "auto",
  },

  slide: {
    width: "auto !important",
  },

  btn: {
    padding: 4,
  },
});

const SneakSlider = (props) => {
  const {
    children, //
    className,
    classes,
    label,
  } = props;

  const [swiperInstance, setSwiperInstance] = React.useState<SwiperCore>();

  const [progress, setProgress] = React.useState(0);

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  return (
    <div className={clsx(classes.root, className)}>
      <div className="flex justify-between items-center mb-3">
        <Typography className={classes.label}>{label}</Typography>

        <div>
          <IconButton
            disabled={progress === 0}
            className={clsx(classes.btn, "swiper-button-prev-unique")}
            aria-label="prev"
            role="button"
            onClick={handlePrev}
          >
            <NavigateBeforeIcon />
          </IconButton>

          <IconButton
            disabled={progress === 1} //
            className={clsx(classes.btn, "swiper-button-next-unique")}
            aria-label="next"
            role="button"
            onClick={handleNext}
          >
            <NavigateNextIcon />
          </IconButton>
        </div>
      </div>

      <Swiper
        id="cards" //
        className={classes.slider}
        slidesPerView="auto"
        spaceBetween={8}
        onInit={(swiper) => {
          setSwiperInstance(swiper);
        }}
        onProgress={(_, p) => {
          setProgress(p);
        }}
      >
        {children.map((child, index) => (
          <SwiperSlide key={index} className={classes.slide}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default withStyles(styles, { name: "SneakSlider" })(SneakSlider);
