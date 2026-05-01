import { useState, useRef } from 'react'

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
  const idRef = useRef(`lg-${Math.random().toString(36).slice(2, 7)}`)
  const filterId = idRef.current

  const hasTint = !!tint
  const tintLayer = hasTint ? tint : 'rgba(255,255,255,0.18)'
  const resolvedText = textColor || (hasTint ? '#fff' : '#e8e8e8')

  const scale = pressed ? 0.965 : hovered ? 1.03 : 1
  const shadow = pressed
    ? '0 1px 4px rgba(0,0,0,0.18)'
    : hovered
    ? '0 6px 24px rgba(0,0,0,0.28), 0 0 0 1.5px rgba(255,255,255,0.18)'
    : '0 3px 12px rgba(0,0,0,0.22), 0 0 0 1px rgba(255,255,255,0.12)'

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden>
        <defs>
          <filter id={filterId} x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.06 0.06" numOctaves="1" seed="2" result="turb" />
            <feGaussianBlur in="turb" stdDeviation="1.5" result="blurNoise" />
            <feDisplacementMap in="SourceGraphic" in2="blurNoise" scale="55" xChannelSelector="R" yChannelSelector="B" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="3" result="finalBlur" />
            <feComposite in="finalBlur" in2="finalBlur" operator="over" />
          </filter>
        </defs>
      </svg>
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
          border: 'none',
          cursor: 'pointer',
          textDecoration: 'none',
          userSelect: 'none',
          outline: 'none',
          background: hasTint
            ? `linear-gradient(145deg, ${tintLayer}ee 0%, ${tintLayer}bb 100%)`
            : 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)',
          backdropFilter: `url("#${filterId}") blur(14px) saturate(1.5)`,
          WebkitBackdropFilter: `url("#${filterId}") blur(14px) saturate(1.5)`,
          boxShadow: [
            shadow,
            'inset 0 1px 0 rgba(255,255,255,0.22)',
            'inset 0 -1px 0 rgba(0,0,0,0.18)',
            'inset 1px 0 0 rgba(255,255,255,0.10)',
            'inset -1px 0 0 rgba(255,255,255,0.06)',
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
          position: 'absolute', top: 0, left: '12%', right: '12%', height: '38%',
          borderRadius: '0 0 50% 50%',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.22) 0%, transparent 100%)',
          pointerEvents: 'none',
        }} />
        <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
      </Tag>
    </>
  )
}
