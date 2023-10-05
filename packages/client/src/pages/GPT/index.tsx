import { useMessages } from "@/store/messages";
import { AppBar, Box, Grid, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { ChatText, MessageTextInput } from "./components";

export const GPT = () => {
  const { messages, isLoading: isMessageLoading, sendMessage } = useMessages();

  const sendUserMessage = useCallback<(text: string) => void>((text: string) => {
    if (isMessageLoading) {
      toast("Wait for previous answer");
      return;
    }

    sendMessage(text);
  }, [isMessageLoading, sendMessage]);

  useEffect(() => {
    const el = document.getElementById(`message-${messages.length - 1}`);
    if (el) {
      el.scrollIntoView();
    }
  }, [messages]);

  return (
    <Grid
      container
      direction="column"
      flex={1}
      padding={0.5}
      gap={0.5}
      overflow="hidden"
    >
      <AppBar>
        <Typography>GPT Example App</Typography>
      </AppBar>
      <Grid
        container
        flex={1}
        direction="column"
        overflow="auto"
        spacing={1}
        paddingTop={2.5}
        justifyContent="flex-end"
      >
        <Box
          overflow="auto"
          paddingLeft={1.25}
          paddingY={0.5}
        >
          {messages.map((el, index) => (
            <Box
              component={Grid}
              key={`message-${index}`}
              id={`message-${index}`}
              container
              direction="row"
              item
              xs={12}
            >
              <ChatText>{el.text}</ChatText>
            </Box>
          ))}
          {isMessageLoading && (
            <Box
              component={Grid}
              container
              direction="row"
              item
              xs={12}
            >
              <ChatText>...</ChatText>
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item width="100%">
        <MessageTextInput setMessage={sendUserMessage} />
      </Grid>
    </Grid>
  );
};
