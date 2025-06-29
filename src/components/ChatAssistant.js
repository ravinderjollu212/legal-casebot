import { useState, useRef } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Tooltip
} from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'
import StopIcon from '@mui/icons-material/Stop'

const ChatAssistant = ({
  chatHistory,
  question,
  setQuestion,
  askCaseQuestion,
  loading,
  darkMode
}) => {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!loading && question.trim()) askCaseQuestion()
    }
  }

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.')
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.lang = 'en-IN'
    recognition.interimResults = false
    recognition.continuous = false

    recognition.onstart = () => setIsListening(true)

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setQuestion(prev => (prev ? `${prev} ${transcript}` : transcript))
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
    }

    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopListening = () => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }

  return (
    <Box mt={6}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        💬 Case Assistant
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 4,
          bgcolor: theme => darkMode ? '#1e1e1e' : '#fafafa',
          border: '1px solid',
          borderColor: theme => darkMode ? '#444' : '#ddd'
        }}
      >
        <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
          <TextField
            label="Ask a legal question"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            multiline
            minRows={1}
            maxRows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: darkMode ? '#2c2c2c' : '#fff'
              }
            }}
          />

          <Box display="flex" alignItems="center" gap={1} flexShrink={0}>
            <Button
              variant="contained"
              color="secondary"
              onClick={askCaseQuestion}
              disabled={loading || !question.trim()}
              sx={{ minWidth: 100 }}
            >
              Ask
            </Button>
            <Tooltip title={isListening ? 'Stop Listening' : 'Start Voice Input'}>
              <IconButton
                onClick={isListening ? stopListening : startListening}
                color={isListening ? 'error' : 'primary'}
              >
                {isListening ? <StopIcon /> : <MicIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {chatHistory.length > 0 && (
          <Box mt={4}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              gutterBottom
              sx={{ color: darkMode ? '#ccc' : '#444' }}
            >
              🧠 AI Conversation
            </Typography>

            <Box
              sx={{
                maxHeight: 320,
                overflowY: 'auto',
                p: 2,
                backgroundColor: darkMode ? '#2a2a2a' : '#f4f4f4',
                borderRadius: 2,
                border: '1px solid',
                borderColor: darkMode ? '#444' : '#ccc',
                fontSize: 14
              }}
            >
              {chatHistory.map((msg, idx) => (
                <Box key={idx} mb={2}>
                  <Typography
                    fontWeight="bold"
                    color={msg.role === 'user' ? 'primary' : 'secondary'}
                    gutterBottom
                  >
                    {msg.role === 'user' ? '👤 You:' : '🤖 AI:'}
                  </Typography>
                  <Typography whiteSpace="pre-wrap">
                    {msg.content}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default ChatAssistant
