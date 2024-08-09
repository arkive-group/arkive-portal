// @mui
import { Container } from '@mui/material'
import UserProfileView from '@/sections/user/user-profile-view'

import ProductUnavailable from '../error/product-unavailable'

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <Container maxWidth="xl">
      <UserProfileView />
      <ProductUnavailable />
    </Container>
  )
}
