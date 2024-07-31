// scrollbar
import 'simplebar-react/dist/simplebar.min.css'

// lightbox
import 'yet-another-react-lightbox/styles.css'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/plugins/thumbnails.css'

// map
import 'mapbox-gl/dist/mapbox-gl.css'

// editor
import 'react-quill/dist/quill.snow.css'

// carousel
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// image
import 'react-lazy-load-image-component/src/effects/blur.css'

// ----------------------------------------------------------------------

import PropTypes from 'prop-types'
// locales
import { LocalizationProvider } from 'src/locales'
// theme
import ThemeProvider from 'src/theme'
import { primaryFont } from 'src/theme/typography'
// components
import ProgressBar from 'src/components/progress-bar'
import { MotionLazy } from 'src/components/animate/motion-lazy'
import SnackbarProvider from 'src/components/snackbar/snackbar-provider'
import { SettingsProvider } from 'src/components/settings'

// Auth
import { AuthConsumer } from '@/auth/auth-consumer'

// ----------------------------------------------------------------------

export const metadata = {
  title: 'F1 Dashboard',
  description:
    'The formula 1 dashboard is a web application that provides information about the formula 1',
  icons: [
    {
      rel: 'icon',
      url: '/logo/f1-logo.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      url: '/logo/f1-logo.png',
    },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <LocalizationProvider>
          <SettingsProvider
            defaultSettings={{
              themeMode: 'light', // 'light' | 'dark'
              themeDirection: 'ltr', //  'rtl' | 'ltr'
              themeContrast: 'default', // 'default' | 'bold'
              themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
              themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
              themeStretch: false,
            }}
          >
            <ThemeProvider>
              <MotionLazy>
                <SnackbarProvider>
                  <ProgressBar />
                  <AuthConsumer>{children}</AuthConsumer>
                </SnackbarProvider>
              </MotionLazy>
            </ThemeProvider>
          </SettingsProvider>
        </LocalizationProvider>
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.node,
}
