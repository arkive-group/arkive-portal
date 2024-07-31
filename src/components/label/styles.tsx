// @mui
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

type StyledLabelProps = {
  theme: any;
  color?: string;
  variant?: string;
};

export const StyledLabel = styled(Box)<StyledLabelProps>(({ theme, color, variant }) => {
  const isLight = theme.palette.mode === 'light';

  const filledVariant = variant === 'filled';

  const outlinedVariant = variant === 'outlined';

  const softVariant = variant === 'soft';

  const defaultStyle = {
    ...(color === 'default' && {
      // FILLED
      ...(filledVariant && {
        color: isLight ? theme.palette.common.white : theme.palette.grey[800],
        backgroundColor: theme.palette.text.primary,
      }),
      // OUTLINED
      ...(outlinedVariant && {
        backgroundColor: 'transparent',
        color: theme.palette.text.primary,
        border: `2px solid ${theme.palette.text.primary}`,
      }),
      // SOFT
      ...(softVariant && {
        color: theme.palette.text.secondary,
        backgroundColor: alpha(theme.palette.grey[500], 0.16),
      }),
    }),
  };

  const colorStyle = {
    ...(color !== 'default' && {
      // FILLED
      ...(filledVariant && {
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
      }),
      // OUTLINED
      ...(outlinedVariant && {
        backgroundColor: 'transparent',
        color: theme.palette[color].main,
        border: `2px solid ${theme.palette[color].main}`,
      }),
      // SOFT
      ...(softVariant && {
        color: theme.palette[color][isLight ? 'dark' : 'light'],
        backgroundColor: alpha(theme.palette[color].main, 0.16),
      }),
    }),
  };

  return {
    height: 24,
    minWidth: 24,
    lineHeight: 0,
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    textTransform: 'capitalize',
    padding: theme.spacing(0, 0.75),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shorter,
    }),
    ...defaultStyle,
    ...colorStyle,
  };
});
