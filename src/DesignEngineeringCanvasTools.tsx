import { useCallback, useEffect, useId, useRef, useState, type CSSProperties } from 'react'

export type CanvasToolId =
  | 'pointer'
  | 'frame'
  | 'line'
  | 'pen'
  | 'comment'
  | 'text'
  | 'search'

type Point = { x: number; y: number }

type CanvasComment = {
  id: string
  x: number
  y: number
  text: string
  author: string
  createdAt: number
}

type InkStroke = {
  id: string
  points: Point[]
}

type CanvasFrame = {
  id: string
  x: number
  y: number
  width: number
  height: number
}

type FrameDraft = {
  start: Point
  current: Point
}

const COMMENTS_STORAGE_KEY = 'hy-de-canvas-comments-v3'
const FRAMES_STORAGE_KEY = 'hy-de-canvas-frames-v3'
const LEGACY_STORAGE_KEYS = [
  'hy-de-canvas-comments',
  'hy-de-canvas-frames',
  'hy-de-canvas-comments-v2',
  'hy-de-canvas-frames-v2',
] as const
const GUEST_NAME_KEY = 'hy-de-canvas-pizza-ingredient'
const INK_COLOR = 'rgba(13, 153, 255, 0.72)'
const INK_WIDTH = 3.5
const FRAME_MIN_SIZE = 6

const GUEST_NAMES = [
  'Tomato Sauce',
  'Olive Oil',
  '00 Flour',
  'Fresh Yeast',
  'Garlic',
  'Oregano',
  'Parmesan',
  'Mozzarella',
  'Basil',
  'Chili Flakes',
  'Sea Salt',
  'Anchovy',
] as const

function clearLegacyCanvasStorage() {
  try {
    for (const key of LEGACY_STORAGE_KEYS) {
      sessionStorage.removeItem(key)
    }
  } catch {
    /* ignore */
  }
}

clearLegacyCanvasStorage()

