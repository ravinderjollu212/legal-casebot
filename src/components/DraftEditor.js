import React, { useState } from 'react'
import { Box, Button, Typography, Paper, Divider } from '@mui/material'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import ClauseSuggestions from './ClauseSuggestions'
import { getClauseSuggestions } from '../services/apiService'


const DraftEditor = ({ value, setValue, loading, darkMode }) => {
  const [suggestions, setSuggestions] = useState([])

  const fetchSuggestions = async () => {
    try {
      const res = await getClauseSuggestions(value)
      setSuggestions(res?.data?.suggestions || [])
    } catch (err) {
      console.error('Failed to fetch clause suggestions', err)
    }
  }

  const insertSuggestion = (clauseText) => {
    setValue((prev) => prev + '\n\n' + clauseText)
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>✍️ Draft Editor</Typography>

      <Paper elevation={3} sx={{ p: 2 }}>
        <ReactQuill
          value={value}
          onChange={setValue}
          theme="snow"
          className={darkMode ? 'quill-dark' : ''}
        />

        <Box mt={2} display="flex" gap={2} flexWrap="wrap">
          <Button variant="contained" onClick={fetchSuggestions} disabled={loading}>
            {loading ? 'Analyzing...' : '💡 AI Clause Suggestions'}
          </Button>
        </Box>
      </Paper>

      {suggestions.length > 0 && (
        <>
          <Divider sx={{ my: 3 }} />
          <ClauseSuggestions clauses={suggestions} onInsert={insertSuggestion} />
        </>
      )}
    </Box>
  )
}

export default DraftEditor
