import { useState } from "react";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 172,
    position: "relative",
    marginBottom: theme.spacing(2),
  },
  hoverLink: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",

    "& p": {
      fontSize: "20px",
      color: "#ffffff",
      position: "absolute",
    },
  },
  blackOpacity: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
    opacity: "0.3",
  },
  media: {
    height: 171.9,
    position: "relative",
    backgroundSize: "185.9px",
    backgroundPosition: "top",
  },
  cardActionContainer: {
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  expireDate: {
    listStyleType: "none",
    display: "flex",
    margin: 0,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: 3,

    "& li": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingRight: 8,
      lineHeight: "14px",
    },
    "& li:last-child": {
      paddingRight: 0,
    },
  },
  value: {
    fontSize: "12px",
    fontWeight: 700,
  },
  unit: {
    fontSize: 10,
  },
  timeIcon: {
    "& .MuiSvgIcon-root": {
      width: 17,
      height: 17,
      marginRight: 4,
    },
  },
  cardHeaderBox: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 8px 6px 6px",
  },
  cardOfferNameBox: {
    display: "flex",
    alignItems: "center",
    "& p": {
      fontSize: 12,
      fontWeight: "bold",
    },
  },
  offerCardContentBox: {
    padding: "4px 10px",
    "&.MuiCardContent-root:last-child": {
      paddingBottom: 9,
    },
  },
  offerCardTitleBox: {
    display: "flex",
    position: "relative",
    justifyContent: "space-between",

    "&.MuiGrid-item": {
      paddingBottom: 4,
    },

    "& p": {
      fontSize: "12px",
      fontWeight: "bold",
    },

    "& .MuiSvgIcon-root": {
      color: "#C4C4C4",
      position: "absolute",
      right: -10,
      top: 0,
      fontSize: "25px",
    },
  },
  offerCardTitle: {
    display: "flex",
    alignItems: "center",
  },
  morevertIcon: {
    padding: 0,
    outline: "none",
  },
  offerCardSubTitleBox: {
    "&.MuiGrid-item": {
      padding: "0 8px",
    },
  },
  offerCardSubTitle: {
    fontSize: "11px",
    color: "#7d7d7d",
  },
  offerCardCouponCodeBox: {
    display: "flex",
    fontSize: 13,

    "&.MuiGrid-item": {
      padding: "0px 8px",
    },

    "& button": {
      fontWeight: "bold",
      color: "#4a4a4a",
      backgroundColor: "#cecece",
      fontSize: 12,
      padding: "3px 8px",
      height: 19,
    },
  },
  offerCardCouponCodeSubTitle: {
    display: "flex",
    alignItems: "center",
    fontSize: 8,
    color: "#cecece",
    paddingLeft: 6,
  },
  stats: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "0 16px",
    "& .MuiSvgIcon-root": {
      fontSize: "10px",
      color: "#0000008A",
    },

    "& li span": {
      fontSize: 10,
      paddingLeft: 2,
    },
  },
  price: {
    padding: "1px 5px",
    background: "#999999",
    position: "absolute",
    right: "8px",
    top: "8px",
    borderRadius: "2px",
    color: "#ffffff",
    fontSize: "10px",
    fontWeight: "bold",
  },
  moreVerIconMenu: {
    "& .MuiListItem-button": {
      padding: "2px 12px",
      width: "115px",
    },
  },
}));

export default function ProfileOfferCard() {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
      <Card>
        <Box className={classes.cardHeaderBox}>
          <Box className={classes.cardOfferNameBox}>
            <div className={classes.timeIcon}>
              <AccessTimeIcon />
            </div>
            <Typography>QIK Deal</Typography>
          </Box>
          <ul className={classes.expireDate}>
            <li>
              <span className={classes.value}>2</span>
              <span className={classes.unit}>Days</span>
            </li>
            <li>
              <span className={classes.value}>10</span>
              <span className={classes.unit}>Hrs</span>
            </li>
            <li>
              <span className={classes.value}>5</span>
              <span className={classes.unit}>Mins</span>
            </li>
          </ul>
        </Box>
        {/* <CardMedia
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={classes.media}
          image="/images/product.png"
          title="Contemplative Reptile"
        > */}
        <CardMedia
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          className={classes.media}
          title="Contemplative Reptile"
        >
          <Image src="/images/product.png" layout="fill" objectFit="cover" />
          <Typography className={classes.price}>$22.42</Typography>
          {show && (
            <div className={classes.hoverLink}>
              <div className={classes.blackOpacity}></div>
              <Typography>Go to deal</Typography>
            </div>
          )}
        </CardMedia>
        <CardContent className={classes.offerCardContentBox}>
          <Grid container spacing={2}>
            <Grid item xs={12} className={classes.offerCardTitleBox}>
              <Typography className={classes.offerCardTitle}>
                15% off colorful hoodies 15% colorful hoodies...
              </Typography>
              <IconButton className={classes.morevertIcon} aria-label="card-menu" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <List component="nav" className={classes.moreVerIconMenu}>
                  <ListItem button>
                    <ListItemText primary="View details" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Save" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Report" />
                  </ListItem>
                </List>
              </Popover>
            </Grid>
            <Grid item xs={12} className={classes.offerCardCouponCodeBox}>
              <Button variant="contained" disableElevation>
                ABBCDE123
              </Button>
              <Typography className={classes.offerCardCouponCodeSubTitle}>Click to copy</Typography>
            </Grid>
            <Grid item xs={12}>
              <ul className={classes.stats}>
                <li>
                  <ThumbUpOutlinedIcon />
                  <span>13</span>
                </li>
                <li>
                  <ChatBubbleOutlineOutlinedIcon />
                  <span>13</span>
                </li>
                <li>
                  <ShareOutlinedIcon />
                  <span>13</span>
                </li>
              </ul>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
