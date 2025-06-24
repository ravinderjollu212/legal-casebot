import React, { useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { Box, Typography, Button, CircularProgress, useTheme } from '@mui/material'

const MergedUpload = ({ loading, handleFileChange, uploadFile }) => {
  console.log('loading', loading )
  const theme = useTheme()
  const inputRef = useRef()

  const onFilesSelected = (files) => {
    const selected = Array.from(files)
    if (selected.length > 0) handleFileChange(selected)
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
        <Button variant="contained" onClick={uploadFile} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Upload & Parse'}
        </Button>
      </Box>
    </Box>
  )
}

export default MergedUpload
