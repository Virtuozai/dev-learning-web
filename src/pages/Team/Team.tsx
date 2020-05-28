import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Grid, Container, Paper, Divider } from '@material-ui/core'

import { Member } from 'components'
import { User as UserType } from 'types/models/user'
import { Team as TeamModel } from 'types/models/team'

import { getUser, getTeamUsers } from 'data/api/users'
import { getTeamById } from 'data/api/teams'

import { useStyles } from './styles'

const Team: FC = () => {
  const { id } = useParams()
  const classes = useStyles()

  const [users, setUsers] = useState<Array<UserType>>([])
  const [currentTeam, setCurrentTeam] = useState<TeamModel | null>(null)
  const [teamLead, setTeamLead] = useState<UserType | null>(null)

  useEffect(() => {
    async function fetchTeamUsers() {
      if (!id) return

      const fetchedTeamUsers = await getTeamUsers(Number(id))

      if (!fetchedTeamUsers) return

      setUsers(fetchedTeamUsers)
    }

    fetchTeamUsers()
  }, [id])

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
    const titleText = `${currentTeam?.name}`

    return (
      <Typography className={classes.after} variant="h3" align="center">
        {titleText}
      </Typography>
    )
  }

  function renderText(text: string) {
    const titleText = `${text}`

    return (
      <Typography className={classes.after} variant="h4" align="center">
        {titleText}
      </Typography>
    )
  }

  function renderUsers() {
    return users.map(user => {
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

  return (
    <Container>
      <Paper elevation={6}>
        {renderTitle()}
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
  )
}
export default Team
