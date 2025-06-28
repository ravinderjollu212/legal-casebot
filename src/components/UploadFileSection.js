import { Box, Typography } from '@mui/material'
import MergedUpload from './MergedUpload'
import FilePreview from './FilePreview'

const UploadFileSection = ({ loading, handleFileChange, uploadFile, files = [], combinedPreview }) => {
  const fileLabel =
    files.length > 0
      ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
      : 'No files selected'

  return (
    <Box>
      <MergedUpload
        loading={loading}
        handleFileChange={handleFileChange}
        uploadFile={uploadFile}
      />

      <Typography variant="body2" sx={{ mt: 1 }}>
        📎 {fileLabel}
      </Typography>

      <FilePreview content={combinedPreview} loading={loading} />
    </Box>
  )
}

export default UploadFileSection
