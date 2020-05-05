import React, { FC } from 'react'
import { Typography, Grid, Paper, TextField } from '@material-ui/core'

import BackgroundImage from 'assets/images/background.jpg'
import { useStyles } from './styles'

type Props = {
  userName: string
  userLastname: string
  email: string
  teamName: string
  developerRole: string
}

const Profile: FC<Props> = ({ userName, userLastname, email, teamName, developerRole }: Props) => {
  const classes = useStyles()

  function renderTitle() {
    const titleText = 'My Profile'
    return (
      <Typography component="h1" variant="h5">
        {titleText}
      </Typography>
    )
  }
  function renderBasicInfo() {
    return (
      <Grid container>
        <Grid item className={classes.infoRow} xs={12} component={Paper} elevation={0}>
          <Typography component="h3">First Name</Typography>
          <TextField disabled size="small" label={userName} variant="outlined" />
        </Grid>
        <Grid item className={classes.infoRow} xs={12} component={Paper} elevation={0}>
          <Typography component="h3">Last Name</Typography>
          <TextField disabled size="small" label={userLastname} variant="outlined" />
        </Grid>
        <Grid item className={classes.infoRow} xs={12} component={Paper} elevation={0}>
          <Typography component="h3">Email</Typography>
          <TextField disabled size="small" label={email} variant="outlined" />
        </Grid>
        <Grid item className={classes.infoRow} xs={12} component={Paper} elevation={0}>
          <Typography component="h3">Role</Typography>
          <TextField disabled size="small" label={developerRole} variant="outlined" />
        </Grid>
        <Grid item className={classes.infoRow} xs={12} component={Paper} elevation={0}>
          <Typography component="h3">Team Name</Typography>
          <TextField disabled size="small" label={teamName} variant="outlined" />
        </Grid>
      </Grid>
    )
  }

  function renderUserAvatar() {
    return <img src={BackgroundImage} width="300" alt="logo" />
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <div className={classes.title}>{renderTitle()}</div>
      </Grid>
      <Grid item xs={12} sm={12} md={3} lg={3} className={classes.info}>
        <div className={classes.avatar}>{renderUserAvatar()}</div>
      </Grid>
      <Grid item xs={12} sm={12} md={7} lg={7} className={classes.info} component={Paper}>
        <div>{renderBasicInfo()}</div>
      </Grid>
    </Grid>
  )
}
export default Profile
