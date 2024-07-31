'use client';

import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import Box from '@mui/material/Box';

type IconifyProps = {
  icon: string;
  width?: number | string;
  sx?: object;
};

// ----------------------------------------------------------------------

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }: IconifyProps, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

export default Iconify;
