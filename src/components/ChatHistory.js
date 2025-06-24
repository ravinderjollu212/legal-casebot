// components/ChatHistory.js
import React from 'react'
import { Box, Typography } from '@mui/material'

const ChatHistory = ({ chatHistory }) => (
  <Box
    sx={{
      background: '#f0f0f0',
      padding: 2,
      borderRadius: 1,
      maxHeight: 300,
      overflowY: 'auto',
      mb: 2,
    }}
  >
    {chatHistory.map((msg, idx) => (
      <Typography
        key={idx}
        sx={{
          color: msg.role === 'user' ? '#000' : 'green',
          fontWeight: msg.role === 'user' ? 'bold' : 'normal',
          mb: 1,
          whiteSpace: 'pre-wrap',
        }}
      >
        {msg.role === 'user' ? '👤 You:' : '🤖 Bot:'} {msg.content}
      </Typography>
    ))}
  </Box>
)

export default ChatHistory
