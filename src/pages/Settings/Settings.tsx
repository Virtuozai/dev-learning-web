import React, { FC, useState, Fragment } from 'react'
import {
  Container,
  Typography,
  Grid,
  Paper,
  Hidden,
  Avatar,
  TextField,
  Button,
} from '@material-ui/core'
// import { spacing } from '@material-ui/system'

import { useStyles } from './styles'

const Settings: FC = () => {
  const classes = useStyles()

  function renderTitle() {
    const titleText = 'Settings'

    return (
      <Typography component="h1" variant="h5">
        {titleText}
      </Typography>
    )
  }

  function renderUserAvatarLarge() {
    return <Avatar alt="alt" className={classes.large} />
  }
  function renderUserAvatarMedium() {
    return <Avatar alt="alt" className={classes.medium} />
  }

  function renderSectionItem(sectionTitle: string, sectionData: string) {
    return (
      <TextField
        id="standard-full-width"
        fullWidth
        margin="normal"
        label={sectionTitle}
        defaultValue={sectionData}
      />
    )
  }

  function renderSectionItemPasw(sectionTitle: string, sectionData: string) {
    return (
      <TextField
        fullWidth
        margin="normal"
        type="password"
        id="password"
        label={sectionTitle}
        defaultValue={sectionData}
      />
    )
  }

  function renderButton(buttonText: string) {
    return (
      <Button variant="contained" color="primary">
        {buttonText}
      </Button>
    )
  }

  function renderInfo() {
    return (
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <Grid container alignItems="center">
            <Grid item className={classes.title} xs={12}>
              <Hidden mdUp>{renderUserAvatarMedium()}</Hidden>
              {renderTitle()}
            </Grid>
            <Grid item className={classes.basicPaper} xs={12}>
              {renderSectionItem('Change Name', 'gitis')}
              {renderSectionItem('Change Last Name', 'grigitis')}
              {renderSectionItem('Change Email', 'gitis@grimailas.coma')}
              {renderSectionItemPasw('Change Password', 'hujnia')}
              <Grid container direction="row" justify="space-around" alignItems="center">
                {renderButton('Save')}
                {renderButton('Cancel')}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    )
  }

  return (
    <Container>
      <Grid container className={classes.root}>
        <Grid item xs={false} sm={false} md={7} lg={7} className={classes.image}>
          <div className={classes.dark}>
            <Hidden smDown>{renderUserAvatarLarge()}</Hidden>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} component={Paper} elevation={6} square>
          {renderInfo()}
        </Grid>
      </Grid>
    </Container>
  )
}
export default Settings