function loadComments(): CanvasComment[] {
  try {
    const raw = sessionStorage.getItem(COMMENTS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CanvasComment[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveComments(comments: CanvasComment[]) {
  try {
    sessionStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments))
  } catch {
    /* ignore quota */
  }
}

function loadFrames(): CanvasFrame[] {
  try {
    const raw = sessionStorage.getItem(FRAMES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CanvasFrame[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveFrames(frames: CanvasFrame[]) {
  try {
    sessionStorage.setItem(FRAMES_STORAGE_KEY, JSON.stringify(frames))
  } catch {
    /* ignore quota */
  }
}

function getGuestName() {
  try {
    const stored = sessionStorage.getItem(GUEST_NAME_KEY)
    if (stored) return stored
    const name = GUEST_NAMES[Math.floor(Math.random() * GUEST_NAMES.length)]!
    sessionStorage.setItem(GUEST_NAME_KEY, name)
    return name
  } catch {
    return 'Guest'
  }
}

function createId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0]!.slice(0, 1).toUpperCase()
  return `${parts[0]!.slice(0, 1)}${parts[1]!.slice(0, 1)}`.toUpperCase()
}

function avatarHue(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) % 360
  return hash
}

function rectFromPoints(start: Point, end: Point) {
  const x = Math.min(start.x, end.x)
  const y = Math.min(start.y, end.y)
  return {
    x,
    y,
    width: Math.abs(end.x - start.x),
    height: Math.abs(end.y - start.y),
  }
}

function pointsToPath(points: Point[]) {
  if (points.length === 0) return ''
  if (points.length === 1) {
    const p = points[0]!
    return `M ${p.x} ${p.y} L ${p.x + 0.01} ${p.y + 0.01}`
  }

  let d = `M ${points[0]!.x} ${points[0]!.y}`
  for (let i = 1; i < points.length - 1; i += 1) {
    const current = points[i]!
    const next = points[i + 1]!
    const midX = (current.x + next.x) / 2
    const midY = (current.y + next.y) / 2
    d += ` Q ${current.x} ${current.y} ${midX} ${midY}`
  }
  const last = points[points.length - 1]!
  d += ` L ${last.x} ${last.y}`
  return d
}

function formatCommentTime(timestamp: number) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(timestamp)
}

function CommentPin({
  comment,
  index,
  onOpen,
}: {
  comment: CanvasComment
  index: number
  onOpen: (id: string) => void
}) {
  const label = comment.text.trim() ? initialsFromName(comment.author) : String(index + 1)

  return (
    <button
      type="button"
      className="pd-canvas-comment-pin"
      style={
        {
          left: comment.x,
          top: comment.y,
          '--pd-comment-hue': avatarHue(comment.id),
        } as CSSProperties
      }
      aria-label={`Comment by ${comment.author}`}
      onClick={(event) => {
        event.stopPropagation()
        onOpen(comment.id)
      }}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <span className="pd-canvas-comment-pin__glyph" aria-hidden>
        {label}
      </span>
    </button>
  )
}

function CanvasFrameRect({
  frame,
  draft = false,
}: {
  frame: Pick<CanvasFrame, 'x' | 'y' | 'width' | 'height'>
  draft?: boolean
}) {
  return (
    <div
      className={`pd-canvas-frame${draft ? ' pd-canvas-frame--draft' : ''}`}
      style={{
        left: frame.x,
        top: frame.y,
        width: frame.width,
        height: frame.height,
      }}
      aria-hidden
    />
  )
}

function CommentComposer({
  draftX,
  draftY,
  author,
  value,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}: {
  draftX: number
  draftY: number
  author: string
  value: string
  submitLabel: string
  onChange: (value: string) => void
  onSubmit: () => void
  onCancel: () => void
}) {
  const textareaId = useId()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  return (
    <div
      className="pd-canvas-comment-composer"
      style={{ left: draftX, top: draftY }}
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div className="pd-canvas-comment-composer__card">
        <div className="pd-canvas-comment-composer__header">
          <span
            className="pd-canvas-comment-composer__avatar"
            style={{ '--pd-comment-hue': avatarHue(author) } as CSSProperties}
            aria-hidden
          >
            {initialsFromName(author)}
          </span>
          <div className="pd-canvas-comment-composer__meta">
            <span className="pd-canvas-comment-composer__author">{author}</span>
            <span className="pd-canvas-comment-composer__hint">Comment</span>
          </div>
        </div>
        <label className="pd-canvas-comment-composer__label" htmlFor={textareaId}>
          Add a comment
        </label>
        <textarea
          ref={textareaRef}
          id={textareaId}
          className="pd-canvas-comment-composer__input"
          rows={3}
          placeholder="Leave a note…"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault()
              onCancel()
              return
            }
            if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
              event.preventDefault()
              onSubmit()
            }
          }}
        />
        <div className="pd-canvas-comment-composer__actions">
          <button type="button" className="pd-canvas-comment-composer__cancel" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className="pd-canvas-comment-composer__post"
            disabled={!value.trim()}
            onClick={onSubmit}
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

function CommentThread({
  comment,
  onClose,
  onDelete,
}: {
  comment: CanvasComment
  onClose: () => void
  onDelete: () => void
}) {
  return (
    <div
      className="pd-canvas-comment-thread"
      style={{ left: comment.x, top: comment.y }}
      onClick={(event) => event.stopPropagation()}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div className="pd-canvas-comment-thread__card">
        <div className="pd-canvas-comment-thread__header">
          <span
            className="pd-canvas-comment-thread__avatar"
            style={{ '--pd-comment-hue': avatarHue(comment.id) } as CSSProperties}
            aria-hidden
          >
            {initialsFromName(comment.author)}
          </span>
          <div className="pd-canvas-comment-thread__meta">
            <span className="pd-canvas-comment-thread__author">{comment.author}</span>
            <time className="pd-canvas-comment-thread__time" dateTime={new Date(comment.createdAt).toISOString()}>
              {formatCommentTime(comment.createdAt)}
            </time>
          </div>
          <button type="button" className="pd-canvas-comment-thread__close" aria-label="Close comment" onClick={onClose}>
            ×
          </button>
        </div>
        <p className="pd-canvas-comment-thread__body">{comment.text}</p>
        <button type="button" className="pd-canvas-comment-thread__delete" onClick={onDelete}>
          Remove comment
        </button>
      </div>
    </div>
  )
}

