import { Box, Skeleton, Typography } from '@mui/material'

const FilePreview = ({ content, loading }) => {
  if (!content) return null

  return (
    <Box mt={3}>
      <Typography variant="h6">📑 File Preview:</Typography>
      {loading ? (
        <Skeleton variant="rectangular" height={200} sx={{ mt: 1, borderRadius: 1 }} />
      ) : (
        <Box
          component="pre"
          sx={{
            background: '#f5f5f5',
            padding: 2,
            borderRadius: 1,
            whiteSpace: 'pre-wrap',
            maxHeight: '300px',
            overflowY: 'auto',
            mt: 1
          }}
        >
          {content}
        </Box>
      )}
    </Box>
  )
}

export default FilePreview
