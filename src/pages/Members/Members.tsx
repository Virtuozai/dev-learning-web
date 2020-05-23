import React, { FC, useState, useEffect, ChangeEvent, useContext } from 'react'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Tabs,
  Tab,
  Button,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  Avatar,
  Select,
  TextField,
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'

import { Member, Team } from 'components'

import { getUsers } from 'data/api/users'
import { getTeams, createTeam } from 'data/api/teams'

import { User, UserRole } from 'types/models/user'
import { Team as TeamModel } from 'types/models/team'

import { UserContext } from 'App'

import { useStyles } from './styles'

const Members: FC = () => {
  const classes = useStyles()

  const currentUser = useContext(UserContext)

  const [users, setUsers] = useState<Array<User>>([])
  const [teams, setTeams] = useState<Array<TeamModel>>([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [newTeamName, setNewTeamName] = useState<string>('')
  const [newTeamDescription, setNewTeamDescription] = useState<string>('')

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsers()

      if (!fetchedUsers) return

      setUsers(fetchedUsers)
    }

    fetchUsers()
  }, [])

  async function fetchTeams() {
    const fetchedTeams = await getTeams()

    if (!fetchedTeams) return

    setTeams(fetchedTeams)
  }

  useEffect(() => {
    fetchTeams()
  }, [])

  function handleChange(_event: React.ChangeEvent<{}>, newValue: number) {
    setActiveTab(newValue)
  }

  function renderTitle() {
    const titleText = 'Members'

    return (
      <Typography variant="h3" align="center">
        {titleText}
      </Typography>
    )
  }

  function renderTabs() {
    return (
      <Tabs value={activeTab} indicatorColor="primary" textColor="primary" onChange={handleChange}>
        <Tab label="Users" />
        <Tab label="Teams" />
      </Tabs>
    )
  }

  function renderUsers() {
    return users.map(user => (
      <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
        <Member user={user} />
      </Grid>
    ))
  }

  function renderTeams() {
    return teams.map(team => (
      <Grid item key={team.id} xs={12} sm={6} md={4} lg={3}>
        <Team team={team} teamLeadEmail={users.find(({ id }) => id === team.teamLeadId)?.email} />
      </Grid>
    ))
  }

  function renderContent() {
    if (activeTab === 0) return renderUsers()

    return renderTeams()
  }

  async function addTeam() {
    if (!newTeamName) {
      setError('Team name is required')

      return
    }

    if (!newTeamDescription) {
      setError('Team description is required')

      return
    }

    if (!selectedUserId) {
      setError('Team lead should be selected')

      return
    }

    const response = await createTeam(newTeamName, newTeamDescription, selectedUserId)

    if (response?.status !== 204) {
      setError('Something went wrong')

      return
    }

    await fetchTeams()
    setIsModalOpen(false)
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

  function handleTeamNameChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setNewTeamName(value)
  }

  function handleTeamDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setNewTeamDescription(value)
  }

  function renderModal() {
    return (
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Container>
          <TextField
            className={classes.vertical}
            variant="outlined"
            label="Team name"
            multiline
            fullWidth
            value={newTeamName}
            onChange={handleTeamNameChange}
          />
          <TextField
            className={classes.betweenBlocks}
            variant="outlined"
            label="Description"
            multiline
            fullWidth
            value={newTeamDescription}
            onChange={handleTeamDescriptionChange}
          />
          <FormControl variant="outlined" fullWidth className={classes.betweenBlocks}>
            <InputLabel id="parent-select-label">Selected Team Lead</InputLabel>
            <Select
              labelId="parent-select-label"
              id="parent-select"
              value={selectedUserId || ''}
              onChange={handleUserSelect}
              MenuProps={{ style: { maxHeight: 400 } }}
            >
              {users.map(({ id: userId, firstName, lastName }) => (
                <MenuItem key={userId} value={userId}>
                  <Avatar>
                    {firstName[0]}
                    {lastName[0]}
                  </Avatar>
                  {firstName} {lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            className={classes.betweenBlocks}
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            fullWidth
            onClick={addTeam}
          >
            Create team
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
          {activeTab === 1 && currentUser?.role === UserRole.God && (
            <Button
              size="small"
              variant="contained"
              startIcon={<Add />}
              onClick={() => setIsModalOpen(true)}
            >
              Create team
            </Button>
          )}
          {renderTabs()}
          <Grid container alignItems="center" alignContent="center">
            {renderContent()}
          </Grid>
        </Paper>
      </Container>
      {renderModal()}
    </>
  )
}

export default Members
