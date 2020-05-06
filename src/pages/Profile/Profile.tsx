import React, { FC } from 'react'
import { Typography, Grid, Paper, TextField, Avatar, Link, Tabs, Tab } from '@material-ui/core'

import BackgroundImage from 'assets/images/background.jpg'

import { User, UserRole } from 'types/models/user'
import { useStyles } from './styles'

const Profile: FC = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const user: User = {
    name: 'jeff',
    lastname: 'jefferson',
    email: 'yo@gmail.com',
    teamName: 'genericTeam',
    developerRole: UserRole.junior,
  }

  function renderTitle() {
    const titleText = 'My Profile'
    return (
      <Typography component="h1" variant="h5">
        {titleText}
      </Typography>
    )
  }

  function renderUserAvatar() {
    return (
      <Grid item xs={12} sm={12} md={4} lg={4}>
        <Avatar alt="alt" src={BackgroundImage} className={classes.large} />
        <Link className={classes.avatarAlign} href="#">
          Customize Avatar
        </Link>
      </Grid>
    )
  }

  function renderBasicInfo() {
    return (
      <Grid container>
        <Grid className={classes.nameAvatar}>
          {renderUserAvatar()}

          <Grid item className={classes.nameRow} xs={12} sm={12} md={4} lg={4}>
            <Typography component="h3">First Name</Typography>
            <TextField disabled size="small" label={user.name} variant="outlined" />
            <Typography component="h3">Last Name</Typography>
            <TextField disabled size="small" label={user.lastname} variant="outlined" />
            <Typography component="h3">Email</Typography>
            <TextField disabled size="small" label={user.email} variant="outlined" />
          </Grid>
          <Grid item className={classes.nameRow} xs={12} sm={12} md={4} lg={4}>
            <Typography component="h3">Role</Typography>
            <TextField disabled size="small" label={user.developerRole} variant="outlined" />
            <Typography component="h3">Team Name</Typography>
            <TextField disabled size="small" label={user.teamName} variant="outlined" />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  function renderTabs() {
    return (
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => setValue(newValue)}
        >
          <Tab label="Basic Info" />
          <Tab label="Learned Subjects" />
          <Tab label="Learning In Progress" />
        </Tabs>
      </Paper>
    )
  }

  function renderInsideTab() {
    if (value === 0) return renderBasicInfo()
    // if (value === 1) return renderLearnedSubjets()
    return <div>emty</div>
  }

  return (
    <Grid className={classes.root} container>
      <Grid className={classes.title} item xs={12}>
        {renderTitle()}
      </Grid>
      <Grid className={classes.basicInfoPaper} item xs={12} component={Paper}>
        {renderTabs()}
        {renderInsideTab()}
      </Grid>
    </Grid>
  )
}
export default Profile
