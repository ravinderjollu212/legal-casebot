import {
    Box,
    Button,
    CircularProgress,
    Typography,
    LinearProgress,
} from '@mui/material'
import MergedUpload from './MergedUpload'
import DraftSelector from './DraftSelector'
import FilePreview from './FilePreview'

const UploadSection = ({
    loading,
    handleFileChange,
    uploadFile,
    draftType,
    setDraftType,
    draftTypes,
    combinedPreview,
    generateDraft,
    isParsed,
    files = [],
}) => {
    const fileLabel =
        files.length > 0
            ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
            : 'No files selected'

    return (
        <Box
            sx={{
                pointerEvents: loading ? 'none' : 'auto',
                opacity: loading ? 0.6 : 1,
                position: 'relative',
            }}
        >
            {loading && <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />}

            <MergedUpload
                loading={loading}
                handleFileChange={handleFileChange}
                uploadFile={uploadFile}
            />

            <Typography variant="body2" sx={{ mt: 1 }}>
                📎 {fileLabel}
            </Typography>

            <DraftSelector
                draftType={draftType}
                setDraftType={setDraftType}
                draftTypes={draftTypes}
            />

            <FilePreview content={combinedPreview} loading={loading} />

            <Button
                variant="contained"
                onClick={generateDraft}
                disabled={!isParsed || loading}
                sx={{ mt: 3 }}
            >
                {loading ? (
                    <>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Generating...
                    </>
                ) : (
                    `Generate ${draftType}`
                )}
            </Button>
        </Box>
    )
}

export default UploadSection