export default function DesignEngineeringCanvasTools({
  activeTool,
}: {
  activeTool: CanvasToolId
}) {
  const layerRef = useRef<HTMLDivElement>(null)
  const previousToolRef = useRef<CanvasToolId>(activeTool)
  const [comments, setComments] = useState<CanvasComment[]>(() => loadComments())
  const [guestName] = useState(getGuestName)
  const [draft, setDraft] = useState<{ x: number; y: number; text: string } | null>(null)
  const [openCommentId, setOpenCommentId] = useState<string | null>(null)
  const [strokes, setStrokes] = useState<InkStroke[]>([])
  const [activeStrokeId, setActiveStrokeId] = useState<string | null>(null)
  const [inkFading, setInkFading] = useState(false)
  const [frames, setFrames] = useState<CanvasFrame[]>(() => loadFrames())
  const [frameDraft, setFrameDraft] = useState<FrameDraft | null>(null)

  const isCommentTool = activeTool === 'comment'
  const isPenTool = activeTool === 'pen'
  const isFrameTool = activeTool === 'frame'
  const interceptPointer = isCommentTool || isPenTool || isFrameTool

  useEffect(() => {
    saveComments(comments)
  }, [comments])

  useEffect(() => {
    saveFrames(frames)
  }, [frames])

  useEffect(() => {
    const previousTool = previousToolRef.current
    previousToolRef.current = activeTool
    if (previousTool !== 'pen' || activeTool === 'pen') return
    if (strokes.length === 0 && !activeStrokeId) return

    setInkFading(true)
    const timer = window.setTimeout(() => {
      setStrokes([])
      setActiveStrokeId(null)
      setInkFading(false)
    }, 420)

    return () => window.clearTimeout(timer)
  }, [activeTool, activeStrokeId, strokes.length])

  useEffect(() => {
    if (!openCommentId || isCommentTool) return

    const onPointerDown = (event: PointerEvent) => {
      const layer = layerRef.current
      if (!layer) return
      if (layer.contains(event.target as Node)) return
      setOpenCommentId(null)
    }

    window.addEventListener('pointerdown', onPointerDown)
    return () => window.removeEventListener('pointerdown', onPointerDown)
  }, [openCommentId, isCommentTool])

  useEffect(() => {
    if (!draft && !openCommentId && !frameDraft) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDraft(null)
        setOpenCommentId(null)
        setFrameDraft(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [draft, openCommentId, frameDraft])

  const localPointFromEvent = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const layer = layerRef.current
    if (!layer) return null
    const rect = layer.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }, [])

  const handleLayerPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return

    if (isPenTool) {
      const point = localPointFromEvent(event)
      if (!point) return
      event.preventDefault()
      const strokeId = createId()
      setActiveStrokeId(strokeId)
      setStrokes((prev) => [...prev, { id: strokeId, points: [point] }])
      event.currentTarget.setPointerCapture(event.pointerId)
      return
    }

    if (isFrameTool) {
      const point = localPointFromEvent(event)
      if (!point) return
      event.preventDefault()
      setFrameDraft({ start: point, current: point })
      event.currentTarget.setPointerCapture(event.pointerId)
      return
    }

    if (!isCommentTool) return

    const point = localPointFromEvent(event)
    if (!point) return

    setOpenCommentId(null)
    setDraft({ x: point.x, y: point.y, text: '' })
  }

  const handleLayerPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isFrameTool && frameDraft) {
      const point = localPointFromEvent(event)
      if (!point) return
      setFrameDraft((prev) => (prev ? { ...prev, current: point } : prev))
      return
    }

    if (!isPenTool || !activeStrokeId) return
    const point = localPointFromEvent(event)
    if (!point) return

    setStrokes((prev) =>
      prev.map((stroke) => {
        if (stroke.id !== activeStrokeId) return stroke
        const last = stroke.points[stroke.points.length - 1]
        if (last && Math.hypot(last.x - point.x, last.y - point.y) < 1.25) return stroke
        return { ...stroke, points: [...stroke.points, point] }
      }),
    )
  }

  const finishPointerGesture = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (frameDraft) {
      const rect = rectFromPoints(frameDraft.start, frameDraft.current)
      if (rect.width >= FRAME_MIN_SIZE && rect.height >= FRAME_MIN_SIZE) {
        setFrames((prev) => [...prev, { id: createId(), ...rect }])
      }
      setFrameDraft(null)
      return
    }

    if (!activeStrokeId) return
    setActiveStrokeId(null)
  }

  const submitDraft = () => {
    if (!draft?.text.trim()) return
    const comment: CanvasComment = {
      id: createId(),
      x: draft.x,
      y: draft.y,
      text: draft.text.trim(),
      author: guestName,
      createdAt: Date.now(),
    }
    setComments((prev) => [...prev, comment])
    setDraft(null)
    setOpenCommentId(comment.id)
  }

  const openComment = comments.find((comment) => comment.id === openCommentId) ?? null
  const draftFrame = frameDraft ? rectFromPoints(frameDraft.start, frameDraft.current) : null
  const layerClass = [
    'pd-canvas-tools',
    interceptPointer ? 'pd-canvas-tools--intercept' : '',
    isCommentTool ? 'pd-canvas-tools--comment' : '',
    isPenTool ? 'pd-canvas-tools--pen' : '',
    isFrameTool ? 'pd-canvas-tools--frame' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div
      ref={layerRef}
      className={layerClass}
      aria-hidden={
        !interceptPointer && comments.length === 0 && strokes.length === 0 && frames.length === 0
          ? true
          : undefined
      }
      onPointerDown={handleLayerPointerDown}
      onPointerMove={handleLayerPointerMove}
      onPointerUp={finishPointerGesture}
      onPointerCancel={finishPointerGesture}
      onClick={() => {
        if (!isCommentTool) return
        if (draft) return
        setOpenCommentId(null)
      }}
    >
      <svg className={`pd-canvas-ink${inkFading ? ' pd-canvas-ink--fading' : ''}`} aria-hidden>
        {strokes.map((stroke) => (
          <path
            key={stroke.id}
            d={pointsToPath(stroke.points)}
            fill="none"
            stroke={INK_COLOR}
            strokeWidth={INK_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>

      {frames.map((frame) => (
        <CanvasFrameRect key={frame.id} frame={frame} />
      ))}

      {draftFrame ? <CanvasFrameRect frame={draftFrame} draft /> : null}

      {comments.map((comment, index) =>
        openCommentId === comment.id ? null : (
          <CommentPin
            key={comment.id}
            comment={comment}
            index={index}
            onOpen={setOpenCommentId}
          />
        ),
      )}

      {draft ? (
        <CommentComposer
          draftX={draft.x}
          draftY={draft.y}
          author={guestName}
          value={draft.text}
          submitLabel="Post"
          onChange={(text) => setDraft((prev) => (prev ? { ...prev, text } : prev))}
          onSubmit={submitDraft}
          onCancel={() => setDraft(null)}
        />
      ) : null}

      {openComment && !draft ? (
        <CommentThread
          comment={openComment}
          onClose={() => setOpenCommentId(null)}
          onDelete={() => {
            setComments((prev) => prev.filter((item) => item.id !== openComment.id))
            setOpenCommentId(null)
          }}
        />
      ) : null}
    </div>
  )
}
