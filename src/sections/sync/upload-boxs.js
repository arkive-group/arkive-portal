'use client'

// import { useAuthContext } from '@/auth/hooks'
import { Card, Grid, Stack, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { UploadBox } from '@/components/upload'
import Iconify from '@/components/iconify'

export default function UploadBoxs() {
  const uploadOptions = [
    {
      value: 'one-by-one',
      label: 'One by One Upload Tool',
    },
    {
      value: 'ftp',
      label: 'FTP Connectors',
    },
  ]
  const [files, setFiles] = useState([])

  const handleDrop = useCallback(
    async acceptedFiles => {
      const newFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      )

      const res = await fetch('/api/files', {
        method: 'POST',
        body: JSON.stringify(newFiles[0]),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const success = await res.json()

      setFiles([...files, ...newFiles])
    },

    [files],
  )

  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        {uploadOptions.map(option => (
          <Grid xs={12} md={6} lg={4} key={option.value}>
            <UploadBox
              onDrop={handleDrop}
              placeholder={
                <Stack
                  spacing={0.5}
                  alignItems="center"
                  sx={{ color: 'text.disabled' }}
                >
                  <Iconify icon="eva:cloud-upload-fill" width={40} />
                  <Typography variant="body2">{option.label}</Typography>
                </Stack>
              }
              sx={{
                mb: 3,
                py: 2.5,
                width: 'auto',
                height: 'auto',
                borderRadius: 1.5,
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  )
}
