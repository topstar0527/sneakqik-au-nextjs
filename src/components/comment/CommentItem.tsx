import React from "react";

import Avatar from "@material-ui/core/Avatar";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Typography from "@material-ui/core/Typography";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

import CommentBoxForm from "components/comment/CommentBoxForm";
import { getUser } from "store/auth/reducer";
import { deleteCommentRequest, updateCommentRequest } from "store/entities/actions";
import { getCommentById, getAuthorById, getOfferBySlug } from "store/entities/reducer";

type Props = {
  commentId: string;
};

const CommentItem: React.FC<Props> = (props) => {
  const { commentId } = props;

  const comment = useSelector(getCommentById(commentId));

  const author = useSelector(getAuthorById(comment.commentAuthor));

  const offer = useSelector(getOfferBySlug(comment.offerSlug));

  const user: any = useSelector(getUser);

  const avatar =
    author.image ||
    `https://www.tinygraphs.com/squares/${author.authorId}?theme=bythepool&numcolors=4&size=220&fmt=svg`;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handleDelete = () => {
    handleClose();
    dispatch(deleteCommentRequest({ offer: offer, comment: comment }));
  };

  const [editable, setEditable] = React.useState<boolean>(false);

  const handleEdit = () => {
    setEditable(true);
    handleClose();
  };

  const handleSubmit = (msg) => {
    setEditable(false);
    dispatch(updateCommentRequest({ comment: { ...comment, message: msg } }));
  };

  const handleCancel = () => {
    setEditable(false);
  };

  // generate more action menu
  const generateMenu = React.useCallback(() => {
    let menu: React.ReactNode = null;

    if (user && user.userType === "customer" && user.id === author.authorId) {
      menu = (
        <MenuList>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </MenuList>
      );
    }

    if (user && user.userType === "merchant" && user.selectedBrand === author.authorId) {
      menu = (
        <MenuList>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </MenuList>
      );
    }
    return menu;
  }, [user, author]);

  return (
    <div className="comment-item flex items-start my-3 relative">
      {/* <Avatar
        className="comment-item__avatar-image w-8 h-8 flex-shrink-0 mt-3 mr-3"
        src={avatar}
        alt={author.username}
      /> */}
      <Avatar className="comment-item__avatar-image w-8 h-8 flex-shrink-0 mt-3 mr-3" alt={author.username}>
        <Image src={avatar} layout="fill" objectFit="cover" />
      </Avatar>

      <div className="comment-item__post flex-1 border-solid rounded-bl-2xl rounded-r-2xl p-3 overflow-hidden">
        <div className="comment-item__post-meta flex justify-between items-center mb-2">
          <Typography className="text-base font-bold" variant="body1">
            {author.name}
          </Typography>
          <Typography className="text-xs mr-6" variant="body2">
            {moment(comment.createdAt).fromNow()}
          </Typography>
        </div>

        {editable ? (
          <CommentBoxForm defaultValue={comment.message} onSubmit={handleSubmit} onCancel={handleCancel} />
        ) : (
          <div className="comment-item__post-content text-sm break-words">{comment.message}</div>
        )}
      </div>

      <IconButton className="absolute right-0 p-1 mt-1" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>

      <Popper style={{ zIndex: 13001 }} open={open} anchorEl={anchorEl} placement="bottom-end">
        <ClickAwayListener onClickAway={handleClose}>
          <Paper className="w-40">{generateMenu()}</Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default CommentItem;
