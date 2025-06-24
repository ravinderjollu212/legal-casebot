import React from 'react'
import { Box, Button, Typography, CircularProgress, useTheme } from '@mui/material'

const LegalFlaws = ({ detectFlaws, loading, flaws }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <>
      <Box mt={3}>
        <Button
          variant="contained"
          color="error"
          onClick={detectFlaws}
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : '🚨 Highlight Legal Flaws'}
        </Button>
      </Box>

      {flaws && (
        <Box mt={3}>
          <Typography variant="h6" sx={{ color: isDark ? '#ff8a80' : undefined }}>
            ⚠️ Detected Legal Flaws:
          </Typography>
          <Box
            sx={{
              backgroundColor: isDark ? '#2a1a1a' : '#fff8f8',
              padding: 2,
              border: '1px solid',
              borderColor: isDark ? '#d32f2f' : '#f44336',
              borderRadius: 1,
              whiteSpace: 'pre-wrap',
              mt: 1,
              color: isDark ? '#ff8a80' : '#b71c1c'
            }}
          >
            {flaws}
          </Box>
        </Box>
      )}
    </>
  )
}

export default LegalFlaws
