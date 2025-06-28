import { forwardRef } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  LinearProgress,
  Divider,
  Skeleton,
  CircularProgress
} from '@mui/material'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import DraftSelector from './DraftSelector'
import { printHtmlDraft } from '../utils/ocrUtils'

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
  return (
    <Box ref={ref}>
      <Divider sx={{ mb: 4 }} />

      <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, position: 'relative' }}>
        {loadingGenerate && (
          <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, width: '100%' }} />
        )}

        <Typography variant="h6" gutterBottom>🧾 Generate & Edit Draft</Typography>

        <Box mt={2}>
          <DraftSelector
            draftType={draftType}
            setDraftType={setDraftType}
            draftTypes={draftTypes}
          />
        </Box>

        <Box mt={3}>
          <Button
            variant="contained"
            onClick={generateDraft}
            disabled={!isParsed || loadingGenerate}
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
        </Box>

        <Box mt={4}>
          {loadingDraft ? (
            <Skeleton
              variant="rectangular"
              height={250}
              animation="wave"
              sx={{
                borderRadius: 1,
                backgroundColor: darkMode ? '#333' : '#eee',
                mb: 2
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
                minHeight: 250
              }}
            />
          )}

          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button
              variant="outlined"
              onClick={() => printHtmlDraft(draft, darkMode)}
              disabled={!draft.trim()}
            >
              🖨️ Print
            </Button>

            <Button
              variant="contained"
              onClick={downloadElegantPDF}
              disabled={loadingDraft || !draft.trim()}
            >
              {loadingDraft ? <CircularProgress size={20} /> : '⬇️ Download PDF'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
})

export default DraftWorkflowSection
