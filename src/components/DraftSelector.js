import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const DraftSelector = ({ draftType, setDraftType, draftTypes }) => (
  <Box mt={3}>
    <FormControl fullWidth>
      <InputLabel>Draft Type</InputLabel>
      <Select
        value={draftType}
        label="Draft Type"
        onChange={(e) => setDraftType(e.target.value)}
      >
        {draftTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Box>
)

export default DraftSelector
