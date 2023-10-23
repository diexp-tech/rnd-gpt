import AudioRecorder from "@/components/AudioRecorder";
import { Send as SendIcon } from "@mui/icons-material";
import { Box, IconButton, Paper, TextField } from "@mui/material";
import { FunctionComponent, KeyboardEvent, useState } from "react";
import styled from "styled-components";

export const ChatText = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(1)};
  margin-top: ${({ theme }) => theme.spacing(1)};
  border-radius: 10px;
  max-width: 35%;
  overflow: hidden;
`;

export const MessageTextInput: FunctionComponent<{
  setMessage: (text: string) => void
}> = ({ setMessage }) => {
  const [text, setText] = useState<string>("");

  const sendMessage = () => {
    if (!text) {
      return;
    }

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
      placeholder="Input your request"
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={onKeyDown}
      InputProps={{
        endAdornment: (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton onClick={sendMessage}>
              <SendIcon />
            </IconButton>
            <AudioRecorder />
          </Box>
        ),
      }}
    />
  );
};
