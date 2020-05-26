import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  dividerGap: {
    margin: theme.spacing(1, 0),
  },

  info: {
    margin: theme.spacing(3, 0),
    display: 'Flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    margin: theme.spacing(1, 0),
  },
  chip: {
    display: 'flex',
    overflow: 'hidden',
    margin: theme.spacing(3, 0),
  },
  textField: {
    display: 'flex',
  },
}))
