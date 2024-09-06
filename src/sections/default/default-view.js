// @mui
import { Container } from '@mui/material'

import UserProfileView from '@/sections/user/user-profile-view'
import ProductUnavailable from '../error/product-unavailable'

// ----------------------------------------------------------------------

export default function DefaultView() {
  return (
    <Container maxWidth="xl">
      <UserProfileView />
      <ProductUnavailable />
    </Container>
  )
}
