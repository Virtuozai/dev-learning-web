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

import { useParams, Link } from 'react-router-dom'

import { getUserSubjects } from 'data/api/subjects'
import { getUser } from 'data/api/users'
import { getTeamById } from 'data/api/teams'

import { Subject, UserSubject as UserSubjectType } from 'types/models/subject'
import { USER_SUBJECT } from 'constants/routes'
import { User as UserType, UserRole } from 'types/models/user'
import { Team } from 'types/models/team'

import { UserContext } from 'App'

import { useStyles } from './styles'

const Profile: FC = () => {
  const { id } = useParams()
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [userSubjects, setUserSubjects] = useState<Array<UserSubjectType> | null>(null)
  const [isCurrentUser, setIsCurrentUser] = useState<boolean>(!id)
  const currentUser = useContext(UserContext)
  const [user, setUser] = useState<UserType | null>(null)
  const [team, setTeam] = useState<Team | null>(null)

  const fetchUser = useCallback(async () => {
    if (!id) {
      setUser(currentUser)
      return
    }
    const idInt = parseInt(id, 10)
    const fetchUserById = await getUser(idInt)
    setIsCurrentUser(false)

    if (!fetchUserById) return
    setUser(fetchUserById)
  }, [id, currentUser])

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

  useEffect(() => {
    async function fetchTeam() {
      if (!user?.teamId) return
      const fetchedTeam = await getTeamById(user.teamId)

      if (!fetchedTeam) return

      setTeam(fetchedTeam)
    }

    fetchTeam()
  }, [user])

  function renderTitle() {
    const userProfile = `${user?.firstName} ${user?.lastName} Profile`
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

  function getUserRoleString(role: number) {
    switch (role) {
      case UserRole.Mid:
        return 'Mid'
      case UserRole.Senior:
        return 'Senior'
      case UserRole.TeamLead:
        return 'TeamLead'
      case UserRole.God:
        return 'God'
      default:
        return 'Junior'
    }
  }

  function renderBasicInfo() {
    if (!user) return null

    return (
      <>
        {renderSectionTitle('First Name')}
        {renderSectionBody(user.firstName)}
        {renderSectionTitle('Last Name')}
        {renderSectionBody(user.lastName)}
        {renderSectionTitle('Email')}
        {renderSectionBody(user.email)}
        {renderSectionTitle('Role')}
        {renderSectionBody(getUserRoleString(user.role))}
        {renderSectionTitle('Team Name')}
        {renderSectionBody(team?.name || 'User has no team')}
        {renderEditButton()}
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

  function renderChip(subject: Subject, isLearned: boolean, userSubjectId: number) {
    return (
      <Link to={USER_SUBJECT.replace(':id', userSubjectId.toString())}>
        <Chip
          color={isLearned ? 'primary' : 'secondary'}
          label={subject.title}
          className={classes.subject}
        />
      </Link>
    )
  }

  function renderSubjectList() {
    if (!userSubjects) return null

    return (
      <GridList cellHeight={45} cols={1} className={classes.gridList}>
        {userSubjects.map(({ id: userSubjectId, subject, isLearned }) => (
          <GridListTile key={userSubjectId}>
            {renderChip(subject, isLearned, userSubjectId)}
          </GridListTile>
        ))}
      </GridList>
    )
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
