import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";

import { getOfferBySlug } from "store/entities/reducer";
import actions from "store/merchant/brands/actions";
import { merchantOpenViewOfferDialog, openEditOfferDialog } from "store/offers/actions";

type Props = {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  slug: string;
};

const MerchantOfferControlMenu: React.FC<Props> = (props) => {
  const { anchorEl, onClose, slug } = props;

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const offer = useSelector(getOfferBySlug(slug));

  const handleRemove = async () => {
    onClose();
    if (window.confirm("Do you really want to remove?")) {
      dispatch(actions.deleteOfferRequest(offer?.id));
    }
  };

  const handleView = async () => {
    onClose();
    dispatch(
      merchantOpenViewOfferDialog({
        offer: slug,
      })
    );
  };

  const handleEdit = async () => {
    onClose();
    dispatch(openEditOfferDialog(offer));
  };

  const handleFeature = async () => {
    onClose();
    dispatch(actions.featureOfferRequest(offer));
  };

  return (
    <Popper style={{ zIndex: 13001 }} open={open} anchorEl={anchorEl} placement="bottom-end">
      <ClickAwayListener onClickAway={onClose}>
        <Paper className="w-40">
          <List component="nav">
            <ListItem button onClick={handleView}>
              <ListItemText primary="View" />
            </ListItem>
            <ListItem button onClick={handleEdit}>
              <ListItemText primary="Edit" />
            </ListItem>
            <ListItem button onClick={handleRemove}>
              <ListItemText primary="Remove" />
            </ListItem>
            <ListItem button onClick={handleFeature} disabled={moment(offer?.expireDate).isBefore(moment())}>
              <ListItemText
                id="feature"
                primary={
                  <span>
                    Feature{" "}
                    <Checkbox
                      className="p-0 ml-2"
                      disableRipple
                      size="small"
                      edge="end"
                      checked={offer?.isFeatured}
                      inputProps={{ "aria-labelledby": "feature" }}
                    />
                  </span>
                }
              />
            </ListItem>
          </List>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default MerchantOfferControlMenu;
