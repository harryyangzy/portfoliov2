import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initAnalytics, trackRoute } from './analytics'

export default function AnalyticsListener() {
  const { pathname } = useLocation()

  useEffect(() => {
    initAnalytics()
  }, [])

  useEffect(() => {
    trackRoute(pathname)
  }, [pathname])

  return null
}
