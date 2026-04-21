import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CommunityProjectsPage from './CommunityProjectsPage'
import MarketingCommunicationsPage from './MarketingCommunicationsPage'
import ProductDesignPage from './ProductDesignPage'

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
      <Routes>
        <Route path="/" element={<ProductDesignPage />} />
        <Route path="/community" element={<CommunityProjectsPage />} />
        <Route path="/marketing" element={<MarketingCommunicationsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
