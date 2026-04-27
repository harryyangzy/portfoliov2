import commentActive from './toolbar icons/comment active.png'
import commentDefault from './toolbar icons/comment default.png'
import commentHover from './toolbar icons/comment hover.png'
import frameActive from './toolbar icons/frame active.png'
import frameHover from './toolbar icons/frame hover.png'
import penActive from './toolbar icons/pen active.png'
import penDefault from './toolbar icons/pen default.png'
import penHover from './toolbar icons/pen hover.png'
import pointerActive from './toolbar icons/pointer active.png'
import pointerHover from './toolbar icons/pointer hover.png'
import searchActive from './toolbar icons/search active.png'
import searchDefault from './toolbar icons/search default.png'
import searchHover from './toolbar icons/search hover.png'
import stickActive from './toolbar icons/stick active.png'
import stickDefault from './toolbar icons/stick default.png'
import stickHover from './toolbar icons/stick hover.png'
import textActive from './toolbar icons/text active.png'
import textDefault from './toolbar icons/text default.png'
import textHover from './toolbar icons/text hover.png'

/** default / hover / active — all states from assets. Flyout tools are 111×84 (chevron in-image). */
export type ToolbarIconTrio = {
  default: string
  hover: string
  active: string
}

// Figma has no separate idle asset for pointer/frame; `hover` doubles as rest.
const pointer: ToolbarIconTrio = {
  default: pointerHover,
  hover: pointerHover,
  active: pointerActive,
}
const frame: ToolbarIconTrio = {
  default: frameHover,
  hover: frameHover,
  active: frameActive,
}

/** Pointer → Comment. `line` uses stick. */
export const designEngineeringChevronToolIcons = [
  pointer,
  frame,
  { default: stickDefault, hover: stickHover, active: stickActive },
  { default: penDefault, hover: penHover, active: penActive },
  { default: commentDefault, hover: commentHover, active: commentActive },
] as const

export const designEngineeringSoloToolIcons = {
  text: { default: textDefault, hover: textHover, active: textActive } satisfies ToolbarIconTrio,
  search: { default: searchDefault, hover: searchHover, active: searchActive } satisfies ToolbarIconTrio,
} as const
