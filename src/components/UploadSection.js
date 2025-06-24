import React from 'react'
import { Button, CircularProgress, Typography } from '@mui/material'
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
    files = []
}) => (
    <>
        <MergedUpload
            loading={loading}
            handleFileChange={handleFileChange}
            uploadFile={uploadFile}
        />

        <Typography variant="body2" sx={{ mt: 1 }}>
            📎 {files.length} file{files.length !== 1 ? 's' : ''} selected
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
            {loading ? <CircularProgress size={20} /> : `Generate ${draftType}`}
        </Button>
    </>
)

export default UploadSection
