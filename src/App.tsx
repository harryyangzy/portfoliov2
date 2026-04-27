import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CommunityProjectsPage from './CommunityProjectsPage'
import MarketingCommunicationsPage from './MarketingCommunicationsPage'
import MarketingStushPage from './MarketingStushPage'
import ProductDesignPage from './ProductDesignPage'
import StushCaseStudyPage from './StushCaseStudyPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
      <Routes>
        <Route path="/" element={<ProductDesignPage />} />
        <Route path="/work/stush" element={<StushCaseStudyPage />} />
        <Route path="/community" element={<CommunityProjectsPage />} />
        <Route path="/marketing" element={<MarketingCommunicationsPage />} />
        <Route path="/marketing/stush" element={<MarketingStushPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
