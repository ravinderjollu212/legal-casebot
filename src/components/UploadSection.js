import {
    Box,
    Typography,
    Paper,
    LinearProgress,
    Divider,
    useTheme
} from '@mui/material'
import FilePreview from './FilePreview'
import MergedUpload from './MergedUpload'

const UploadSection = ({
    loadingUpload,
    handleFileChange,
    uploadFile,
    files = [],
    combinedPreview,
    setFiles,
    setCombinedPreview
}) => {
    const theme = useTheme()

    const fileLabel =
        files.length > 0
            ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
            : 'No files selected'

    return (
        <Box>
            <Paper
                variant="outlined"
                sx={{
                    p: 3,
                    borderRadius: 2,
                    mb: 4,
                    position: 'relative',
                    bgcolor: theme.palette.background.paper,
                    borderColor: theme.palette.divider,
                    transition: 'all 0.3s ease'
                }}
            >
                {loadingUpload && (
                    <LinearProgress
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4
                        }}
                    />
                )}

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={600}>
                        📤 Upload Case Files
                    </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Upload PDF, DOCX, or image files related to the case. Drag & drop is supported.
                </Typography>

                <MergedUpload
                    loading={loadingUpload}
                    handleFileChange={handleFileChange}
                    uploadFile={uploadFile}
                    setFiles={setFiles}
                    setCombinedPreview={setCombinedPreview}
                />

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1, fontStyle: 'italic' }}
                >
                    📎 {fileLabel}
                </Typography>

                <FilePreview content={combinedPreview} loading={loadingUpload} />
            </Paper>

            <Divider sx={{ mb: 5 }} />
        </Box>
    )
}

export default UploadSection