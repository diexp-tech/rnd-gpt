import { ThemeOptions } from '@mui/material/styles';

export const palette: ThemeOptions = {
  palette: {
    background: {
      default: '#F6F8F9', // secondary.light: '#F6F8F9'
    },

    primary: {
      main: '#0071EC',
      dark: '#0057AD',
      light: '#3097D1',
    },

    secondary: {
      main: '#d8d8d8',
      dark: '#9B9B9B',
      light: '#F6F8F9', // background.default: '#F6F8F9'
    },

    success: {
      main: '#4DAC4A',
      dark: '#3D883B',
      light: '#CAE6C9',
    },

    warning: {
      main: '#FF632E',
      dark: '#E04D1B',
      light: '#FFDBCF',
    },

    error: {
      main: '#F44343',
      dark: '#CB2323',
      light: '#FCC7C7',
    },

    grayShades: {
      white: '#FFFFFF',
      day: '#F0F6FF',
      light: '#EDEDED',
      creamy: '#DBDBDB',
      main: '#9B9B9B',
      dark: '#595959',
      black: '#1A1D1A',
    },

    borderField: {
      main: '#EDEDED', // grayShades.light: '#EDEDED'
      dark: '#DBDBDB', // grayShades.creamy: '#DBDBDB'
      light: '#CDD5F3',
    },

    eventsColors: {
      holiday: '#A296E2',
      vacation: '#7CBD2A',
      unpaid: '#52BE7E',
      workingWeekend: '#FDA455',
      birthday: '#47C1D7',
      anniversary: '#CA8FDE',
      unapproved: '#9AAAB5',
    },

    eventsBackground: {
      holiday: '#E1DEFF',
      vacation: '#D7F4BF',
      unpaid: '#D0EAE8',
      workingWeekend: '#FBEDD6',
      birthday: '#E0F6FA',
      anniversary: '#F5D8FF',
      unapproved: '#E5E8EB',
    },
  },
};
