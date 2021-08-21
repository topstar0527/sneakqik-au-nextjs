import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Image from "next/image";
import { useSelector } from "react-redux";

import { getSelectedBrand } from "store/auth/reducer";

type Props = {
  autoFocus?: boolean;
  onSend: (msg: string) => void;
};

const GuestUser = {
  avatar: "",
  username: "anonymous",
};

const CommentBox: React.FC<Props> = (props) => {
  const { autoFocus = false, onSend } = props;

  const handleSubmit = () => {
    setValue("");
    onSend(value);
  };

  const [value, setValue] = React.useState("");

  const user = useSelector((state: any) => state.auth.user) || GuestUser;

  const selectedBrand = useSelector(getSelectedBrand) || {};

  let avatar, username;

  if (user.userType === "customer") {
    avatar = user.avatar;
    username = user.username;
  } else if (user.userType === "merchant") {
    avatar = selectedBrand.image;
    username = selectedBrand.name;
  }

  return (
    <div className="comment-box flex items-start">
      {/* <Avatar className="comment-box__avatar-image w-8 h-8 flex-shrink-0 mr-4" src={avatar} alt={username} /> */}
      <Avatar className="comment-box__avatar-image w-8 h-8 flex-shrink-0 mr-4">
        <Image src={avatar} alt={username} layout="fill" objectFit="cover" />
      </Avatar>

      <div className="comment-box__form-container flex-1" style={{ maxWidth: "calc(100% - 36px)" }}>
        <form className="comment-box__form flex flex-col md:flex-row ">
          <TextField
            autoFocus={autoFocus}
            className="comment-texteditor flex-1 mr-0 mb-2 md:mr-2"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            size="small"
            placeholder="What do you think of this offer?"
            multiline
            variant="outlined"
          />

          <Button
            className="comment-box__submit-button w-20 h-9 mb-2"
            onClick={handleSubmit}
            color="primary"
            variant="outlined"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CommentBox;
