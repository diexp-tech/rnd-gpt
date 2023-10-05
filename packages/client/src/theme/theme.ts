import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import {
  MuiButton,
  MuiButtonBase,
} from 'src/theme/components';

import { breakpoints, palette, shape, typography } from 'src/theme/custom';

const theme = createTheme({
  ...breakpoints,
  ...shape,
  ...typography,
  ...palette,
});

const customTheme = createTheme(theme, {
  components: {
    MuiButton,
    MuiButtonBase,
  },
});

export { theme };

const responsiveTheme = responsiveFontSizes(customTheme);

export default responsiveTheme;
