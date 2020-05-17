import React, { FC, useState, useEffect, ChangeEvent, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import {
  Container,
  Paper,
  Typography,
  Divider,
  Button,
  TextField,
  Snackbar,
} from '@material-ui/core'
import { Edit, Save, Cancel, People } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'

import { getSubject, updateSubject } from 'data/api/subjects'

import { Subject as SubjectType } from 'types/models/subject'

import { useStyles } from './styles'

const Subject: FC = () => {
  const { id } = useParams()
  const classes = useStyles()

  const [isEditing, setIsEditing] = useState<boolean>(false)

  const [subject, setSubject] = useState<SubjectType | null>(null)
  const [editedSubject, setEditedSubject] = useState<SubjectType | null>(null)

  const [error, setError] = useState<string | null>(null)

  const fetchSubject = useCallback(async () => {
    if (!id) return

    const fetchedSubject = await getSubject(id)

    if (!fetchedSubject) return

    setSubject(fetchedSubject)
    setEditedSubject(fetchedSubject)
  }, [id])

  useEffect(() => {
    fetchSubject()
  }, [fetchSubject])

  function handleSubjectTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setEditedSubject(prevState => {
      if (!prevState) return prevState

      const newState = { ...prevState, title: value }

      return newState
    })
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setEditedSubject(prevState => {
      if (!prevState) return prevState

      const newState = { ...prevState, description: value }

      return newState
    })
  }

  const handleSaveClick = async () => {
    setError(null)

    if (!isEditing) {
      setIsEditing(true)

      return
    }

    if (!id || !editedSubject?.title) {
      setError('Missing required values (title or subject id cannot be empty)!')

      return
    }

    const response = await updateSubject({ ...editedSubject, id })

    if (response?.status !== 204) {
      setError('Something went wrong')
    } else {
      await fetchSubject()

      setIsEditing(false)
    }
  }

  function renderTitle() {
    if (!subject) return null

    if (!isEditing)
      return (
        <Typography className={classes.between} variant="h3" align="center">
          {subject.title}
        </Typography>
      )

    return (
      <TextField
        className={classes.betweenBlocks}
        variant="outlined"
        required
        label="Subject title"
        onChange={handleSubjectTitleChange}
        value={editedSubject?.title}
      />
    )
  }

  return (
    <>
      <Container className={classes.top}>
        <Paper elevation={6}>
          {renderTitle()}
          <Divider />
          <div className={classes.horizontal}>
            {isEditing ? (
              <TextField
                className={classes.betweenBlocks}
                variant="outlined"
                label="Description"
                multiline
                fullWidth
                value={editedSubject?.description}
                onChange={handleDescriptionChange}
              />
            ) : (
              <Typography className={classes.betweenBlocks}>{subject?.description}</Typography>
            )}

            <Button
              className={classes.betweenBlocks}
              size="small"
              variant="contained"
              color="secondary"
              startIcon={isEditing ? <Save /> : <Edit />}
              onClick={handleSaveClick}
            >
              {isEditing ? 'Save' : 'Edit subject'}
            </Button>
            {isEditing && (
              <Button
                className={classes.betweenBlocks}
                size="small"
                variant="contained"
                startIcon={<Cancel />}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            )}
            <Button
              className={classes.betweenBlocks}
              size="small"
              variant="contained"
              startIcon={<People />}
            >
              Assign to team member
            </Button>
          </div>
        </Paper>
      </Container>
      <Snackbar open={error !== null}>
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Subject
