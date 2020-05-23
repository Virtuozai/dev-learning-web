import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  memberItem: {
    margin: theme.spacing(2),
  },
  alignRight: {
    marginLeft: 'auto',
  },
  day: {
    height: 300,
    width: 250,
    backgroundColor: theme.palette.grey[100],
  },
}))
