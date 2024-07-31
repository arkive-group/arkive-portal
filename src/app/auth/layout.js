import PropTypes from 'prop-types'
// auth

// components
import AuthLayout from '@/auth/views/auth-layout'

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  return <AuthLayout>{children}</AuthLayout>
}

Layout.propTypes = {
  children: PropTypes.node,
}
