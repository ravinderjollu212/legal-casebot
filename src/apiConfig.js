const API_BASE = process.env.REACT_APP_API_BASE

export const API_ENDPOINTS = {
  uploadFile: `${API_BASE}/upload`,
  generateDraft: `${API_BASE}/generate`,
  downloadPDF: `${API_BASE}/download`,
  ask: `${API_BASE}/ask`,
  summarize: `${API_BASE}/summarize`,
  flaws: `${API_BASE}/flaws`,
  history: `${API_BASE}/history`,
  getDraftById: (id) => `${API_BASE}/history/${id}`,
  deleteDraft: (id) => `${API_BASE}/history/${id}`,
  getClauseSuggestions: `${API_BASE}/suggest-clauses`
}

