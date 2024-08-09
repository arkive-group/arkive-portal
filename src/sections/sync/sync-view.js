'use client'

// @mui
import { Box, Container, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import UserProfileView from '@/sections/user/user-profile-view'
import { UploadBox } from '@/components/upload'
import { useCallback, useState } from 'react'
import Iconify from '@/components/iconify'
import ProductUnavailable from '../error/product-unavailable'

// ----------------------------------------------------------------------

export default function SyncView() {
  const uploadOptions = [
    {
      value: 'ftp',
      label: 'FTP Connectors',
    },
    {
      value: 'one-by-one',
      label: 'One by One Upload Tool',
    },
    {
      value: 'api',
      label: 'Api Connection',
    },
  ]
  const [files, setFiles] = useState([])

  const handleDrop = useCallback(
    acceptedFiles => {
      const newFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      )

      setFiles([...files, ...newFiles])
    },
    [files],
  )
  return (
    <Container maxWidth="xl">
      <UserProfileView />
      <ProductUnavailable />
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
    </Container>
  )
}
