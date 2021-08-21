import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

type Props = {
  defaultValue: string;
  onCancel: () => void;
  onSubmit: (msg: string) => void;
};

const CommentBoxForm: React.FC<Props> = (props) => {
  const { defaultValue, onCancel, onSubmit } = props;

  const handleSubmit = () => {
    setValue("");
    onSubmit(value);
  };

  const [value, setValue] = React.useState(defaultValue);

  return (
    <form className="comment-box__form flex flex-col ">
      <TextField
        autoFocus
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

      <div className="action-bar">
        <Button
          className="comment-box__submit-button w-20 h-9 mr-2"
          onClick={handleSubmit}
          color="primary"
          variant="outlined"
        >
          Submit
        </Button>

        <Button className="comment-box__submit-button w-20 h-9" onClick={onCancel} color="primary" variant="outlined">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CommentBoxForm;
