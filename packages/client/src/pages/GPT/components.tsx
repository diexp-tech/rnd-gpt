import { Send as SendIcon } from "@mui/icons-material";
import { Paper, TextField } from "@mui/material";
import { FunctionComponent, KeyboardEvent, useState } from "react";
import styled from "styled-components";

export const ChatText = styled(Paper)(
  ({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    borderRadius: "10px",
    // borderTopLeftRadius: transmission === "receiver" ? "2px" : undefined,
    // borderTopRightRadius: transmission === "sender" ? "2px" : undefined,
  }),
);

export const MessageTextInput: FunctionComponent<{ setMessage: (text: string) => void }> = ({ setMessage }) => {
  const [text, setText] = useState<string>("");

  const sendMessage = () => {
    setMessage(text);
    setText("");
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <TextField
      fullWidth
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={onKeyDown}
      InputProps={{
        endAdornment: (
          <SendIcon
            cursor="pointer"
            onClick={sendMessage}
          />
        ),
      }}
    />
  );
};
