import { useMessages } from "@/store/messages";
import { MessageRole } from "@/types/message-role.enum";
import { AppBar, Box, Grid, Paper, Skeleton, Typography } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { ChatText, MessageTextInput } from "./components";

export const GPT = () => {
  const { messages, isLoading: isMessageLoading, sendMessage, isAudioLoading } = useMessages();

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

  if (!messages?.length) {
    return (
      <Grid
        container
        direction="column"
        flex={1}
        padding={0.5}
        gap={0.5}
        overflow="hidden"
      >
        <Grid
          container
          flex={1}
          direction="column"
          overflow="auto"
          spacing={1}
          // paddingTop={2.5}
          justifyContent="center"
          alignItems="center"
        >
          <Paper style={{ padding: 5, maxWidth: "30%", minWidth: 250 }}>
            <Typography variant="h5" align="center">OpenAI chat example</Typography>
            <Typography>Current example allows you to communicate with OpenAI Chat GPT 4 via text or speech recognised
              by OpenAI Whisper-1 model</Typography>
          </Paper>
        </Grid>
        <Grid item width="100%">
          <MessageTextInput setMessage={sendUserMessage} />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      direction="column"
      flex={1}
      padding={0.5}
      gap={0.5}
      overflow="hidden"
    >
      <Grid
        flex={1}
        direction="column"
        overflow="auto"
        container
        spacing={1}
      >
        <Box
          overflow="auto"
          paddingLeft={1.25}
          paddingRight={0.25}
          paddingY={0.5}
          maxWidth="100%"
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
              justifyContent={el.role === MessageRole.CHAT_GPT ? "start" : "end"}
            >
              <ChatText>
                <Typography>{el.text}</Typography>
              </ChatText>
            </Box>
          ))}
          {(isMessageLoading || isAudioLoading) && (
            <Box
              component={Grid}
              container
              direction="row"
              item
              xs={12}
              justifyContent={isMessageLoading ? "start" : "end"}
              marginTop={1}
            >
              <Skeleton variant="rounded" width="35%" height={32} />
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
