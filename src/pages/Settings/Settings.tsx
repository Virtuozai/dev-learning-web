import React, { FC, useContext, useState, useEffect, ChangeEvent } from 'react'
import { AxiosResponse } from 'axios'
import { Alert } from '@material-ui/lab'
import { Container, Paper, Grid, Typography, TextField, Button } from '@material-ui/core'

import { updateUser } from 'data/api/users'
import { User } from 'types/models/user'

import { UserContext } from 'App'

import { useStyles } from './styles'

type Props = {
  fetchUser: () => Promise<AxiosResponse<User> | null>
}

const Settings: FC<Props> = ({ fetchUser }: Props) => {
  const classes = useStyles()

  const user = useContext(UserContext)

  const [editedUser, setEditedUser] = useState<User | null>(null)

  useEffect(() => {
    setEditedUser(user)
  }, [user])

  const [error, setError] = useState<string | null>(null)

  function renderTitle() {
    const titleText = `Settings`

    return (
      <Typography className={classes.after} variant="h3" align="center">
        {titleText}
      </Typography>
    )
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event

    if (!editedUser) return

    setEditedUser(prevState => {
      if (!prevState) return null

      return { ...prevState, firstName: value }
    })
  }

  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event

    if (!editedUser) return

    setEditedUser(prevState => {
      if (!prevState) return null

      return { ...prevState, lastName: value }
    })
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event

    if (!editedUser) return

    setEditedUser(prevState => {
      if (!prevState) return null

      return { ...prevState, email: value }
    })
  }

  const updateUserInfo = async () => {
    setError(null)

    if (!editedUser) return

    const response = await updateUser(editedUser)

    if (response?.status !== 204) {
      setError('Something went wrong')

      return
    }

    await fetchUser()
  }

  function renderBasicInfo() {
    if (!editedUser) return null

    return (
      <>
        <TextField
          className={classes.after}
          label="First name"
          fullWidth
          value={editedUser.firstName}
          variant="outlined"
          onChange={handleNameChange}
        />
        <TextField
          className={classes.after}
          label="Last name"
          fullWidth
          value={editedUser.lastName}
          variant="outlined"
          onChange={handleLastNameChange}
        />
        <TextField
          className={classes.after}
          label="Email"
          fullWidth
          value={editedUser.email}
          variant="outlined"
          onChange={handleEmailChange}
        />

        <Button
          className={classes.after}
          color="primary"
          size="large"
          variant="contained"
          onClick={updateUserInfo}
        >
          Update
        </Button>
      </>
    )
  }

  return (
    <Container>
      <Paper elevation={6}>
        {renderTitle()}
        <Grid className={classes.horizontal} container justify="center">
          {renderBasicInfo()}
        </Grid>
      </Paper>
      {error && (
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      )}
    </Container>
  )
}
export default Settings
