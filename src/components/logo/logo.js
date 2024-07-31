import PropTypes from 'prop-types'
import { forwardRef } from 'react'
// @mui
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
// routes
import { RouterLink } from 'src/routes/components'
import Image from '../image/image'

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 100,
        height: 30,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <Image
        src="/assets/images/temporary-logo.png"
        alt="logo"
        sx={{ width: '100%', height: '100%' }}
      />
      {/* svg here */}
    </Box>
  )

  if (disabledLink) {
    return logo
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  )
})

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
}

export default Logo
