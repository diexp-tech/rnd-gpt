import GlobalStyle from '@/components/GlobalStyle';
import { Box, CssBaseline } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

export const RootContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  height: calc(100vh - 10px);
  transition: ${({ theme }) =>
          theme.transitions.create('padding-left', {
            duration: theme.transitions.duration.short,
          })};
`;

interface IAuthLayout {
  children: React.ReactElement;
}

const RootLayout: FC<IAuthLayout> = ({ children }: IAuthLayout) => {
  return (
    <>
      <CssBaseline />
      <GlobalStyle />
      <RootContainer>
        {children}
      </RootContainer>
    </>
  );
};

export default RootLayout;
