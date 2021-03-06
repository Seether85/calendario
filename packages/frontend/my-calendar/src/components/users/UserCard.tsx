import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { Typography } from '@mui/material'
import RemoveIcon from '@mui/icons-material/Remove'
import Title from '../base/Title'

import { Link } from '@tanstack/react-location'
import { useDeleteUser } from '../../hooks/useDeleteUser'

type Props = {
  id: number
  title: string
  firstname: string
  lastname: string
}

export const UserCard: React.FC<Props> = ({
  id,
  title,
  firstname,
  lastname,
}) => {
  const bottomLink = `/users/${id}/edit`

  const { mutate } = useDeleteUser()

  const deleteUser = () => {
    mutate(id)
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
        <Title>{title}</Title>
        <Typography component="p" variant="h4">
          {firstname}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {lastname}
        </Typography>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Link color="primary" to={bottomLink}>
                Apri scheda
              </Link>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={deleteUser}
              >
                <RemoveIcon />
                Elimina
              </Button>
            </Grid>
          </Grid>
        </div>
      </Paper>
    </Grid>
  )
}
