import '@aws-amplify/ui/dist/style.css'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import AppBar from 'components/AppBar'
import { UserContext } from 'components/Auth/UserContext'
import Footer from 'components/Footer'
import useAmplifyAuth from 'hooks/useAmplifyAuth'
import theme from 'mui/theme'
import Head from 'next/head'
import PropTypes from 'prop-types'
import * as React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'store'
import 'aws/configure'

const store = createStore()

const MyApp = ({ Component, pageProps }) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const {
    state: { user, isLoading, isMember, errorMessage },
    handleSignOut,
    handleClearError
  } = useAmplifyAuth()

  const value = React.useMemo(() => (
    { user, isLoading, isMember, errorMessage, handleSignOut, handleClearError }
  ), [user, isLoading, isMember, errorMessage, handleSignOut, handleClearError])

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Command Tactical Training is a management training corporation specifically designed to improve emergency services throughout the nation by providing ongoing, realistic, verifiable training. &nbsp;This training provides each user with the opportunity to experience the stress and gain the skills necessary to handle any emergency. &nbsp;The products have been developed by some of the top leaders […]" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserContext.Provider value={value}>
            <AppBar />
              <Box my={4}>
                <Container maxWidth='md' component='main'>
                  <Component {...pageProps} />
                </Container>
              </Box>
            <Footer />
          </UserContext.Provider>
        </ThemeProvider>
      </Provider>
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default MyApp
