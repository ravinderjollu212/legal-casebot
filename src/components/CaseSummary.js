import React from 'react'
import { Box, Typography, Button, CircularProgress, useTheme } from '@mui/material'

const CaseSummary = ({ isParsed, loading, summarizeCase, summary, darkMode }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <>
      <Box mt={3}>
        <Button
          variant="contained"
          color="info"
          onClick={summarizeCase}
          disabled={!isParsed || loading}
        >
          {loading ? <CircularProgress size={20} /> : '📝 Summarize Case'}
        </Button>
      </Box>

      {summary && (
        <Box mt={3}>
          <Typography variant="h6">📌 Case Summary:</Typography>
          <Box
            sx={{
              backgroundColor: darkMode ? '#1e1e1e' : '#fefefe',
              color: darkMode ? '#f0f0f0' : '#000',
              border: `1px solid ${darkMode ? '#555' : '#ccc'}`,
              padding: 2,
              borderRadius: 1,
              whiteSpace: 'pre-wrap',
              mt: 1
            }}
          >
            {summary}
          </Box>
        </Box>
      )}
    </>
  )
}

export default CaseSummary
