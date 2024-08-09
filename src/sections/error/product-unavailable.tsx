'use client'

import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { ARKIVE_STORE } from '@/config-global'
import { useCountdownDate } from 'src/hooks/use-countdown'

export default function ProductUnavailable() {
  const { days, hours, minutes, seconds } = useCountdownDate(
    new Date('2024-10-01'),
  )

  return (
    <Card sx={{ p: 3 }}>
      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Product will be available soon !
        </Typography>

        <Typography sx={{ color: 'text.secondary', mb: 2 }}>
          We are currently working hard on creating the best experience for you.
        </Typography>

        <Stack
          direction="row"
          justifyContent="center"
          divider={<Box sx={{ mx: { xs: 1, sm: 2.5 } }}>:</Box>}
          sx={{ typography: 'h3' }}
        >
          <TimeBlock label="Days" value={days} />

          <TimeBlock label="Hours" value={hours} />

          <TimeBlock label="Minutes" value={minutes} />

          <TimeBlock label="Seconds" value={seconds} />
        </Stack>

        <Button
          variant="outlined"
          color="primary"
          href={ARKIVE_STORE}
          sx={{
            mt: 3,
            fontSize: 16,
          }}
        >
          Back To Arkive Store
        </Button>
      </Stack>
    </Card>
  )
}

function TimeBlock({ label, value }) {
  return (
    <div>
      <Box> {value} </Box>
      <Box sx={{ color: 'text.secondary', typography: 'body1' }}>{label}</Box>
    </div>
  )
}
