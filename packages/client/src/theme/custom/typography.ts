import { TypographyOptions } from '@mui/material/styles/createTypography';

export const typography: TypographyOptions = {
  fontFamily: ['Open Sans', 'Gotham Pro'].join(','),
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h1: {
    fontSize: '34px',
    fontWeight: 700,
  },
  h2: {
    fontSize: '28px',
    fontWeight: '600',
  },
  h3: {
    fontSize: '22px',
    fontWeight: 500,
  },
  h4: {
    fontSize: '20px',
    fontWeight: 400,
  },
  body1: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
  },
  body2: {
    fontSize: '14px',
    fontWeight: 400,
  },
  button: {
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'none',
  },
  caption: {
    fontSize: '12px',
    fontWeight: 400,
    color: '#8E8E8E',
  },
};
