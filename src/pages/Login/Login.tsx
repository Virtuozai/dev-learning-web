import React, { FC, useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core'
import { LockOutlined } from '@material-ui/icons'

import { HOME } from 'constants/routes'

import { useStyles } from './styles'

const Login: FC = () => {
  const classes = useStyles()

  const history = useHistory()

  const [isRegistering, setIsRegistering] = useState<boolean>(false)

  function handleClick() {
    setIsRegistering(!isRegistering)
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    history.push(HOME)
  }

  function renderAvatar() {
    return (
      <Avatar className={classes.avatar}>
        <LockOutlined />
      </Avatar>
    )
  }

  function renderTitle() {
    const titleText = isRegistering ? 'Sign up' : 'Sign in'

    return (
      <>
        {renderAvatar()}
        <Typography component="h1" variant="h5">
          {titleText}
        </Typography>
      </>
    )
  }

  function renderTextFields() {
    return (
      <>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </>
    )
  }

  function renderSignupTextFields() {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
            />
          </Grid>
        </Grid>
        {renderTextFields()}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Repeat Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I agree with terms and conditions"
          />
        </Grid>
      </>
    )
  }

  function renderForm() {
    return (
      <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
        {isRegistering ? (
          renderSignupTextFields()
        ) : (
          <>
            {renderTextFields()}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          {isRegistering ? 'Sign up' : 'Sign in'}
        </Button>
        <Button color="primary" onClick={handleClick}>
          {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
        </Button>
      </form>
    )
  }

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={false} md={7} lg={9} className={classes.image} />
      <Grid item xs={12} sm={12} md={5} lg={3} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          {renderTitle()}
          {renderForm()}
        </div>
      </Grid>
    </Grid>
  )
}

export default Login
