/**
 * Pixel assets pulled from Figma node 2302:2301 via MCP (same sources as Dev Mode).
 * Folder `figma/` holds PNGs used on the page.
 */
import hero from './figma/figma-39-hero.png'
/** VP9 hero with alpha (transparent bg) — Chrome/Firefox */
import heroVideo from '../stush assets/figma-50-design-system.webm'
/** HEVC (hvc1) hero with alpha — Safari, which can't play VP9 alpha */
import heroVideoHevc from '../stush assets/figma-50-design-system-alpha.mp4'
/** Still from `stush assets` — poster + Safari / no-WebM fallback (matches design-system webm) */
import heroVideoPreview from '../stush assets/pattiesmadebetter0.png'
import problemSite from './figma/figma-48-problem.png'
import solutionFood from './figma/figma-49-solution.png'
import auditBento from './figma/stush_bento.png'
import painUi1 from './figma/figma-screencap-1.png'
import painUi2 from './figma/figma-screencap-2.png'
import wireLofi3 from './figma/figma-lofi-3.png'
import wireLofi2 from './figma/figma-lofi-2.png'
import designSystemWide from './figma/figma-50-design-system.png'
import outcomeTallRight from './figma/figma-51-outcome-r.png'
import outcomeTallLeft from './figma/figma-52-outcome-l.png'

export const stushMedia = {
  hero,
  /** PNG poster + static fallback when `heroVideo` (WebM) cannot play (e.g. Safari) */
  heroVideoPreview,
  heroVideo,
  heroVideoHevc,
  problemSite,
  solutionFood,
  /** Initial observation — single bento layout image */
  auditBento,
  painUi1,
  painUi2,
  wireLofi3,
  wireLofi2,
  designSystemWide,
  outcomeTallRight,
  outcomeTallLeft,
} as const
