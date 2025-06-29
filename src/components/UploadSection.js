import { Box, Typography, LinearProgress, Paper, Divider } from '@mui/material'
import MergedUpload from './MergedUpload'
import FilePreview from './FilePreview'

const UploadSection = ({
    loadingUpload,
    handleFileChange,
    uploadFile,
    files = [],
    combinedPreview
}) => {
    const fileLabel =
        files.length > 0
            ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
            : 'No files selected'

    return (
        <Box>
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    mb: 6,
                    position: 'relative',
                    bgcolor: theme =>
                        theme.palette.mode === 'dark' ? '#1e1e1e' : '#ffffff',
                    border: '1px solid',
                    borderColor: theme => theme.palette.divider,
                    boxShadow: theme =>
                        theme.palette.mode === 'dark'
                            ? '0 2px 12px rgba(255,255,255,0.05)'
                            : '0 2px 12px rgba(0,0,0,0.05)',
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

                <Typography
                    variant="h5"
                    fontWeight={600}
                    sx={{
                        color: theme => theme.palette.primary.main,
                        mb: 1
                    }}
                >
                    📤 Upload Case Files
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Upload PDF, DOCX, or image files related to the case. Drag & drop is supported.
                </Typography>

                <MergedUpload
                    loading={loadingUpload}
                    handleFileChange={handleFileChange}
                    uploadFile={uploadFile}
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