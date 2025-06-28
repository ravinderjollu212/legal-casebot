import { useState, useEffect, useCallback, useRef } from 'react'
import {
  Typography,
  Container,
  IconButton,
  Box,
  Button,
  useTheme,
  Paper
} from '@mui/material'
import * as pdfjsLib from 'pdfjs-dist'
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry'
import CloseIcon from '@mui/icons-material/Close'
import { useSnackbar } from 'notistack'

import HeaderBar from './components/HeaderBar'
import UploadSection from './components/UploadSection'
import DraftWorkflowSection from './components/DraftWorkflowSection'
import SummarySection from './components/SummarySection'
import ChatAssistant from './components/ChatAssistant'
import DraftHistoryList from './components/DraftHistoryList'

import * as api from './services/apiService'
import { convertToHtml } from './utils/textUtils'
import { getCombinedFileText } from './utils/ocrUtils'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker

const draftTypes = [
  'Quash Petition',
  'Bail Application',
  'Discharge Application',
  'Case Summary'
]

const App = ({ darkMode, setDarkMode }) => {
  const theme = useTheme()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const [files, setFiles] = useState([])
  const [combinedPreview, setCombinedPreview] = useState('')
  const [draft, setDraft] = useState('')
  const [draftType, setDraftType] = useState(() => localStorage.getItem('draftType') || draftTypes[0])
  const [isParsed, setIsParsed] = useState(false)

  const [loadingDraft, setLoadingDraft] = useState(false)
  const [loadingSummary, setLoadingSummary] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [loadingGenerate, setLoadingGenerate] = useState(false)

  const [question, setQuestion] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  const [summary, setSummary] = useState('')
  const [flaws, setFlaws] = useState('')

  const [history, setHistory] = useState([])
  const [page, setPage] = useState(1)
  const [sortDesc, setSortDesc] = useState(true)

  const draftRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    localStorage.setItem('draftType', draftType)
  }, [draftType])

  const showMessage = useCallback((type, message) => {
    enqueueSnackbar(message, {
      variant: type,
      action: key => (
        <IconButton onClick={() => closeSnackbar(key)} color="inherit">
          <CloseIcon fontSize="small" />
        </IconButton>
      )
    })
  }, [enqueueSnackbar, closeSnackbar])

  const handleAxiosError = useCallback((err, fallback = '❌ Something went wrong.') => {
    const msg = err.response?.data?.error || err.message || fallback
    showMessage('error', msg)
    console.error('[Backend Error]', msg)
  }, [showMessage])

  const fetchHistory = useCallback(async () => {
    try {
      const res = await api.getHistory()
      const sorted = [...res.data.history].sort((a, b) =>
        sortDesc
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      )
      setHistory(sorted)
      setPage(1)
    } catch {
      console.warn('⚠️ Failed to fetch draft history.')
    }
  }, [sortDesc])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  const handleFileChange = async selectedFiles => {
    const filesArray = Array.from(selectedFiles)
    setFiles(filesArray)
    setIsParsed(false)
    setDraft('')
    showMessage('info', `📎 ${filesArray.length} file(s) selected.`)

    try {
      setLoadingUpload(true)
      const combinedText = await getCombinedFileText(filesArray, showMessage)
      setCombinedPreview(combinedText)
    } catch (err) {
      handleAxiosError(err)
    } finally {
      setLoadingUpload(false)
    }
  }

  const uploadFile = async () => {
    if (!files.length) return showMessage('error', '📎 No files selected.')

    const formData = new FormData()
    files.forEach(file => formData.append('documents', file))

    try {
      setLoadingUpload(true)
      await api.uploadDocuments(formData)
      setIsParsed(true)
      showMessage('success', '✅ Files uploaded and parsed.')
    } catch (err) {
      handleAxiosError(err)
    } finally {
      setLoadingUpload(false)
    }
  }

  const generateDraft = async () => {
    if (!isParsed) return showMessage('error', '📄 Upload and parse the file first.')

    try {
      setLoadingGenerate(true)
      const res = await api.generateDraft(draftType)
      setDraft(convertToHtml(res.data.draft))
      await fetchHistory()
    } catch (err) {
      handleAxiosError(err)
      setDraft('⚠️ Draft generation failed.')
    } finally {
      setLoadingGenerate(false)
    }
  }

  const askCaseQuestion = async () => {
    if (!question.trim()) return showMessage('error', '❓ Please enter a question.')

    try {
      setLoadingChat(true)
      const res = await api.askCaseQuestion(question, chatHistory)
      const answer = res.data.answer
      setChatHistory(prev => [...prev, { role: 'user', content: question }, { role: 'assistant', content: answer }])
      setQuestion('')
    } catch (err) {
      handleAxiosError(err)
    } finally {
      setLoadingChat(false)
    }
  }

  const summarizeCase = async () => {
    try {
      setLoadingSummary(true)
      const res = await api.summarizeCase()
      setSummary(res.data.summary)
      showMessage('success', '📝 Case summarized.')
    } catch (err) {
      handleAxiosError(err)
    } finally {
      setLoadingSummary(false)
    }
  }

  const detectFlaws = async () => {
    try {
      setLoadingSummary(true)
      const res = await api.detectLegalFlaws()
      setFlaws(res.data.flaws)
      showMessage('info', '🔍 Flaws detected.')
    } catch (err) {
      handleAxiosError(err)
    } finally {
      setLoadingSummary(false)
    }
  }

  const downloadElegantPDF = async () => {
    if (!draft.trim()) return showMessage('error', '❗ Draft is empty.')

    try {
      const res = await api.downloadDraftPDF(draftType, draft)
      const blob = new Blob([res.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${draftType.replace(/\s+/g, '_')}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      handleAxiosError(err)
    }
  }

  const deleteDraft = useCallback(async id => {
    try {
      await api.deleteDraftById(id)
      showMessage('success', '🗑️ Draft deleted.')
      await fetchHistory()
    } catch (err) {
      handleAxiosError(err)
    }
  }, [fetchHistory, handleAxiosError, showMessage])

  const loadDraftFromHistory = useCallback(async id => {
    try {
      setLoadingDraft(true)
      const res = await api.getDraft(id)
      setDraft(res.data.draft)
      setDraftType(res.data.draftType)
      showMessage('info', '🕘 Draft loaded from history.')
    } catch (err) {
      handleAxiosError(err)
    } finally {
      setLoadingDraft(false)
    }
  }, [handleAxiosError, showMessage])

  const downloadFromHistory = useCallback(async (id, type) => {
    try {
      const res = await api.getDraft(id)
      const pdfRes = await api.downloadDraftPDF(type, res.data.draft)
      const blob = new Blob([pdfRes.data], { type: 'application/pdf' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${type.replace(/\s+/g, '_')}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err) {
      handleAxiosError(err)
    }
  }, [handleAxiosError])

  return (
    <>
      <HeaderBar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      <Container maxWidth="md" sx={{ mt: 4, mb: 10 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, bgcolor: theme.palette.background.paper }}>
          <UploadSection
            loadingUpload={loadingUpload}
            loadingGenerate={loadingGenerate}
            handleFileChange={handleFileChange}
            uploadFile={uploadFile}
            draftType={draftType}
            setDraftType={setDraftType}
            draftTypes={draftTypes}
            combinedPreview={combinedPreview}
            generateDraft={generateDraft}
            isParsed={isParsed}
            files={files}
          />
        </Paper>

        <DraftWorkflowSection
          loadingUpload={loadingUpload}
          loadingGenerate={loadingGenerate}
          loadingDraft={loadingDraft}
          handleFileChange={handleFileChange}
          uploadFile={uploadFile}
          files={files}
          combinedPreview={combinedPreview}
          draftType={draftType}
          setDraftType={setDraftType}
          draftTypes={draftTypes}
          generateDraft={generateDraft}
          isParsed={isParsed}
          draft={draft}
          setDraft={setDraft}
          downloadElegantPDF={downloadElegantPDF}
          darkMode={darkMode}
          ref={draftRef}
        />

        <SummarySection
          isParsed={isParsed}
          loading={loadingSummary}
          summarizeCase={summarizeCase}
          summary={summary}
          detectFlaws={detectFlaws}
          flaws={flaws}
          darkMode={darkMode}
        />

        <ChatAssistant
          chatHistory={chatHistory}
          question={question}
          setQuestion={setQuestion}
          askCaseQuestion={askCaseQuestion}
          loading={loadingChat}
          darkMode={darkMode}
        />

        <Box mt={6}>
          <Typography variant="h6" gutterBottom>📚 Saved Draft History</Typography>
          <Button size="small" onClick={() => setSortDesc(prev => !prev)} sx={{ mb: 2 }}>
            Sort: {sortDesc ? 'Newest First 🔽' : 'Oldest First 🔼'}
          </Button>

          <DraftHistoryList
            history={history}
            page={page}
            totalPages={Math.ceil(history.length / 5)}
            onEdit={loadDraftFromHistory}
            onDownload={downloadFromHistory}
            onDelete={deleteDraft}
            onPageChange={setPage}
          />
        </Box>
      </Container>
    </>
  )
}

export default App
