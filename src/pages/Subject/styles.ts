import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  betweenBlocks: {
    marginBottom: theme.spacing(2),
  },
  top: {
    marginTop: theme.spacing(2),
  },
  between: {
    margin: theme.spacing(2),
  },
  horizontal: {
    margin: theme.spacing(0, 2),
  },
}))
