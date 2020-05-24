import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import {
  Grid,
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
} from '@material-ui/core'

import { User } from 'types/models/user'

import { USER, TEAM } from 'constants/routes'

import { useStyles } from './styles'

type Props = {
  user: User
}

const Members: FC<Props> = ({ user }: Props) => {
  const classes = useStyles()

  const { id, firstName, lastName, email, team, teamId } = user

  return (
    <Card className={classes.memberItem}>
      <CardHeader
        avatar={<Avatar>{firstName[0] + lastName[0]}</Avatar>}
        title={
          <Link to={USER.replace(':id', id.toString())}>
            <Button size="small">{`${firstName} ${lastName}`}</Button>
          </Link>
        }
      />
      <Divider />
      <CardContent>
        <Grid container alignItems="center">
          <Typography variant="h6">Email:</Typography>
          <Typography className={classes.alignRight}>{email}</Typography>
        </Grid>
        <Grid container alignItems="center">
          <Typography variant="h6">Team:</Typography>
          {teamId ? (
            <Link to={TEAM.replace(':id', teamId.toString())} className={classes.alignRight}>
              <Button size="small">{team?.name || 'User has no team'}</Button>
            </Link>
          ) : (
            <Button size="small" className={classes.alignRight}>
              User has no team
            </Button>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Members
