'use client'

import { Box, Button, Card, Stack, Typography } from '@mui/material'
import { ARKIVE_STORE } from '@/config-global'
import { useCountdownDate } from 'src/hooks/use-countdown'
import WelcomeEmail from '@/components/emails/welcome-email'

export default function ProductUnavailable() {
  const { days, hours, minutes, seconds } = useCountdownDate(
    new Date('2024-10-01'),
  )

  return (
    <Card sx={{ p: 3 }}>
      {/* <button
        onClick={async () => {
          await fetch('/api/email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: 'Jerome', email: 'jerome@arkive.nl' }),
          })
        }}
      >
        test email
      </button> */}
      <Stack
        sx={{
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '70%',
          mx: 'auto',
        }}
      >
        <Typography variant="h4" sx={{ mb: 1 }}>
          Coming Soon!
        </Typography>

        <Typography sx={{ color: 'text.secondary', mb: 2 }}>
          We're working hard to create the best experience for you. In the
          meantime, explore our shop and rescue beauty from others. Other men's
          trash is your beauty treasure.
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
          Visit Arkive Store
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
