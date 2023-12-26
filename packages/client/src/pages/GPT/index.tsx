import { useMessages } from '@/store/messages';
import { MessageRole } from '@/types/message-role.enum';
import { CloseOutlined, QuestionMark } from '@mui/icons-material';
import { Box, Fade, Grid, IconButton, Paper, Skeleton, Tooltip, Typography } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ChatText, MessageTextInput } from './components';

export const GPT = () => {
  const { messages, isLoading: isMessageLoading, sendMessage, isAudioLoading } = useMessages();
  const [openHint, setOpenHint] = React.useState(true);
  const [openHint2, setOpenHint2] = React.useState(false);

  const sendUserMessage = useCallback<(text: string) => void>((text: string) => {
    if (isMessageLoading) {
      toast('Wait for previous answer');
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
      <Grid
        flex={1}
        direction="column"
        overflow="auto"
        container
        spacing={1}
      >{!messages.length ?
        (
          <>
            <Fade in={openHint} timeout={1500}>
              <Paper
                style={{ padding: 5, maxWidth: '30%', minWidth: 250, margin: 'auto', flexDirection: 'column', display: openHint ? 'flex' : 'none' }}>
                <IconButton sx={{ marginLeft: 'auto' }} onClick={() => {
                  setOpenHint(false);
                  setTimeout(() => setOpenHint2(true), 500);
                }}>
                  <CloseOutlined />
                </IconButton>
                <Box padding="0px 15px 15px 15px">
                  <Typography variant="h5" align="center">OpenAI assistant example</Typography>
                  <Typography marginTop="15px">Current example allows you to communicate with OpenAI Chat GPT 4 via text
                    or
                    speech recognised
                    by OpenAI Whisper-1 model</Typography>
                </Box>
              </Paper>
            </Fade>
            <Fade in={openHint2} timeout={1500}>
              <Paper
                style={{ padding: 5, maxWidth: '30%', minWidth: 250, margin: 'auto', flexDirection: 'column', display: openHint2 ? 'flex' : 'none' }}>
                <Tooltip title={'Show hint'}>
                  <IconButton sx={{ marginLeft: 'auto' }} onClick={() => {
                    setOpenHint2(false);
                    setOpenHint(true);
                  }}>
                    <QuestionMark />
                  </IconButton>
                </Tooltip>
                <Box padding="0px 15px 15px 15px">
                  <Typography variant="h5" align="center">Start your messaging right now!</Typography>
                  <Typography marginTop="15px">Please, type or record your first message below to start
                    conversation.</Typography>
                </Box>
              </Paper>
            </Fade>
          </>
        ) : <Box
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
              justifyContent={el.role === MessageRole.CHAT_GPT ? 'start' : 'end'}
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
              justifyContent={isMessageLoading ? 'start' : 'end'}
              marginTop={1}
            >
              <Skeleton variant="rounded" width="35%" height={32} />
            </Box>
          )}
        </Box>
      }
      </Grid>
      <Grid item width="100%" padding="10px">
        <MessageTextInput setMessage={sendUserMessage} />
      </Grid>
    </Grid>
  );
};
