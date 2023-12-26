import HorizontalLogo from '@/assets/HorisontalLogo.svg';
import GlobalStyle from '@/components/GlobalStyle';
import { EmailOutlined } from '@mui/icons-material';
import { AppBar, Box, CssBaseline, IconButton, Tooltip } from '@mui/material';
import React, { FC } from 'react';
import styled from 'styled-components';

export const RootContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  height: 100%;
`;

const ContainerAppBar = styled(AppBar)`
  background-color: #d8d8d8;
  height: 68px;
  padding: 10px 40px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: row;
`;

const ChildrenContainer = styled(Box)`
  margin-top: 68px;
  display: flex;
  width: 100%;
  flex: 1
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
        <ContainerAppBar>
          <img src={HorizontalLogo} height={48} />
          <Tooltip title={'Contact Us!'}>
            <IconButton sx={{ margin: 'auto 0 auto auto' }} onClick={() => window.open('mailto:yaroslav@diexp.tech')}>
              <EmailOutlined />
            </IconButton>
          </Tooltip>
        </ContainerAppBar>
        <ChildrenContainer>
          {children}
        </ChildrenContainer>
      </RootContainer>
    </>
  );
};

export default RootLayout;
