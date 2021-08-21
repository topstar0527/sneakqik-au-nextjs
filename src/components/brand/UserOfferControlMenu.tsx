import React from "react";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { useSelector, useDispatch } from "react-redux";

import { reportOffer, saveOffer } from "store/entities/actions";
import { getOfferBySlug } from "store/entities/reducer";
import { openViewOfferDialog } from "store/offers/actions";

type Props = {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
  slug: string;
};

const UserOfferControlMenu: React.FC<Props> = (props) => {
  const { anchorEl, onClose, slug } = props;

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const offer = useSelector(getOfferBySlug(slug));

  const handleView = () => {
    onClose();
    dispatch(openViewOfferDialog({ offer: slug }));
  };

  const handleReport = async () => {
    onClose();
    dispatch(reportOffer(offer));
  };

  const handleSave = async () => {
    onClose();
    dispatch(saveOffer(offer));
  };

  return (
    <Popper style={{ zIndex: 13001 }} open={open} anchorEl={anchorEl} placement="bottom-end">
      <ClickAwayListener onClickAway={onClose}>
        <Paper className="w-40">
          <List component="nav">
            <ListItem button onClick={handleView}>
              <ListItemText primary="View Detail" />
            </ListItem>

            <ListItem button onClick={handleSave}>
              <ListItemText primary="Save" />
            </ListItem>

            <ListItem button onClick={handleReport}>
              <ListItemText primary="Report" />
            </ListItem>
          </List>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default UserOfferControlMenu;
