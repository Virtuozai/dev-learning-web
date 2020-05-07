import React, { FC } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Switch,
  FormGroup,
  FormControlLabel,
  Button,
} from '@material-ui/core'

import { useStyles } from './styles'

const Settings: FC = () => {
  const classes = useStyles()

  const [checked, setChecked] = React.useState(false)

  const toggleChecked = () => {
    setChecked(prev => !prev)
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Card className={classes.root}>
        <CardContent>
          <Typography component="h3" variant="h3" align="center">
            Settings
          </Typography>
          <Typography>
            <FormGroup>
              <Grid
                container
                direction="column"
                justify="space-around"
                alignItems="center"
                spacing={1}
              >
                <FormControlLabel
                  control={<Switch checked={checked} onChange={toggleChecked} />}
                  label="Get notifications"
                />
                <Button variant="contained">Change Password</Button>
              </Grid>
            </FormGroup>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
export default Settings
