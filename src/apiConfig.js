export const API_BASE = process.env.REACT_APP_API_BASE

export const API_ENDPOINTS = {
  history: `${API_BASE}/history`,
  deleteDraft: (id) => `${API_BASE}/history/${id}`,
  generateDraft: `${API_BASE}/generate`,
  downloadPDF: `${API_BASE}/download`,
  uploadFile: `${API_BASE}/upload`,
  getDraftById: (id) => `${API_BASE}/draft/${id}`,
  getDraftsByType: (type) => `${API_BASE}/drafts/${type}`,
  ask: `${API_BASE}/ask`,
  summarize: `${API_BASE}/summarize`,
  flaws: `${API_BASE}/flaws`,
  getClauseSuggestions: `${API_BASE}/suggest-clauses`,
}

