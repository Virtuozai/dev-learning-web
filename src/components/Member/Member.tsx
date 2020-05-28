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
  isTeamShown?: boolean
}

const Members: FC<Props> = ({ user, isTeamShown = true }: Props) => {
  const classes = useStyles()

  const { id, firstName, lastName, email, team, teamId } = user

  function renderTeamBlock() {
    if (!isTeamShown) return null

    let teamButton = (
      <Button className={classes.alignRight} size="small">
        {team?.name || 'User has no team'}
      </Button>
    )

    if (teamId || team) {
      teamButton = (
        <Link to={TEAM.replace(':id', teamId.toString())} className={classes.alignRight}>
          {teamButton}
        </Link>
      )
    }

    return (
      <Grid container alignItems="center">
        <Typography variant="h6">Team:</Typography>
        {teamButton}
      </Grid>
    )
  }

  return (
    <Card className={classes.memberItem}>
      <CardHeader
        avatar={<Avatar>{firstName[0] + lastName[0]}</Avatar>}
        title={
          <Link className="u-text-truncate" to={USER.replace(':id', id.toString())}>
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
        {renderTeamBlock()}
      </CardContent>
    </Card>
  )
}

export default Members
