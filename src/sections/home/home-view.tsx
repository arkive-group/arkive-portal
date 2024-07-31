// @mui
import { Container } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import UserProfileView from '@/sections/user/user-profile-view'

// ----------------------------------------------------------------------

export default function HomeView() {
  return (
    <Container maxWidth="xl">
      <UserProfileView />
      <Grid container spacing={3}></Grid>
    </Container>
  )
}
