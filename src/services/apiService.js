import axios from 'axios'
import { API_ENDPOINTS } from '../apiConfig'

export const getHistory = () => axios.get(API_ENDPOINTS.history)

export const getDraft = (id) => axios.get(API_ENDPOINTS.getDraftById(id))

export const deleteDraftById = (id) => axios.delete(API_ENDPOINTS.deleteDraft(id))

export const generateDraft = (draftType) =>
  axios.post(API_ENDPOINTS.generateDraft, { draftType })

export const downloadDraftPDF = (type, content) =>
  axios.post(
    `${API_ENDPOINTS.downloadPDF}?type=${encodeURIComponent(type)}`,
    { content },
    { responseType: 'blob' }
  )

export const uploadDocuments = (formData) =>
  axios.post(API_ENDPOINTS.uploadFile, formData)

export const askCaseQuestion = (question, history = []) =>
  axios.post(API_ENDPOINTS.ask, { question, history })

export const summarizeCase = () =>
  axios.post(API_ENDPOINTS.summarize)

export const detectLegalFlaws = () =>
  axios.post(API_ENDPOINTS.flaws)


export const getClauseSuggestions = (content) =>
  axios.post(API_ENDPOINTS.getClauseSuggestions, { content })
