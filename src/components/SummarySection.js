import React from 'react'
import CaseSummary from './CaseSummary'
import LegalFlaws from './LegalFlaws'

const SummarySection = ({ isParsed, loading, summarizeCase, summary, detectFlaws, flaws, darkMode }) => (
  <>
    <CaseSummary isParsed={isParsed} loading={loading} summarizeCase={summarizeCase} summary={summary} darkMode={darkMode} />
    <LegalFlaws detectFlaws={detectFlaws} loading={loading} flaws={flaws} />
  </>
)

export default SummarySection
