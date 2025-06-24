import { AppBar, Toolbar, Typography, Switch, Box } from '@mui/material'

const HeaderBar = ({ darkMode, toggleDarkMode }) => (
  <AppBar position="static" color="transparent" elevation={0}>
    <Toolbar sx={{ justifyContent: 'center', gap: 4 }}>
      <Typography variant="h6" textAlign="center">
        ⚖️ AI Legal CaseBot
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2">🌞</Typography>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
        <Typography variant="body2">🌙</Typography>
      </Box>
    </Toolbar>
  </AppBar>
)

export default HeaderBar
