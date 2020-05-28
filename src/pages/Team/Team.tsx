import React, { FC, useState, useEffect, useContext, ChangeEvent, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import {
  Typography,
  Grid,
  Container,
  Paper,
  Divider,
  Button,
  InputLabel,
  Dialog,
  FormControl,
  Select,
  MenuItem,
  Avatar,
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'

import { Member } from 'components'
import { User as UserType, UserRole } from 'types/models/user'
import { Team as TeamModel } from 'types/models/team'

import { getUser, getTeamUsers, getUsers, updateUser } from 'data/api/users'
import { getTeamById } from 'data/api/teams'

import { UserContext } from 'App'

import { useStyles } from './styles'

const Team: FC = () => {
  const { id } = useParams()
  const classes = useStyles()

  const currentUser = useContext(UserContext)

  const [users, setUsers] = useState<Array<UserType>>([])
  const [teamUsers, setTeamUsers] = useState<Array<UserType>>([])
  const [currentTeam, setCurrentTeam] = useState<TeamModel | null>(null)
  const [teamLead, setTeamLead] = useState<UserType | null>(null)

  const [isSelectUserModalOpen, setIsSelectUserModalOpen] = useState<boolean>(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const [error, setError] = useState<string | null>(null)

  const isUserTeamLead =
    currentUser?.role === UserRole.TeamLead && currentTeam?.teamLeadId === currentUser.id

  const fetchTeamUsers = useCallback(async () => {
    if (!id) return

    const fetchedTeamUsers = await getTeamUsers(Number(id))

    if (!fetchedTeamUsers) return

    setTeamUsers(fetchedTeamUsers)
  }, [id])

  useEffect(() => {
    fetchTeamUsers()
  }, [fetchTeamUsers])

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsers()

      if (!fetchedUsers) return

      setUsers(fetchedUsers)
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    async function fetchTeamLead() {
      if (!currentTeam?.teamLeadId) return

      const fetchedTeamLead = await getUser(currentTeam.teamLeadId)

      if (!fetchedTeamLead) return

      setTeamLead(fetchedTeamLead)
    }

    fetchTeamLead()
  }, [currentTeam])

  useEffect(() => {
    async function fetchTeam() {
      if (!id) return

      const fetchedTeam = await getTeamById(Number(id))

      if (!fetchedTeam) return

      setCurrentTeam(fetchedTeam)
    }

    fetchTeam()
  }, [id])

  function renderTitle() {
    return (
      <Typography className={classes.after} variant="h3" align="center">
        {currentTeam?.name}
      </Typography>
    )
  }

  function renderText(text: string) {
    return (
      <Typography className={classes.after} variant="h4" align="center">
        {text}
      </Typography>
    )
  }

  function renderUsers() {
    return teamUsers.map(user => {
      if (user.id === teamLead?.id) return null

      return (
        <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
          <Member isTeamShown={false} user={user} />
        </Grid>
      )
    })
  }

  function renderTeamLead() {
    if (!teamLead) return 'No team Lead'

    return (
      <Grid className={classes.teamLead} item xs={12} sm={6} md={4} lg={3}>
        <Member isTeamShown={false} user={teamLead} />
      </Grid>
    )
  }

  function handleUserSelect(
    event: ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>,
  ) {
    const {
      target: { value },
    } = event

    setSelectedUserId(value as number)
  }

  async function addUserToTeam() {
    if (!currentTeam || !id) {
      setError('Please reload the page')

      return
    }

    if (!selectedUserId) {
      setError('User should be selected')

      return
    }

    const updatedUser = users.find(({ id: userId }) => selectedUserId === userId)

    if (!updatedUser) {
      setError('Incorrectly selected user')

      return
    }

    const response = await updateUser({ ...updatedUser, teamId: Number(id), team: currentTeam })

    if (response?.status !== 204) setError('Something went wrong')

    await fetchTeamUsers()

    setIsSelectUserModalOpen(false)
    setError(null)
  }

  function renderAddUserToTeamModal() {
    const title = (
      <Typography className={classes.between} variant="h6" align="center">
        Select user
      </Typography>
    )

    return (
      <Dialog open={isSelectUserModalOpen} onClose={() => setIsSelectUserModalOpen(false)}>
        <Container>
          {title}
          <FormControl variant="outlined" fullWidth className={classes.betweenBlocks}>
            <InputLabel id="parent-select-label">Selected User</InputLabel>
            <Select
              labelId="parent-select-label"
              id="parent-select"
              value={selectedUserId || ''}
              onChange={handleUserSelect}
              MenuProps={{ style: { maxHeight: 400 } }}
            >
              {users.map(({ id: userId, firstName, lastName }) => {
                if (teamUsers.find(({ id: teamUserId }) => teamUserId === userId)) return null

                return (
                  <MenuItem key={userId} value={userId}>
                    <Avatar>
                      {firstName[0]}
                      {lastName[0]}
                    </Avatar>
                    {firstName} {lastName}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <Button
            className={classes.betweenBlocks}
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            fullWidth
            onClick={addUserToTeam}
          >
            Add user to team
          </Button>
        </Container>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
      </Dialog>
    )
  }

  return (
    <>
      <Container>
        <Paper elevation={6}>
          {renderTitle()}
          {isUserTeamLead && (
            <Button
              className={classes.after}
              startIcon={<Add />}
              color="primary"
              variant="contained"
              onClick={() => setIsSelectUserModalOpen(prevState => !prevState)}
            >
              Add new team member
            </Button>
          )}
          <Divider className={classes.after} />
          {renderText('Team Lead')}
          {renderTeamLead()}
          <Divider className={classes.after} />
          {renderText('Members')}
          <Grid container alignItems="center" alignContent="center">
            {renderUsers()}
          </Grid>
        </Paper>
      </Container>
      {renderAddUserToTeamModal()}
    </>
  )
}
export default Team
