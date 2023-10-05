import { Box } from '@mui/material';
import styled from 'styled-components';

export const RootContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  max-height: 100%;
  background: ${({ theme }) => theme.palette.primary.light};
`;

export const CustomBox = styled(Box)`
  margin: auto;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const BackBox = styled(Box)`
  text-decoration: underline;
  cursor: pointer;
`;
