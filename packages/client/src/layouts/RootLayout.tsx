import GlobalStyle from "@/components/GlobalStyle";
import { AppBar, Box, CssBaseline, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import styled from "styled-components";
import HorizontalLogo from "@/assets/HorisontalLogo.svg";

export const RootContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  height: 100%;
`;

const ContainerAppBar = styled(AppBar)`
  background-color: #E5F2F1;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
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
        </ContainerAppBar>
        {children}
      </RootContainer>
    </>
  );
};

export default RootLayout;
