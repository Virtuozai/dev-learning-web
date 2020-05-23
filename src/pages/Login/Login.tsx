import React, { FC, useState, FormEvent, ChangeEvent } from 'react'
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
import { Alert } from '@material-ui/lab'

import { LEARNING } from 'constants/routes'

import { login, register } from 'data/api/users'

import { useStyles } from './styles'

type Props = {
  checkIfLoggedOn: () => void
}

const Login: FC<Props> = ({ checkIfLoggedOn }: Props) => {
  const classes = useStyles()

  const history = useHistory()

  const [isRegistering, setIsRegistering] = useState<boolean>(false)

  const [password, setPassword] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const [repeatPassword, setRepeatPassword] = useState<string | null>(null)
  const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(null)

  const [email, setEmail] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)

  const [firstName, setFirstName] = useState<string | null>(null)
  const [firstNameError, setFirstNameError] = useState<string | null>(null)

  const [lastName, setLastName] = useState<string | null>(null)
  const [lastNameError, setLastNameError] = useState<string | null>(null)

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  function handleClick() {
    setIsRegistering(!isRegistering)
  }

  function clearErrors() {
    setPasswordError(null)
    setRepeatPasswordError(null)
    setEmailError(null)
    setErrorMessage(null)
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setPassword(value)
    setPasswordError(null)
  }

  function handleRepeatPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setRepeatPassword(value)
    setRepeatPasswordError(null)
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setEmail(value)
    setEmailError(null)
  }

  function handleFirstNameChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setFirstName(value)
    setFirstNameError(null)
  }

  function handleLastNameChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setLastName(value)
    setLastNameError(null)
  }

  function validateForm() {
    let isFormValid = true

    if (!email) {
      setEmailError('Email is required')

      isFormValid = false
    }

    if (!password) {
      setPasswordError('Password is required')

      isFormValid = false
    }

    if (!isRegistering) return isFormValid

    if (!firstName) {
      setFirstNameError('First name is required')

      isFormValid = false
    }

    if (!lastName) {
      setLastNameError('Last name is required')

      isFormValid = false
    }

    if (!repeatPassword) {
      setRepeatPasswordError('Repeat password is required')

      isFormValid = false
    }

    if (repeatPassword !== password) {
      setRepeatPasswordError('Passwords must match')

      isFormValid = false
    }

    return isFormValid
  }

  const handleLogin = async () => {
    if (!validateForm()) return
    if (!email || !password) return

    const response = await login({ email, password })

    if (!response) {
      setErrorMessage('Incorrect user email or password')

      return
    }

    await checkIfLoggedOn()

    history.push(LEARNING)
  }

  const handleRegister = async () => {
    if (!validateForm()) return
    if (!email || !password || !firstName || !lastName) return

    const response = await register({ firstName, lastName, email, password })

    if (!response) {
      setErrorMessage('Something went wrong')

      return
    }

    await checkIfLoggedOn()

    history.push(LEARNING)
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    clearErrors()

    if (isRegistering) return handleRegister()

    return handleLogin()
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
          onChange={handleEmailChange}
          error={emailError !== null}
          helperText={emailError}
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
          onChange={handlePasswordChange}
          error={passwordError !== null}
          helperText={passwordError}
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
              onChange={handleFirstNameChange}
              error={firstNameError !== null}
              helperText={firstNameError}
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
              onChange={handleLastNameChange}
              error={lastNameError !== null}
              helperText={lastNameError}
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
          onChange={handleRepeatPasswordChange}
          error={repeatPasswordError !== null}
          helperText={repeatPasswordError}
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
        {errorMessage && (
          <Alert variant="filled" severity="error">
            {errorMessage}
          </Alert>
        )}
        <div className={classes.paper}>
          {renderTitle()}
          {renderForm()}
        </div>
      </Grid>
    </Grid>
  )
}

export default Login
