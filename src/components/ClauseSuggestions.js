import React from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'

const ClauseSuggestions = ({ clauses, onInsert }) => {
  if (!clauses?.length) return null

  return (
    <Box mt={3}>
      <Typography variant="subtitle1" gutterBottom>🧩 Suggested Clauses:</Typography>
      <Stack spacing={1}>
        {clauses.map((clause, index) => (
          <Button
            key={index}
            variant="outlined"
            size="small"
            onClick={() => onInsert(clause)}
            sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
          >
            {clause}
          </Button>
        ))}
      </Stack>
    </Box>
  )
}

export default ClauseSuggestions
