import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CommunityProjectsPage from './CommunityProjectsPage'
import MarketingCommunicationsPage from './MarketingCommunicationsPage'
import MarketingStushPage from './MarketingStushPage'
import MarketingYeeHongPage from './MarketingYeeHongPage'
import MarketingTsacPage from './MarketingTsacPage'
import MarketingCsaPage from './MarketingCsaPage'
import MarketingOtherPage from './MarketingOtherPage'
import ProductDesignPage from './ProductDesignPage'
import StushCaseStudyPage from './StushCaseStudyPage'
import CoeurCaseStudyPage from './CoeurCaseStudyPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
      <Routes>
        <Route path="/" element={<ProductDesignPage />} />
        <Route path="/work/stush" element={<StushCaseStudyPage />} />
        <Route path="/work/coeur" element={<CoeurCaseStudyPage />} />
        <Route path="/community" element={<CommunityProjectsPage />} />
        <Route path="/marketing" element={<MarketingCommunicationsPage />} />
        <Route path="/marketing/stush" element={<MarketingStushPage />} />
        <Route path="/marketing/yee-hong" element={<MarketingYeeHongPage />} />
        <Route path="/marketing/tsac" element={<MarketingTsacPage />} />
        <Route path="/marketing/csa" element={<MarketingCsaPage />} />
        <Route path="/marketing/other" element={<MarketingOtherPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
