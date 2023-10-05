import { Theme } from '@mui/material';
import { ThemeProps } from 'styled-components';

export type GlobalStyleProps = {
  theme: ThemeProps<Theme> & { palette: any };
};
