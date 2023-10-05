import GlobalStyle from '@/components/GlobalStyle';
import { BackBox, CustomBox, RootContainer } from '@/pages/NotFound/components';
import { CssBaseline, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1 || '/');
  };

  return (
    <RootContainer>
      <CssBaseline />
      <GlobalStyle />
      <CustomBox>
        <Typography variant="h4">
          Page Not Found
          <BackBox onClick={handleClick}>Back</BackBox>
        </Typography>
      </CustomBox>
    </RootContainer>
  );
};

export default NotFound;
