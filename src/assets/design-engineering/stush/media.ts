/**
 * Pixel assets pulled from Figma node 2302:2301 via MCP (same sources as Dev Mode).
 * Folder `figma/` holds the downloaded PNGs so the page matches the file.
 */
import hero from './figma/figma-39-hero.png'
import heroVideo from '../stush assets/figma-50-design-system.webm'
import problemSite from './figma/figma-48-problem.png'
import solutionFood from './figma/figma-49-solution.png'
import audit14543 from './figma/figma-audit-14543.png'
import audit14559 from './figma/figma-audit-14559.png'
import audit14821 from './figma/figma-audit-14821.png'
import audit14658 from './figma/figma-audit-14658.png'
import auditAaGlyph from './figma/figma-aa-glyph.png'
import painUi1 from './figma/figma-screencap-1.png'
import painUi2 from './figma/figma-screencap-2.png'
import wireLofi3 from './figma/figma-lofi-3.png'
import wireLofi2 from './figma/figma-lofi-2.png'
import designSystemWide from './figma/figma-50-design-system.png'
import outcomeTallRight from './figma/figma-51-outcome-r.png'
import outcomeTallLeft from './figma/figma-52-outcome-l.png'

export const stushMedia = {
  hero,
  heroVideo,
  problemSite,
  solutionFood,
  audit14543,
  audit14559,
  /** Base image for the “Aa” tile (Figma: Screenshot 1.48.21) */
  audit14821,
  audit14658,
  /** Small “Aa” layer overlaid on audit14821 */
  auditAaGlyph,
  painUi1,
  painUi2,
  wireLofi3,
  wireLofi2,
  designSystemWide,
  outcomeTallRight,
  outcomeTallLeft,
} as const
