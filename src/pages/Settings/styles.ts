import { makeStyles } from '@material-ui/core/styles'

import BackgroundImage from 'assets/images/background.jpg'

export const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${BackgroundImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  dark: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    margin: theme.spacing(3, 3, 30),
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
  title: {
    margin: theme.spacing(3, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'Center',
  },
  medium: {
    margin: theme.spacing(3, 3),
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  paper: {
    margin: theme.spacing(10, 0),
  },
  basicPaper: {
    height: '70vh',
    margin: theme.spacing(2, 5),
    alignItems: 'Center',
    display: 'block',
  },
}))
