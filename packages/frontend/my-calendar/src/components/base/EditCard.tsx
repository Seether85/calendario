import React, { useRef } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import Title from './Title'

import { createHashHistory } from '@tanstack/react-location'
import { useUpdateUser } from '../../hooks/useUpdateUser'

type Props = {
  id: number
  title: string
  content: string
  note: string
}

export const EditCard: React.FC<Props> = ({ id, title, content, note }) => {
  const history = createHashHistory()
  const contentEl = useRef<HTMLInputElement>(null)
  const noteEl = useRef<HTMLInputElement>(null)

  const { mutate } = useUpdateUser()

  const edit = (event: React.SyntheticEvent) => {
    event.preventDefault()

    if (noteEl.current !== null && contentEl.current !== null) {
      mutate({
        id: id,
        firstname: contentEl.current.value,
        lastname: noteEl.current.value,
      })
    }
  }

  return (
    <Grid item xs={12} md={4} lg={3}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          height: 240,
        }}
      >
        <form id="editable-card" onSubmit={edit}>
          <Title>
            <Typography component="p" variant="h4">
              {title}
            </Typography>
          </Title>
          <Typography component="p" variant="h4">
            <input
              ref={contentEl}
              type="text"
              name="content"
              defaultValue={content}
              required
            />
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            <input
              ref={noteEl}
              type="text"
              name="note"
              defaultValue={note}
              required
            />
          </Typography>
          <section style={{ marginTop: '1rem' }}>
            <Button
              variant="contained"
              type="submit"
              size="small"
              color="success"
              style={{ cursor: 'pointer' }}
            >
              Modifica
            </Button>
            <Button
              variant="contained"
              size="small"
              color="info"
              onClick={history.back}
              style={{ cursor: 'pointer' }}
            >
              Indietro
            </Button>
          </section>
        </form>
      </Paper>
    </Grid>
  )
}
