/**
 * Coeur / QUX case study — Figma 2378:5130 + local assets (`coeur/`).
 */
import hero from './feature1.png'
import heroPoster from './vid preview0.png'
import heroVideo from './demovid-hero.webm'
import heroVideoMp4 from './Scene-1 (1).mp4'
import userResearch from './image48.png'
import competitive from './image49.png'
import designSystemWide from './image50.png'
/** User journey / flow diagram */
import flowGraphic from './flow.png'
import inspirationGrid from './inspogrid.png'
import featureReminders from './feature1.png'
import outroSharingVideo from './sharingdemo.mp4'

export const coeurMedia = {
  /** Hero still (fallback + reference aspect) */
  hero,
  poster: heroPoster,
  heroVideo,
  heroVideoMp4,
  userResearch,
  competitive,
  designSystemWide,
  /** Flow IA band — same asset as Figma (screenshot of flows) */
  flowGraphic,
  inspirationGrid,
  featureReminders,
  /** Right feature column — Figma embeds Scene-1 (1).mp4 (same file as hero MP4) */
  featureCaptureMp4: heroVideoMp4,
  outroSharingVideo,
} as const
