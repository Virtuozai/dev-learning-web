import React, { FC, useContext, useState } from 'react'
import { Alert } from '@material-ui/lab'

import { Container, Paper, Grid, Typography, TextField, Tabs, Tab, Chip } from '@material-ui/core'
import { updateUser } from 'data/api/users'

import { UserContext } from 'App'

import { useStyles } from './styles'

const SettingsPage: FC = () => {
  const classes = useStyles()

  const [value, setValue] = useState(0)

  const user = useContext(UserContext)
  const [error, setError] = useState<string | null>(null)
  const editedUser = useContext(UserContext)

  function renderTitle() {
    const titleText = `Settings`

    return (
      <Typography variant="h3" align="center">
        {titleText}
      </Typography>
    )
  }

  function renderLabel(text: string) {
    return <Typography variant="h4">{text}</Typography>
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedUser) return
    editedUser.firstName = event.target.value
  }

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedUser) return
    editedUser.lastName = event.target.value
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedUser) return
    editedUser.email = event.target.defaultValue
  }

  const updateUserInfo = async () => {
    setError(null)

    if (!editedUser) return
    const response = await updateUser(editedUser)

    if (response?.status !== 204) {
      setError('Something went wrong')
    } else {
      window.location.reload(false)
    }
  }

  function renderBasicInfo() {
    if (!user) return null

    return (
      <>
        <form>
          <div className={classes.input}>
            {renderLabel('First Name')}
            <TextField
              className={classes.textField}
              id="First_name_edit"
              label={user.firstName}
              variant="outlined"
              onChange={handleNameChange}
            />
          </div>

          <div className={classes.input}>
            {renderLabel('Last Name')}
            <TextField
              className={classes.textField}
              id="Last_name_edit"
              label={user.lastName}
              variant="outlined"
              onChange={handleLastNameChange}
            />
          </div>
          <div className={classes.input}>
            {renderLabel('Email')}
            <TextField
              className={classes.textField}
              id="Email_edit"
              label={user.email}
              variant="outlined"
              onChange={handleEmailChange}
            />
          </div>
          <Chip
            color="primary"
            size="small"
            label="Update"
            className={classes.chip}
            onClick={updateUserInfo}
          />
        </form>
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
          <Tab label="Public Info" />
          <Tab label="Change Password" />
        </Tabs>
      </Paper>
    )
  }
  function renderChangePasword() {
    if (!user) return null

    return (
      <>
        <form>
          <div className={classes.input}>
            {renderLabel('Old Password')}

            <TextField
              className={classes.textField}
              type="password"
              id="User_change_pass"
              variant="outlined"
            />
          </div>
          <div className={classes.input}>
            {renderLabel('NewPassword')}

            <TextField
              className={classes.textField}
              type="password"
              id="User_change_pass"
              variant="outlined"
            />
          </div>
          <div className={classes.input}>
            {renderLabel('Repeat Password')}

            <TextField
              className={classes.textField}
              type="password"
              id="User_change_pass"
              variant="outlined"
            />
          </div>
          <Chip color="primary" size="small" label="Update" className={classes.chip} />
        </form>
      </>
    )
  }

  function renderInsideTabs() {
    if (value === 0) return renderBasicInfo()
    return renderChangePasword()
  }

  return (
    <>
      <Container maxWidth="sm">
        <Paper elevation={6}>
          {renderTitle()}
          {renderTabs()}
          <Grid container className={classes.info}>
            <Grid item>{renderInsideTabs()}</Grid>
          </Grid>
        </Paper>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
      </Container>
    </>
  )
}
export default SettingsPage
