import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useDispatch } from "react-redux";
import sanitizeHtml from "sanitize-html";

import Link from "components/core/Link";
import { closeViewOfferDialog } from "store/offers/actions";
import { OfferBase } from "types";
import { shorten } from "utils";

const useStyles = makeStyles(() => ({
  link: {
    opacity: 0.8,
    color: "inherit",
  },
  postDesc: {
    fontSize: 13,
    color: "#000000",
    fontWeight: 400,
  },
}));

type PropsType = {
  className?: string;
  isPost?: boolean;
  offer: OfferBase;
  previewMode?: boolean;
};

const MAX_LENGTH = 150;

const OfferDescription: React.FunctionComponent<PropsType> = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const descriptionHTML = props.offer.description || "";

  const isPost = props.isPost || false;

  const description = sanitizeHtml(descriptionHTML, { allowedTags: [] });

  const shortenDescription = shorten(description, MAX_LENGTH);

  const [isExcerpted, setExcerpted] = React.useState<boolean>(true);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setExcerpted(!isExcerpted);
  };

  if (description.length > shortenDescription.length) {
    return (
      <div className={props.className}>
        {isExcerpted ? (
          <Typography className={classes.postDesc}>
            {shortenDescription}{" "}
            <a href="#" onClick={handleToggle} className={classes.link}>
              more
            </a>
          </Typography>
        ) : (
          <>
            <div className={classes.postDesc} dangerouslySetInnerHTML={{ __html: descriptionHTML }}></div>
            {isPost && !props.previewMode && (
              <Link
                className={classes.link}
                href={"/offers/[offerSlug]"}
                as={`/offers/${props.offer.slug}`}
                // target="_blank"
                onClick={() => {
                  dispatch(closeViewOfferDialog());
                }}
              >
                view full
              </Link>
            )}
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className={props.className}>
        <>
          <div className={classes.postDesc} dangerouslySetInnerHTML={{ __html: descriptionHTML }}></div>
          {isPost && !props.previewMode && (
            <Link
              className={classes.link}
              href={"/offers/[offerSlug]"}
              as={`/offers/${props.offer.slug}`}
              // target="_blank"
              onClick={() => {
                dispatch(closeViewOfferDialog());
              }}
            >
              view full
            </Link>
          )}
        </>
      </div>
    );
  }
};

export default OfferDescription;
