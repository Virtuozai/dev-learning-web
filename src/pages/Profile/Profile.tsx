import React, { FC, useCallback, useState, useContext, useEffect } from 'react'

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
  Chip,
  GridList,
  GridListTile,
} from '@material-ui/core'

import { useParams } from 'react-router-dom'

import { getUserSubjects } from 'data/api/subjects'
import { getUser } from 'data/api/users'
import { Subject, UserSubject as UserSubjectType } from 'types/models/subject'
import { User as UserType } from 'types/models/user'

import { UserContext } from 'App'

import { useStyles } from './styles'

const Profile: FC = () => {
  const { id } = useParams()
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [userSubjects, setUserSubjects] = useState<Array<UserSubjectType> | null>(null)
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(true)
  const currentUser = useContext(UserContext)
  const [user, setUser] = useState<UserType | null>(currentUser)

  const fetchUser = useCallback(async () => {
    if (!id) return
    const idInt = parseInt(id, 10)
    const fetchUserById = await getUser(idInt)
    setIsCurrentUser(false)

    if (!fetchUserById) return
    setUser(fetchUserById)
  }, [id])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const fetchUserSubjects = useCallback(async () => {
    if (!user?.id) return

    const fetchedUserSubjects = await getUserSubjects(user.id)

    if (!fetchedUserSubjects) return

    setUserSubjects(fetchedUserSubjects)
  }, [user])

  useEffect(() => {
    fetchUserSubjects()
  }, [fetchUserSubjects])

  function renderTitle() {
    const userProfile = user?.firstName + ' ' + user?.lastName + ' Profile'
    return (
      <Typography component="h1" variant="h5">
        {isCurrentUser ? 'My Profile' : userProfile}
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

  function renderEditButton() {
    if (!isCurrentUser) return null

    return <Chip className={classes.editButton} color="primary" label="Edit Info" />
  }

  function renderBasicInfo() {
    if (user !== null)
      return (
        <>
          {renderSectionTitle('First Name')}
          {renderSectionBody(user.firstName)}
          {renderSectionTitle('Last Name')}
          {renderSectionBody(user.lastName)}
          {renderSectionTitle('Email')}
          {renderSectionBody(user.email)}
          {renderSectionTitle('Role')}
          {renderSectionBody(user.role.toString())}
          {renderSectionTitle('Team Name')}
          {renderSectionBody(user.teamId?.toString())}
          {renderEditButton()}
        </>
      )
    return null
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

  function renderChip(subject: Subject, isLearned: boolean) {
    if (isLearned) return <Chip color="primary" label={subject.title} className={classes.subject} />
    return <Chip color="secondary" label={subject.title} className={classes.subject} />
  }

  function renderSubjectList() {
    if (userSubjects !== null)
      return (
        <GridList cellHeight={45} cols={1} className={classes.gridList}>
          {userSubjects.map(({ subject, isLearned }) => (
            <GridListTile key={subject.id}>{renderChip(subject, isLearned)}</GridListTile>
          ))}
        </GridList>
      )
    return null
  }

  function renderInsideTab() {
    if (value === 0) return renderBasicInfo()
    return renderSubjectList()
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
