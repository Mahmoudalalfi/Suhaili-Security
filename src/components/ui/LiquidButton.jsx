import { useState } from 'react'

export default function LiquidButton({
  as: Tag = 'button',
  tint,
  textColor,
  children,
  style = {},
  ...rest
}) {
  const [pressed, setPressed] = useState(false)
  const [hovered, setHovered] = useState(false)

  const hasTint = !!tint
  const tintLayer = hasTint ? tint : 'rgba(255,255,255,0.14)'
  const resolvedText = textColor || (hasTint ? '#fff' : '#e8e8e8')

  const scale = pressed ? 0.965 : hovered ? 1.03 : 1
  const shadow = pressed
    ? '0 2px 8px rgba(0,0,0,0.2)'
    : hovered
    ? '0 10px 30px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.2)'
    : '0 5px 18px rgba(0,0,0,0.22)'

  return (
    <Tag
        {...rest}
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          padding: '11px 26px',
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.2)',
          cursor: 'pointer',
          textDecoration: 'none',
          userSelect: 'none',
          outline: 'none',
          background: hasTint
            ? `linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.035) 42%, transparent 70%), color-mix(in srgb, ${tintLayer} 58%, transparent)`
            : 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.055) 45%, rgba(255,255,255,0.09))',
          backdropFilter: 'blur(18px) saturate(175%) brightness(1.06)',
          WebkitBackdropFilter: 'blur(18px) saturate(175%) brightness(1.06)',
          boxShadow: [
            shadow,
            'inset 0 1px 0 rgba(255,255,255,0.28)',
            'inset 0 -1px 0 rgba(0,0,0,0.24)',
            'inset 1px 0 0 rgba(255,255,255,0.12)',
            'inset -1px 0 0 rgba(255,255,255,0.08)',
          ].join(', '),
          color: resolvedText,
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: '-0.01em',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          transform: `scale(${scale})`,
          transition: 'transform 220ms cubic-bezier(0.1,0.4,0.2,1), box-shadow 220ms cubic-bezier(0.1,0.4,0.2,1), filter 220ms',
          filter: hovered && !pressed ? 'brightness(1.1)' : 'brightness(1)',
          overflow: 'hidden',
          isolation: 'isolate',
          ...style,
        }}
        onMouseEnter={e => { setHovered(true); rest.onMouseEnter?.(e) }}
        onMouseLeave={e => { setHovered(false); setPressed(false); rest.onMouseLeave?.(e) }}
        onMouseDown={e => { setPressed(true); rest.onMouseDown?.(e) }}
        onMouseUp={e => { setPressed(false); rest.onMouseUp?.(e) }}
        onTouchStart={e => { setPressed(true); rest.onTouchStart?.(e) }}
        onTouchEnd={e => { setPressed(false); rest.onTouchEnd?.(e) }}
      >
        <span aria-hidden style={{
          position: 'absolute', inset: 1,
          borderRadius: 'inherit',
          background: 'linear-gradient(150deg, rgba(255,255,255,0.16) 0%, transparent 28%, transparent 68%, rgba(255,255,255,0.045) 100%)',
          pointerEvents: 'none',
        }} />
        <span aria-hidden style={{
          position: 'absolute', left: '12%', right: '12%', bottom: -12, height: 22,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.09)',
          filter: 'blur(9px)',
          pointerEvents: 'none',
        }} />
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </Tag>
  )
}
