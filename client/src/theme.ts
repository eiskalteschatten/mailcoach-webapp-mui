import { blue, red, blueGrey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: blue[800]
    },
    secondary: {
      main: blueGrey[100]
    },
    error: {
      main: red[900],
      light: red[600]
    }
  }
});

export default theme;
