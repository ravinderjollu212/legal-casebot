import { Box, Typography, TextField, Button, Paper } from '@mui/material'

const ChatAssistant = ({ chatHistory, question, setQuestion, askCaseQuestion, loading, darkMode }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!loading && question.trim()) {
        askCaseQuestion()
      }
    }
  }

  return (
    <Box mt={6}>
      <Typography variant="h5" gutterBottom>💬 Case Assistant</Typography>

      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
          <TextField
            label="Ask a question"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            multiline
            minRows={1}
            maxRows={4}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={askCaseQuestion}
            disabled={loading || !question.trim()}
          >
            Ask
          </Button>
        </Box>

        {chatHistory.length > 0 && (
          <Box mt={3}>
            <Typography variant="subtitle1" gutterBottom sx={{ color: darkMode ? '#ddd' : undefined }}>
              🧠 AI Responses:
            </Typography>
            <Box
              sx={{
                maxHeight: 300,
                overflowY: 'auto',
                p: 2,
                backgroundColor: darkMode ? '#2a2a2a' : '#f9f9f9',
                color: darkMode ? '#eee' : '#000',
                borderRadius: 1,
                border: '1px solid',
                borderColor: darkMode ? '#444' : '#ddd',
                fontSize: 14
              }}
            >
              {chatHistory.map((msg, idx) => (
                <Box key={idx} mb={2}>
                  <Typography fontWeight="bold" color={msg.role === 'user' ? 'primary' : 'secondary'}>
                    {msg.role === 'user' ? '👤 You:' : '🤖 AI:'}
                  </Typography>
                  <Typography whiteSpace="pre-wrap">{msg.content}</Typography>
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
