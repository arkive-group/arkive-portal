'use client'

import merge from 'lodash/merge'
import { enUS as enUSAdapter } from 'date-fns/locale'
// core
import { enUS as enUSCore } from '@mui/material/locale'
// date-pickers
import { enUS as enUSDate } from '@mui/x-date-pickers/locales'
// data-grid
import { enUS as enUSDataGrid } from '@mui/x-data-grid'

// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDate, enUSDataGrid, enUSCore),
    adapterLocale: enUSAdapter,
    icon: 'flagpack:gb-nir',
  },
]

export const defaultLang = allLangs[0] // English
