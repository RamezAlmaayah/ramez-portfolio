import { Download } from 'lucide-react'
import { portfolio } from '../data/portfolio'

export function ResumeAction({ compact = false }: { compact?: boolean }) {
  return portfolio.cv ? (
    <a href={portfolio.cv} download className={compact ? 'resume-nav' : 'button button-outline'}>
      {compact ? 'Resume' : 'Download Resume'}
      <Download size={18} />
    </a>
  ) : (
    <button
      disabled
      className={compact ? 'resume-nav' : 'button button-outline'}
      title={`Resume unavailable. Required asset: ${portfolio.cvAsset}`}
      aria-label={compact ? 'Resume unavailable' : 'Download Resume — PDF not yet available'}
    >
      {compact ? 'Resume' : 'Download Resume'}
      <Download size={18} />
    </button>
  )
}
