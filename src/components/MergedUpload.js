import React, { useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  useTheme
} from '@mui/material'

const MergedUpload = ({ loading, handleFileChange, uploadFile }) => {
  const theme = useTheme()
  const inputRef = useRef()

  const onFilesSelected = (files) => {
    const selected = Array.from(files)
    if (selected.length > 0) handleFileChange(selected)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'application/*': ['.pdf', '.docx', '.txt'] },
    onDrop: onFilesSelected,
    noClick: true
  })

  return (
    <Box sx={{ my: 4 }}>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? theme.palette.primary.main : theme.palette.divider,
          backgroundColor: isDragActive
            ? theme.palette.action.hover
            : theme.palette.mode === 'dark'
              ? '#1e1e1e'
              : '#f9f9f9',
          color: theme.palette.text.primary,
          p: 5,
          textAlign: 'center',
          borderRadius: 3,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
            borderColor: theme.palette.primary.main
          }
        }}
        onClick={() => inputRef.current?.click()}
      >
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          📂 Drag & drop documents here, or <u>click to upload</u>
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Supported: .pdf, .docx, .txt
        </Typography>

        <input
          {...getInputProps()}
          ref={inputRef}
          onChange={(e) => onFilesSelected(e.target.files)}
        />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="flex-end" mt={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={uploadFile}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
        >
          {loading ? 'Uploading...' : 'Upload & Parse'}
        </Button>
      </Box>
    </Box>
  )
}

export default MergedUpload
