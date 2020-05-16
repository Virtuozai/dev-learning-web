import React, { FC } from 'react'
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

import { useStyles } from './styles'

type Props = {
  user: User
}

const Members: FC<Props> = ({ user }: Props) => {
  const classes = useStyles()

  const { name, lastName, email, teamName } = user

  return (
    <Card className={classes.memberItem}>
      <CardHeader
        avatar={<Avatar>{name[0] + lastName[0]}</Avatar>}
        title={<Button size="small">{`${name} ${lastName}`}</Button>}
      />
      <Divider />
      <CardContent>
        <Grid container alignItems="center">
          <Typography variant="h6">Email:</Typography>
          <Typography className={classes.alignRight}>{email}</Typography>
        </Grid>
        <Grid container alignItems="center">
          <Typography variant="h6">Team:</Typography>
          <Button size="small" className={classes.alignRight}>
            {teamName}
          </Button>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Members
