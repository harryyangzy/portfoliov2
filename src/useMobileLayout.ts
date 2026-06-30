import { useEffect, useState } from 'react'

export const MOBILE_LAYOUT_BREAKPOINT_PX = 1100

export function useMobileLayout() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(`(max-width: ${MOBILE_LAYOUT_BREAKPOINT_PX}px)`).matches
      : true,
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_LAYOUT_BREAKPOINT_PX}px)`)
    const onChange = () => setIsMobile(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
