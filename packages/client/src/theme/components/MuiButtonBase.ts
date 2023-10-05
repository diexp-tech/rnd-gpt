export const MuiButtonBase = {
  defaultProps: {
    disableRipple: true,
  },

  styleOverrides: {
    root: {
      '&.MuiCheckbox-root': {
        '&:hover': {
          backgroundColor: 'transparent',
        },
      },
    },
  },
};
