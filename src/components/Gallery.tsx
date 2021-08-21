import React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import Masonry from "react-masonry-component";

const masonryOptions = {
  transitionDuration: 0,
  gutter: 8,
};

// const imagesLoadedOptions = { background: ".my-bg-image-el" };
const useStyles = makeStyles((theme: Theme) => ({
  tile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#FFF",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "5px",
    position: "relative",

    width: "calc(50% - 8px)",
    height: `${96}px`,
    marginBottom: "8px",
    overflow: "hidden",

    [theme.breakpoints.up("sm")]: {
      width: "calc(25% - 8px)",
      height: "156px",
    },
  },
  tileHeight2: {
    width: "calc(50% - 8px)",
    // height: `${96 * 2 + 8}px`,
    height: `${96}px`,
    marginBottom: "8px",

    [theme.breakpoints.up("sm")]: {
      width: "calc(25% - 8px)",
      height: `${156 * 2 + 8}px`,
    },
  },
  selected: {
    border: "5px solid #75E1FC",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  title: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "18px",
    lineHeight: "21px",
    color: "#FFFFFF",
    zIndex: 1,
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      fontSize: "20px",
      lineHeight: "24px",
    },
  },
}));

type GalleryItemProps = Tile & {
  onSelect: (id: number) => void;
  selected?: boolean;
};

export const GalleryItem: React.FunctionComponent<GalleryItemProps> = (props) => {
  const classes = useStyles(props);
  const { id, imageSize, name, onSelect, selected = false } = props;

  const handleSelect = () => {
    onSelect && onSelect(id);
  };

  return (
    <li
      onClick={handleSelect}
      role="button"
      key={id}
      className={clsx(classes.tile, imageSize === 2 && classes.tileHeight2, selected && classes.selected)}
    >
      <div className={classes.image} style={{ backgroundImage: `url(${props.image})` }} />
      <Typography className={classes.title}>{name}</Typography>
    </li>
  );
};

export type Tile = {
  id: number;
  image: string;
  imageSize: number;
  name: string;
  slug: string;
};

export type GalleryProps = {};

export const Gallery: React.FunctionComponent<GalleryProps> = (props) => {
  return (
    <Masonry
      className={"my-gallery-class"} // default ''
      elementType={"ul"} // default 'div'
      options={masonryOptions} // default {}
      disableImagesLoaded={false} // default false
      updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
      // imagesLoadedOptions={imagesLoadedOptions} // default {}
    >
      {props.children}
    </Masonry>
  );
};
