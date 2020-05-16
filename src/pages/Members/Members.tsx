import React, { FC, useState, useEffect } from 'react'
import { Container, Grid, Paper, Typography } from '@material-ui/core'

import { Member } from 'components'

import { getUsers } from 'data/api/users'

import { User } from 'types/models/user'

const Members: FC = () => {
  const [users, setUsers] = useState<Array<User>>([])

  useEffect(() => {
    async function fetchUsers() {
      const fetchedUsers = await getUsers()

      if (!fetchedUsers) return

      setUsers(fetchedUsers)
    }

    fetchUsers()
  }, [])

  function renderTitle() {
    const titleText = 'Members'

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
    <Container>
      <Paper elevation={6}>
        {renderTitle()}
        <Grid container alignItems="center" alignContent="center">
          {renderUsers()}
        </Grid>
      </Paper>
    </Container>
  )
}

export default Members
