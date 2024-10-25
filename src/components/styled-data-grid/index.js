import { DataGrid } from '@mui/x-data-grid';
import { darken, lighten, styled } from '@mui/material/styles';

const getBackgroundColor = (color, theme, coefficient) => ({
  backgroundColor: darken(color, coefficient),
  ...theme.applyStyles('light', {
    backgroundColor: lighten(color, coefficient),
  }),
});

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .super-app-theme--blue': {
      ...getBackgroundColor(theme.palette.info.main, theme, 0.7),
      '&:hover': {
        ...getBackgroundColor(theme.palette.info.main, theme, 0.6),
      },
      '&.Mui-selected': {
        ...getBackgroundColor(theme.palette.info.main, theme, 0.5),
        '&:hover': {
          ...getBackgroundColor(theme.palette.info.main, theme, 0.4),
        },
      },
    },
    '& .super-app-theme--green': {
      ...getBackgroundColor(theme.palette.success.main, theme, 0.7),
      '&:hover': {
        ...getBackgroundColor(theme.palette.success.main, theme, 0.6),
      },
      '&.Mui-selected': {
        ...getBackgroundColor(theme.palette.success.main, theme, 0.5),
        '&:hover': {
          ...getBackgroundColor(theme.palette.success.main, theme, 0.4),
        },
      },
    },
    '& .super-app-theme--yellow': {
      ...getBackgroundColor(theme.palette.warning.main, theme, 0.7),
      '&:hover': {
        ...getBackgroundColor(theme.palette.warning.main, theme, 0.6),
      },
      '&.Mui-selected': {
        ...getBackgroundColor(theme.palette.warning.main, theme, 0.5),
        '&:hover': {
          ...getBackgroundColor(theme.palette.warning.main, theme, 0.4),
        },
      },
    },
    '& .super-app-theme--red': {
      ...getBackgroundColor(theme.palette.error.main, theme, 0.7),
      '&:hover': {
        ...getBackgroundColor(theme.palette.error.main, theme, 0.6),
      },
      '&.Mui-selected': {
        ...getBackgroundColor(theme.palette.error.main, theme, 0.5),
        '&:hover': {
          ...getBackgroundColor(theme.palette.error.main, theme, 0.4),
        },
      },
    },
  }));

