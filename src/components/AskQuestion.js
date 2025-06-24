// components/AskQuestion.js
import React from 'react'
import { Box, TextField, Button } from '@mui/material'

const AskQuestion = ({ question, setQuestion, askCaseQuestion, loading }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      askCaseQuestion()
    }
  }

  return (
    <Box>
      <TextField
        label="Ask something about the case"
        fullWidth
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        variant="outlined"
        sx={{ mt: 1 }}
        onClick={askCaseQuestion}
        disabled={loading}
      >
        Ask
      </Button>
    </Box>
  )
}

export default AskQuestion
