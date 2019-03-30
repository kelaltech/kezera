import { createMuiTheme } from '@material-ui/core'

export const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#3f51b5'
    },
    secondary: {
      main: '#ff5722'
    }
  }
})
