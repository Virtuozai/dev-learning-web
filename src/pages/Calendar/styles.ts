import { makeStyles } from '@material-ui/core/styles'

import { getItem } from 'libs/utils/localStorageManager'

const isDarkMode = getItem('dark') === 'enabled'

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
    backgroundColor: isDarkMode ? theme.palette.primary.light : theme.palette.grey[100],
  },
}))
