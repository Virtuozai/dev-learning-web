import React, { FC } from 'react'

import { Typography, Grid, Paper, Avatar, Container, Divider } from '@material-ui/core'

import { User, UserRole } from 'types/models/user'
import { useStyles } from './styles'

const Profile: FC = () => {
  const classes = useStyles()

  const user: User = {
    name: 'jeff',
    lastname: 'jefferson',
    email: 'yo@gmail.com',
    teamName: 'genericTeam',
    role: UserRole.junior,
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
        <Avatar alt="alt" className={classes.large} />
      </Grid>
    )
  }

  function renderBasicInfo() {
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

    return (
      <>
        {renderSectionTitle('First Name')}
        {renderSectionBody(user.name)}
        {renderSectionTitle('Last Name')}
        {renderSectionBody(user.lastname)}
        {renderSectionTitle('Email')}
        {renderSectionBody(user.email)}
        {renderSectionTitle('Role')}
        {renderSectionBody(user.role)}
        {renderSectionTitle('Team Name')}
        {renderSectionBody(user.teamName)}
      </>
    )
  }

  return (
    <Container maxWidth="sm">
      <Paper>
        <Grid container alignItems="center">
          <Grid item className={classes.title} xs={12}>
            {renderUserAvatar()}
            {renderTitle()}
          </Grid>
          <Grid item className={classes.basicInfoPaper} xs={12}>
            {renderBasicInfo()}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
export default Profile
