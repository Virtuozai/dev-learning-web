import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  title: {
    margin: theme.spacing(3, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'Center',
  },
  large: {
    margin: theme.spacing(3, 3),
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  basicInfoPaper: {
    height: '70vh',
    margin: theme.spacing(2, 5),
    alignItems: 'Center',
    display: 'block',
  },
  dividerGap: {
    margin: theme.spacing(1, 0),
  },
}))
