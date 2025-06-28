import { Box, Typography, useTheme, Paper, CircularProgress } from '@mui/material'

const FilePreview = ({ content, loading }) => {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Box mt={5}>
      <Typography
        variant="subtitle1"
        fontWeight={600}
        gutterBottom
        sx={{
          color: isDark ? '#f0f0f0' : '#1a1a1a',
          fontSize: '1rem',
          letterSpacing: 0.3
        }}
      >
        📄 Document Preview
      </Typography>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: isDark ? '#101418' : '#ffffff',
          border: `1px solid ${isDark ? '#2a2a2a' : '#e0e0e0'}`,
          borderRadius: 3,
          p: 3,
          maxHeight: 320,
          overflowY: 'auto',
          boxShadow: isDark ? '0 0 0 1px #2a2a2a' : '0 0 0 1px #f0f0f0',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight={200}
            sx={{ opacity: 0.6 }}
          >
            <CircularProgress size={28} />
          </Box>
        ) : content ? (
          <Typography
            component="pre"
            sx={{
              fontFamily: '"JetBrains Mono", Menlo, monospace',
              fontSize: '0.875rem',
              lineHeight: 1.7,
              color: isDark ? '#eaeaea' : '#2b2b2b',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              letterSpacing: 0.2,
              userSelect: 'text'
            }}
          >
            {content}
          </Typography>
        ) : (
          <Typography
            variant="body2"
            color={isDark ? 'text.disabled' : 'text.secondary'}
            textAlign="center"
            sx={{ py: 4 }}
          >
            No preview available.
          </Typography>
        )}
      </Paper>
    </Box>
  )
}

export default FilePreview
