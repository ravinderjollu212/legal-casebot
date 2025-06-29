import { forwardRef } from 'react'
import {
    Box,
    Typography,
    Paper,
    Button,
    LinearProgress,
    Divider,
    Skeleton,
    CircularProgress,
    Tooltip
} from '@mui/material'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import DraftSelector from './DraftSelector'
import { printHtmlDraft } from '../utils/ocrUtils'
import PrintIcon from '@mui/icons-material/Print'
import DownloadIcon from '@mui/icons-material/Download'
import DescriptionIcon from '@mui/icons-material/Description'

const DraftWorkflowSection = forwardRef(({
    loadingGenerate,
    loadingDraft,
    draftType,
    setDraftType,
    draftTypes,
    generateDraft,
    isParsed,
    draft,
    setDraft,
    downloadElegantPDF,
    darkMode
}, ref) => {
    const showGenerateTooltip = !isParsed && !loadingGenerate

    return (
        <Box ref={ref}>
            <Divider sx={{ mb: 5 }} />

            <Paper
                elevation={4}
                variant="outlined"
                sx={{
                    p: 4,
                    borderRadius: 4,
                    position: 'relative',
                    bgcolor: theme => theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
                    borderColor: theme => theme.palette.divider,
                    transition: 'all 0.3s ease'
                }}
            >
                {loadingGenerate && (
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

                <Typography variant="h5" fontWeight={600} gutterBottom>
                    🧾 Generate & Edit Draft
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Select a draft type, generate content, and fine-tune the text before downloading or printing.
                </Typography>

                <Box mt={2}>
                    <DraftSelector
                        draftType={draftType}
                        setDraftType={setDraftType}
                        draftTypes={draftTypes}
                    />
                </Box>

                <Box mt={3}>
                    <Tooltip
                        title={showGenerateTooltip ? 'Please upload and parse the file first.' : ''}
                        arrow
                        disableHoverListener={!showGenerateTooltip}
                    >
                        <span>
                            <Button
                                variant="contained"
                                startIcon={<DescriptionIcon />}
                                onClick={generateDraft}
                                disabled={!isParsed || loadingGenerate}
                                sx={{ minWidth: 200 }}
                            >
                                {loadingGenerate ? (
                                    <>
                                        <CircularProgress size={20} sx={{ mr: 1 }} />
                                        Generating...
                                    </>
                                ) : (
                                    `Generate ${draftType}`
                                )}
                            </Button>
                        </span>
                    </Tooltip>
                </Box>

                <Box mt={4}>
                    {loadingDraft ? (
                        <Skeleton
                            variant="rectangular"
                            height={250}
                            animation="wave"
                            sx={{
                                borderRadius: 2,
                                backgroundColor: darkMode ? '#2f2f2f' : '#f0f0f0',
                                mb: 3
                            }}
                        />
                    ) : (
                        <ReactQuill
                            theme="snow"
                            value={draft}
                            onChange={setDraft}
                            style={{
                                backgroundColor: darkMode ? '#2b2b2b' : '#fff',
                                color: darkMode ? '#f5f5f5' : '#000',
                                minHeight: 250,
                                borderRadius: 8,
                                border: `1px solid ${darkMode ? '#444' : '#ccc'}`,
                                marginBottom: 24,
                                transition: 'all 0.3s ease'
                            }}
                        />
                    )}

                    <Box display="flex" justifyContent="flex-end" gap={2}>
                        <Button
                            variant="outlined"
                            startIcon={<PrintIcon />}
                            onClick={() => printHtmlDraft(draft, darkMode)}
                            disabled={!draft.trim()}
                        >
                            Print
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={<DownloadIcon />}
                            onClick={downloadElegantPDF}
                            disabled={loadingDraft || !draft.trim()}
                        >
                            {loadingDraft ? <CircularProgress size={20} /> : 'Download PDF'}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
})

export default DraftWorkflowSection
