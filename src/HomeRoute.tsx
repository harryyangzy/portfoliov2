import { useLocation } from 'react-router-dom'
import ProductDesignPage from './ProductDesignPage'
import { isStudioHomePath } from './personalizedGreeting'
import StudioHomePage from './StudioHomePage'
import { useMobileLayout } from './useMobileLayout'

/**
 * Studio landing: mobile nav-only home (with optional personalized copy).
 * Desktop: design engineering canvas for `/` and `/name-company` URLs.
 */
export default function HomeRoute() {
  const { pathname } = useLocation()
  const isMobile = useMobileLayout()
  const showDesignEngineering = !isMobile && isStudioHomePath(pathname)

  return showDesignEngineering ? <ProductDesignPage /> : <StudioHomePage />
}
