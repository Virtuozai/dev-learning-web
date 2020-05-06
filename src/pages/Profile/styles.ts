import { makeStyles } from '@material-ui/core/styles'
import { CenterFocusStrong } from '@material-ui/icons'

export const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
  },
  avatarAlign: {
    margin: theme.spacing(0, 3.5),
  },

  title: {
    margin: theme.spacing(3, 3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'Center',
  },
  infoRow: {
    margin: theme.spacing(0, 32.5),
    display: 'inline-block',
  },
  nameRow: {
    margin: theme.spacing(3, 4, 0),
  },

  large: {
    margin: theme.spacing(3, 3),
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  nameAvatar: {
    margin: theme.spacing(3, 3, 0),
    display: 'inline-flex',
  },
  basicInfoPaper: {
    height: '70vh',
    margin: theme.spacing(2, 5),
    alignItems: 'Center',
  },
  tab: {
    flexGrow: 1,
  },
}))
