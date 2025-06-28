import { forwardRef } from 'react'
import {
  Box,
  Typography,
  Button,
  Paper,
  CircularProgress,
  Skeleton
} from '@mui/material'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { printHtmlDraft } from '../utils/ocrUtils'

const DraftOutput = forwardRef(
  ({ draftType, draft, setDraft, downloadElegantPDF, loading, darkMode }, ref) => {
    return (
      <Box ref={ref} mt={5}>
        <Typography variant="h5" gutterBottom>
          📄 {draftType} Output
        </Typography>

        <Paper
          elevation={4}
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: darkMode ? '#1e1e1e' : '#fdfdfd',
            border: '1px solid',
            borderColor: darkMode ? '#333' : '#ddd'
          }}
        >
          {loading ? (
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
            <Button variant="outlined" onClick={() => printHtmlDraft(draft, darkMode)} disabled={!draft.trim()}>
              🖨️ Print
            </Button>

            <Button
              variant="contained"
              onClick={downloadElegantPDF}
              disabled={loading || !draft.trim()}
            >
              {loading ? <CircularProgress size={20} /> : '⬇️ Download PDF'}
            </Button>
          </Box>
        </Paper>
      </Box>
    )
  }
)

export default DraftOutput
