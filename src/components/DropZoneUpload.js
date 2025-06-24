import { useDropzone } from 'react-dropzone'
import { Box, Typography, useTheme } from '@mui/material'

const DropZoneUpload = ({ onFileDrop }) => {
  const theme = useTheme()

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/*': ['.pdf', '.docx', '.txt'] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) onFileDrop(acceptedFiles)
    }
  })

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed',
        borderColor: theme.palette.mode === 'dark' ? '#888' : '#aaa',
        backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fafafa',
        color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        padding: 4,
        textAlign: 'center',
        my: 3,
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'background 0.3s ease'
      }}
    >
      <input {...getInputProps()} />
      <Typography>
        📂 Drag & drop a document here, or click to upload
      </Typography>
    </Box>
  )
}

export default DropZoneUpload
