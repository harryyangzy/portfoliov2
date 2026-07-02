/**
 * Coeur / QUX case study — Figma 2378:5130 + local assets (`coeur/`).
 */
import hero from './feature1.png'
import heroPoster from './vid preview0.png'
/** VP9 hero with alpha (transparent bg) — Chrome/Firefox */
import heroVideo from './demovid-hero.webm'
/** HEVC (hvc1) hero with alpha — Safari, which can't play VP9 alpha */
import heroVideoHevc from './demovid-hero-alpha.mp4'
import heroAnimationWebp from './Scene-1 (1).webp'
/** Capture-flow demo re-encoded as video (fixes Safari animated-WebP black background) */
import captureFlowMp4 from './capture-flow.mp4'
import captureFlowWebm from './capture-flow.webm'
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
  heroVideoHevc,
  heroAnimationWebp,
  userResearch,
  competitive,
  designSystemWide,
  /** Flow IA band — same asset as Figma (screenshot of flows) */
  flowGraphic,
  inspirationGrid,
  featureReminders,
  /** Right feature column animated preview */
  featureCaptureWebp: heroAnimationWebp,
  /** Video sources for the capture-flow preview (MP4 first for Safari) */
  captureFlowMp4,
  captureFlowWebm,
  outroSharingVideo,
} as const
