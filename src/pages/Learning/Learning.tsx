import React, { FC, useState, useEffect, ChangeEvent } from 'react'
import { uniq, compact } from 'lodash'
import {
  Chip,
  Container,
  Paper,
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Dialog,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core'
import { Add, ExpandMore } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'

import { getSubjects, createSubject, CreateSubjectArgs } from 'data/api/subjects'

import { Subject } from 'types/models/subject'

import { useStyles } from './styles'

const Learning: FC = () => {
  const classes = useStyles()

  const [parentIds, setParentIds] = useState<Array<number>>([])
  const [subjectIds, setSubjectIds] = useState<Array<number>>([])
  const [subjects, setSubjects] = useState<{ [id: number]: Subject }>({})

  const [isAddSubjectModalOpen, setIsAddSubjectModalOpen] = useState(false)

  const [newSubjectTitle, setNewSubjectTitle] = useState<string>('')
  const [newSubjectDescription, setNewSubjectDescription] = useState<string>('')

  const [newSubjectParentId, setNewSubjectParentId] = useState<number | null>(null)

  const [error, setError] = useState<string | null>(null)

  const renderedParentIds: Array<number> = []

  async function fetchSubjects() {
    const fetchedSubjects = await getSubjects()

    if (!fetchedSubjects) return

    const normalizedSubjects: { [id: number]: Subject } = {}

    const normalizedParentIds = compact(uniq(fetchedSubjects.map(({ parentId }) => parentId)))
    const normalizedSubjectIds = fetchedSubjects.map(({ id }) => id)

    fetchedSubjects.forEach(subject => {
      normalizedSubjects[subject.id] = subject
    })

    setSubjects(normalizedSubjects)
    setParentIds(normalizedParentIds)
    setSubjectIds(normalizedSubjectIds)
  }

  useEffect(() => {
    fetchSubjects()
  }, [])

  function handleAddSubjectClick() {
    setIsAddSubjectModalOpen(true)
  }

  function handleAddSubjectModalClose() {
    setIsAddSubjectModalOpen(false)
  }

  const handleCreateSubject = async () => {
    if (!newSubjectTitle) {
      setError('Subject title is required')

      return
    }

    if (!newSubjectDescription) {
      setError('Subject description is required')

      return
    }

    const requestArgs: CreateSubjectArgs = {
      title: newSubjectTitle,
      description: newSubjectDescription,
    }

    if (newSubjectParentId !== null && newSubjectParentId >= 0)
      requestArgs.parentId = newSubjectParentId

    const response = await createSubject(requestArgs)

    if (response?.status !== 204) {
      setError('Something went wrong')

      return
    }

    await fetchSubjects()

    setIsAddSubjectModalOpen(false)
  }

  function handleSubjectTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setNewSubjectTitle(value)
  }

  function handleParentSelect(
    event: ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>,
  ) {
    const {
      target: { value },
    } = event

    setNewSubjectParentId(value as number)
  }

  function handleDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = event

    setNewSubjectDescription(value)
  }

  function renderAddSubjectModal() {
    const title = (
      <Typography className={classes.between} variant="h6" align="center">
        Enter new subject details:
      </Typography>
    )

    return (
      <Dialog open={isAddSubjectModalOpen} onClose={handleAddSubjectModalClose}>
        <Container>
          {title}
          <TextField
            className={classes.betweenBlocks}
            variant="outlined"
            required
            fullWidth
            label="Subject title"
            onChange={handleSubjectTitleChange}
            value={newSubjectTitle}
          />
          <TextField
            className={classes.betweenBlocks}
            variant="outlined"
            label="Description"
            multiline
            fullWidth
            value={newSubjectDescription}
            onChange={handleDescriptionChange}
          />
          <FormControl variant="outlined" fullWidth className={classes.betweenBlocks}>
            <InputLabel id="parent-select-label">Parent subject id</InputLabel>
            <Select
              labelId="parent-select-label"
              id="parent-select"
              value={newSubjectParentId || ''}
              onChange={handleParentSelect}
            >
              <MenuItem value={-1}>None</MenuItem>
              {subjectIds.map(id => (
                <MenuItem key={id} value={id}>
                  {subjects[id].title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            className={classes.betweenBlocks}
            variant="contained"
            color="secondary"
            startIcon={<Add />}
            fullWidth
            onClick={handleCreateSubject}
          >
            Create
          </Button>
        </Container>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
      </Dialog>
    )
  }

  function renderTitle() {
    const titleText = 'Learning'

    return (
      <div className={classes.betweenBlocks}>
        <Typography variant="h3" align="center">
          {titleText}
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          startIcon={<Add />}
          onClick={handleAddSubjectClick}
        >
          Add subject
        </Button>
      </div>
    )
  }

  function renderSubjectsByParent(parentId: number) {
    return compact(
      subjectIds.map(id => {
        if (renderedParentIds.includes(id) || subjects[id]?.parentId !== parentId) return null

        renderedParentIds.push(parentId)

        const renderedSubject = <Chip key={id} color="primary" label={subjects[id].title} />

        if (!parentIds.includes(id)) return renderedSubject

        const expansionPanelClass = `u-fill-width ${classes.betweenSubjects}`

        return (
          <ExpansionPanel className={expansionPanelClass} key={id}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              {renderedSubject}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="u-flex-wrap">
              {renderSubjectsByParent(id)}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      }),
    )
  }

  function renderParentSubjects() {
    if (!subjectIds.length || !parentIds.length) return null

    return compact(
      parentIds.map(parentId => {
        if (renderedParentIds.includes(parentId)) return null

        renderedParentIds.push(parentId)

        return (
          <ExpansionPanel key={parentId}>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Chip color="primary" className="box-item" label={subjects[parentId].title} />
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="u-flex-wrap">
              {renderSubjectsByParent(parentId)}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )
      }),
    )
  }

  return (
    <>
      <Container>
        <Paper elevation={6}>
          {renderTitle()}
          {renderParentSubjects()}
        </Paper>
      </Container>
      {renderAddSubjectModal()}
    </>
  )
}

export default Learning
