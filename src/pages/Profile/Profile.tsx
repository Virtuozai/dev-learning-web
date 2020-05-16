import React, { FC } from 'react'

import {
  Tab,
  Typography,
  Grid,
  Paper,
  Avatar,
  Container,
  Divider,
  Hidden,
  Tabs,
} from '@material-ui/core'

import { User, UserRole } from 'types/models/user'
import { useStyles } from './styles'

const Profile: FC = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const user: User = {
    id: 1,
    firstName: 'jeff',
    lastName: 'jefferson',
    email: 'yo@gmail.com',
    team: { id: 1, name: 'genericTeam' },
    role: UserRole.Junior,
  }

  function renderTitle() {
    const titleText = 'My Profile'

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

  function renderSectionTitle(title: string) {
    return (
      <>
        <Typography variant="h5">{title}</Typography>
        <Divider className={classes.dividerGap} variant="middle" />
      </>
    )
  }

  function renderSectionBody(body: string) {
    return (
      <Typography align="right" variant="body1">
        {body}
      </Typography>
    )
  }

  function renderBasicInfo() {
    return (
      <>
        {renderSectionTitle('First Name')}
        {renderSectionBody(user.firstName)}
        {renderSectionTitle('Last Name')}
        {renderSectionBody(user.lastName)}
        {renderSectionTitle('Email')}
        {renderSectionBody(user.email)}
        {renderSectionTitle('Role')}
        {renderSectionBody(user.role)}
        {renderSectionTitle('Team Name')}
        {renderSectionBody(user.team.name)}
      </>
    )
  }

  function renderTabs() {
    return (
      <Paper>
        <Tabs
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Info" />
          <Tab label="Subjects" />
        </Tabs>
      </Paper>
    )
  }

  function renderInsideTab() {
    if (value === 0) return renderBasicInfo()
    // if (value === 1) return renderLearnedSubjets()
    return <div>emty</div>
  }

  function renderInfo() {
    return (
      <Container maxWidth="sm">
        <Paper className={classes.paper}>
          <Grid container alignItems="center">
            <Grid item className={classes.title} xs={12}>
              <Hidden mdUp>{renderUserAvatarMedium()}</Hidden>
              {renderTitle()}
              {renderTabs()}
            </Grid>
            <Grid item className={classes.basicPaper} xs={12}>
              {renderInsideTab()}
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
export default Profile
