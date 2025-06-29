import React, { useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  useTheme,
  Snackbar,
  Alert
} from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const MergedUpload = ({
  loading,
  handleFileChange,
  uploadFile,
  setFiles,
  setCombinedPreview
}) => {
  const theme = useTheme()
  const inputRef = useRef()
  const [showSnackbar, setShowSnackbar] = useState(false)

  const onFilesSelected = (files) => {
    const selected = Array.from(files)
    if (selected.length > 0) handleFileChange(selected)
  }

  const clearAll = () => {
    setFiles([])
    setCombinedPreview('')
    setShowSnackbar(true)
    if (inputRef.current) inputRef.current.value = null
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/*': ['.pdf', '.docx', '.txt'] },
    onDrop: onFilesSelected,
    noClick: true
  })

  return (
    <Box sx={{ my: 3 }}>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: theme.palette.mode === 'dark' ? '#888' : '#aaa',
          backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          padding: 4,
          textAlign: 'center',
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'background 0.3s ease'
        }}
        onClick={() => inputRef.current?.click()}
      >
        <Typography>
          📂 Drag & drop a document here, or click to upload
        </Typography>
        <input
          {...getInputProps()}
          ref={inputRef}
          onChange={(e) => onFilesSelected(e.target.files)}
        />
      </Box>

      <Box display="flex" alignItems="center" gap={2} mt={2}>
        <Button
          variant="contained"
          onClick={uploadFile}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} /> : null}
        >
          {loading ? 'Uploading...' : 'Upload & Parse'}
        </Button>

        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={clearAll}
          startIcon={<DeleteOutlineIcon />}
          disabled={loading}
        >
          Clear All
        </Button>
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" onClose={() => setShowSnackbar(false)}>
          📁 Files cleared successfully
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default MergedUpload
