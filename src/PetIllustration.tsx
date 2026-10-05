import { useId } from 'react'

type PetKind = 'lion' | 'jaguar' | 'dog' | 'hyena'

type PetIllustrationProps = {
  kind: PetKind
  stage: number
  label: string
  className?: string
}

const COLORS: Record<PetKind, { light: string; mid: string; dark: string; muzzle: string }> = {
  lion: { light: '#ffd879', mid: '#e99432', dark: '#a95024', muzzle: '#ffe9b4' },
  jaguar: { light: '#ffd27a', mid: '#d98b36', dark: '#8e482a', muzzle: '#fff0cf' },
  dog: { light: '#f8d09a', mid: '#bd7747', dark: '#75412f', muzzle: '#fff0d9' },
  hyena: { light: '#e8cf9b', mid: '#a78456', dark: '#604c3d', muzzle: '#f8e8c8' },
}

export default function PetIllustration({
  kind,
  stage,
  label,
  className,
}: PetIllustrationProps) {
  const id = `pet-${useId().replace(/:/g, '')}`
  const colors = COLORS[kind]
  const mystical = stage >= 3

  return (
    <svg
      aria-label={label}
      className={className}
      role="img"
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`${id}-fur`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={colors.light} />
          <stop offset=".58" stopColor={colors.mid} />
          <stop offset="1" stopColor={colors.dark} />
        </linearGradient>
        <linearGradient id={`${id}-face`} x1=".2" x2=".8" y1="0" y2="1">
          <stop offset="0" stopColor={colors.light} />
          <stop offset="1" stopColor={colors.mid} />
        </linearGradient>
        <radialGradient id={`${id}-shine`} cx=".35" cy=".25" r=".8">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-aura`}>
          <stop offset="0" stopColor="#fff" stopOpacity=".8" />
          <stop offset="1" stopColor="#c4b5fd" stopOpacity="0" />
        </radialGradient>
      </defs>

      {mystical && <circle cx="120" cy="113" r="111" fill={`url(#${id}-aura)`} />}
      {mystical && (
        <g fill="#fff" opacity=".9">
          <path d="m37 68 3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
          <path d="m202 83 2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
          <path d="m52 154 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
          <circle cx="195" cy="145" r="2" />
          <circle cx="67" cy="97" r="2" />
        </g>
      )}

      <ellipse cx="120" cy="214" rx="65" ry="12" fill="#60402f" opacity=".14" />

      {kind === 'lion' ? (
        <path
          d="M75 143c-27 4-31 27-16 35 12 6 22-4 28-16"
          fill="none"
          stroke={colors.dark}
          strokeLinecap="round"
          strokeWidth="12"
        />
      ) : kind === 'dog' ? (
        <path
          d="M163 151c24-8 34 8 25 20-6 8-16 6-20-1"
          fill="none"
          stroke={colors.dark}
          strokeLinecap="round"
          strokeWidth="9"
        />
      ) : (
        <path
          d="M163 151c23-7 33 10 21 21-8 7-17 2-17-5"
          fill="none"
          stroke={colors.mid}
          strokeLinecap="round"
          strokeWidth="9"
        />
      )}

      <ellipse cx="120" cy="164" rx="54" ry="49" fill={`url(#${id}-fur)`} />
      <ellipse cx="120" cy="172" rx="27" ry="31" fill={colors.muzzle} opacity=".72" />
      <ellipse cx="89" cy="194" rx="19" ry="12" fill={colors.dark} opacity=".23" />
      <ellipse cx="151" cy="194" rx="19" ry="12" fill={colors.dark} opacity=".23" />
      <ellipse cx="88" cy="190" rx="20" ry="14" fill={`url(#${id}-face)`} />
      <ellipse cx="152" cy="190" rx="20" ry="14" fill={`url(#${id}-face)`} />

      {kind === 'hyena' && (
        <g fill="none" stroke={colors.dark} strokeLinecap="round" strokeWidth="5" opacity=".65">
          <path d="m87 132 9 15" />
          <path d="m101 124 10 16" />
          <path d="m145 127-8 14" />
          <path d="m158 136-9 13" />
        </g>
      )}

      {kind === 'dog' ? (
        <g>
          <path d="M81 76c-22-10-34 5-29 31 3 18 14 26 27 18z" fill={`url(#${id}-fur)`} />
          <path d="M159 76c22-10 34 5 29 31-3 18-14 26-27 18z" fill={`url(#${id}-fur)`} />
          <path d="M65 91c6-4 13-5 19-3l-3 31c-9 3-15-7-16-28z" fill={colors.dark} opacity=".32" />
          <path d="M175 91c-6-4-13-5-19-3l3 31c9 3 15-7 16-28z" fill={colors.dark} opacity=".32" />
        </g>
      ) : (
        <g>
          <path d="M77 72 69 39c-2-8 7-13 14-8l26 22z" fill={`url(#${id}-fur)`} />
          <path d="m163 72 8-33c2-8-7-13-14-8l-26 22z" fill={`url(#${id}-fur)`} />
          <path d="m76 57 4-15 16 13z" fill="#d98e88" opacity=".78" />
          <path d="m164 57-4-15-16 13z" fill="#d98e88" opacity=".78" />
        </g>
      )}

      {kind === 'lion' && (
        <g>
          <circle cx="120" cy="94" r="66" fill={colors.dark} />
          <circle cx="120" cy="91" r="59" fill={`url(#${id}-fur)`} />
          <path d="M79 57c16-16 37-23 57-17" fill="none" stroke="#fff0bb" strokeLinecap="round" strokeWidth="8" opacity=".5" />
        </g>
      )}

      <ellipse cx="120" cy="91" rx={kind === 'lion' ? 43 : 50} ry={kind === 'lion' ? 47 : 53} fill={`url(#${id}-face)`} />
      <ellipse cx="102" cy="53" rx="24" ry="14" fill={`url(#${id}-shine)`} opacity=".55" />

      {kind === 'jaguar' && (
        <g fill={colors.dark} opacity=".82">
          <circle cx="84" cy="88" r="5" />
          <circle cx="91" cy="75" r="3.5" />
          <circle cx="153" cy="85" r="5" />
          <circle cx="146" cy="72" r="3.5" />
          <circle cx="80" cy="111" r="3.5" />
          <circle cx="160" cy="108" r="3.5" />
        </g>
      )}

      {kind === 'hyena' && (
        <g fill="none" stroke={colors.dark} strokeLinecap="round" strokeWidth="5" opacity=".55">
          <path d="m91 51 8 11" />
          <path d="m105 42 7 12" />
          <path d="m140 45-6 11" />
          <path d="m153 55-8 10" />
        </g>
      )}

      <ellipse cx="101" cy="93" rx="10" ry="13" fill="#34251f" />
      <ellipse cx="139" cy="93" rx="10" ry="13" fill="#34251f" />
      <ellipse cx="98" cy="89" rx="3.3" ry="4.3" fill="#fff" />
      <ellipse cx="136" cy="89" rx="3.3" ry="4.3" fill="#fff" />
      <ellipse cx="84" cy="111" rx="10" ry="5" fill="#ef8e83" opacity=".55" />
      <ellipse cx="156" cy="111" rx="10" ry="5" fill="#ef8e83" opacity=".55" />

      <ellipse cx="120" cy="116" rx="23" ry="16" fill={colors.muzzle} />
      <path d="M114 108q6-6 12 0-1 7-6 7t-6-7" fill="#50352e" />
      <path d="M120 115v9m0 0q-8 9-14 1m14-1q8 9 14 1" fill="none" stroke="#50352e" strokeLinecap="round" strokeWidth="3" />

      {stage >= 2 && (
        <g>
          <path d="m89 38 7-20 14 14 10-23 11 23 15-14 6 20z" fill="#ffd35a" stroke="#d99a24" strokeLinejoin="round" strokeWidth="3" />
          <circle cx="120" cy="29" r="3.5" fill="#fff8dc" />
          <circle cx="99" cy="31" r="3" fill="#fff8dc" />
          <circle cx="141" cy="31" r="3" fill="#fff8dc" />
        </g>
      )}

      {mystical && (
        <g fill="none" stroke="#8b5cf6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M77 144q-13 20-1 34" strokeWidth="5" />
          <path d="M163 144q13 20 1 34" strokeWidth="5" />
          <path d="m71 169 5 8 8-2m77-6-5 8-8-2" strokeWidth="3" />
        </g>
      )}
    </svg>
  )
}
