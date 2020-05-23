import React, { FC, useState, useEffect } from 'react'
import { Container, Grid, Paper, Typography, Tabs, Tab } from '@material-ui/core'

import { Member, Team } from 'components'

import { getUsers } from 'data/api/users'
import { getTeams } from 'data/api/teams'

import { User } from 'types/models/user'
import { Team as TeamModel } from 'types/models/team'

const Members: FC = () => {
  const [users, setUsers] = useState<Array<User>>([])
  const [teams, setTeams] = useState<Array<TeamModel>>([])

  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsers()

      if (!fetchedUsers) return

      setUsers(fetchedUsers)
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    async function fetchTeams() {
      const fetchedTeams = await getTeams()

      if (!fetchedTeams) return

      setTeams(fetchedTeams)
    }

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

  return (
    <Container>
      <Paper elevation={6}>
        {renderTitle()}
        {renderTabs()}
        <Grid container alignItems="center" alignContent="center">
          {renderContent()}
        </Grid>
      </Paper>
    </Container>
  )
}

export default Members
