import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  betweenBlocks: {
    marginBottom: theme.spacing(2),
  },
  betweenSubjects: {
    margin: theme.spacing(1),
  },
  right: {
    marginRight: theme.spacing(3),
  },
  top: {
    marginTop: theme.spacing(2),
  },
  between: {
    margin: theme.spacing(2),
  },
  vertical: {
    margin: theme.spacing(2, 0),
  },
  scrollable: {
    maxHeight: 200,
    overflow: 'auto',
  },
}))
