import React, { FC, useState, useEffect } from 'react'
import { Typography, Grid, Container, Paper } from '@material-ui/core'
import { Member } from 'components'
import { User } from 'types/models/user'

import { useParams } from 'react-router-dom'

import { getTeamUsers } from 'data/api/users'

const Team: FC = () => {
  const { id } = useParams()
  const [users, setUsers] = useState<Array<User>>([])

  useEffect(() => {
    async function fetchUsers() {
      if (id !== null) return
      const idInt = parseInt(id, 10)
      const fetchedUsers = await getTeamUsers(idInt)

      if (!fetchedUsers) return

      setUsers(fetchedUsers)
    }

    fetchUsers()
  }, [id])

  function renderTitle() {
    const titleText = 'Team Members'

    return (
      <Typography variant="h3" align="center">
        {titleText}
      </Typography>
    )
  }

  function renderUsers() {
    return users.map(user => (
      <Grid item key={user.id} xs={12} sm={6} md={4} lg={3}>
        <Member user={user} />
      </Grid>
    ))
  }

  return (
    <>
      <Container>
        <Paper elevation={6}>
          {renderTitle()}
          <Grid container alignItems="center" alignContent="center">
            {renderUsers()}
          </Grid>
        </Paper>
      </Container>
    </>
  )
}
export default Team
