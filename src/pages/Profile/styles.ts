import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
  title: {
    margin: theme.spacing(3, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
  },
  infoRow: {
    margin: theme.spacing(2, 3),
    display: 'inline-block',
  },

  info: {
    margin: theme.spacing(2, 5),
  },

  avatar: {
    width: 300,
  },
}))
