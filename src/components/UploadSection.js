import { Box, LinearProgress, Divider, Typography, Paper } from '@mui/material'
import UploadFileSection from './UploadFileSection'

const UploadSection = ({
    loadingUpload,
    handleFileChange,
    uploadFile,
    files = [],
    combinedPreview
}) => {
    return (
        <Box>
            <Paper
                variant="outlined"
                sx={{ p: 3, borderRadius: 2, mb: 4, position: 'relative' }}
            >
                {loadingUpload && (
                    <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />
                )}

                <Typography variant="h6" gutterBottom>
                    📤 Upload Case Files
                </Typography>

                <UploadFileSection
                    loading={loadingUpload}
                    handleFileChange={handleFileChange}
                    uploadFile={uploadFile}
                    files={files}
                    combinedPreview={combinedPreview}
                />
            </Paper>

            <Divider sx={{ mb: 4 }} />
        </Box>
    )
}

export default UploadSection