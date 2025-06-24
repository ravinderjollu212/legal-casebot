import React from 'react'
import { List, ListItem, ListItemText, Divider, Box, Button, Alert, Typography } from '@mui/material'

const DraftHistoryList = ({
  history, answer, page, totalPages,
  onEdit, onDownload, onDelete,
  onPageChange
}) => {
  const itemsPerPage = 5
  const paginated = history.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <>
      <List dense>
        {paginated.map(item => (
          <div key={item.id}>
            <ListItem
              secondaryAction={
                <Box display="flex" gap={1}>
                  <Button size="small" onClick={() => onEdit(item.id)}>Edit</Button>
                  <Button size="small" onClick={() => onDownload(item.id, item.draftType)}>Download</Button>
                  <Button size="small" color="error" onClick={() => onDelete(item.id)}>Delete</Button>
                </Box>
              }
            >
              <ListItemText primary={item.draftType} secondary={new Date(item.createdAt).toLocaleString()} />
            </ListItem>
            <Divider />
          </div>
        ))}
        {!paginated.length && <ListItem><ListItemText primary="No drafts yet." /></ListItem>}
        {answer && <Alert severity="info" sx={{ my: 2 }}><strong>Answer:</strong> {answer}</Alert>}
      </List>

      <Box display="flex" justifyContent="center" mt={2} gap={2} pb={2}>
        <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>Previous</Button>
        <Typography variant="body2">Page {page} of {totalPages}</Typography>
        <Button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>Next</Button>
      </Box>
    </>
  )
}

export default DraftHistoryList
