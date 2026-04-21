/**
 * Design Engineering toolbar — Figma exports from
 * `src/assets/design-engineering/toolbar icons/`
 *
 * Naming: Property 1={default|hover|active}[-1..-4].png for the five flyout tools;
 * Variant2/3 (+ -1) for Text / Search.
 */
import active0 from './toolbar icons/Property 1=active.png'
import active1 from './toolbar icons/Property 1=active-1.png'
import active2 from './toolbar icons/Property 1=active-2.png'
import active3 from './toolbar icons/Property 1=active-3.png'
import active4 from './toolbar icons/Property 1=active-4.png'
import default0 from './toolbar icons/Property 1=default.png'
import default1 from './toolbar icons/Property 1=default-1.png'
import default2 from './toolbar icons/Property 1=default-2.png'
import default3 from './toolbar icons/Property 1=default-3.png'
import default4 from './toolbar icons/Property 1=default-4.png'
import hover0 from './toolbar icons/Property 1=hover.png'
import hover1 from './toolbar icons/Property 1=hover-1.png'
import hover2 from './toolbar icons/Property 1=hover-2.png'
import hover3 from './toolbar icons/Property 1=hover-3.png'
import hover4 from './toolbar icons/Property 1=hover-4.png'
import textDefault from './toolbar icons/Property 1=Variant2.png'
import textHover from './toolbar icons/Property 1=Variant2-1.png'
import searchDefault from './toolbar icons/Property 1=Variant3.png'
import searchHover from './toolbar icons/Property 1=Variant3-1.png'

/** Pointer → Comment (order matches Figma toolbar). */
export const designEngineeringChevronToolIcons = [
  { default: default0, hover: hover0, active: active0 },
  { default: default1, hover: hover1, active: active1 },
  { default: default2, hover: hover2, active: active2 },
  { default: default3, hover: hover3, active: active3 },
  { default: default4, hover: hover4, active: active4 },
] as const

export const designEngineeringSoloToolIcons = {
  text: { default: textDefault, hover: textHover },
  search: { default: searchDefault, hover: searchHover },
} as const

export type ToolbarIconTrio = { default: string; hover: string; active: string }
export type ToolbarIconDuo = { default: string; hover: string }
