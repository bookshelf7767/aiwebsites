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
      ) : kind === 'hyena' ? (
        <g>
          <circle cx="76" cy="62" r="19" fill={colors.dark} />
          <circle cx="76" cy="62" r="12" fill="#d7a58f" />
          <circle cx="164" cy="62" r="19" fill={colors.dark} />
          <circle cx="164" cy="62" r="12" fill="#d7a58f" />
          <path d="M69 63q7-9 14 0" fill="none" stroke="#fff0cf" strokeLinecap="round" strokeWidth="3" />
          <path d="M157 63q7-9 14 0" fill="none" stroke="#fff0cf" strokeLinecap="round" strokeWidth="3" />
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
          <circle cx="120" cy="94" r="51" fill="none" stroke="#ffdb83" strokeWidth="4" opacity=".6" />
        </g>
      )}

      <ellipse cx="120" cy="91" rx={kind === 'lion' ? 43 : 50} ry={kind === 'lion' ? 47 : 53} fill={`url(#${id}-face)`} />
      <ellipse cx="102" cy="53" rx="24" ry="14" fill={`url(#${id}-shine)`} opacity=".55" />

      {kind === 'jaguar' && (
        <g fill="none" stroke={mystical ? '#5b4aa8' : colors.dark} strokeWidth="3">
          <path d="M77 81q7-11 15 0-1 8-7 7-6 0-8-7zm4 0h7" />
          <path d="M148 78q7-11 15 0-1 8-7 7-6 0-8-7zm4 0h7" />
          <path d="M74 105q6-8 12 0m68-2q6-8 12 0" />
          <path d="M93 132q5-7 10 0m33 0q5-7 10 0" />
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

      {kind === 'lion' && stage === 1 && (
        <g fill="#fff0bb" stroke={colors.dark} strokeLinejoin="round" strokeWidth="2">
          <path d="m99 49 7-16 8 14 7-19 8 20 11-12 2 19z" />
          <path d="m83 90 7-4 5 7m47-1 6-7 8 5" fill="none" strokeLinecap="round" />
        </g>
      )}
      {kind === 'lion' && stage === 2 && (
        <g fill="none" stroke="#ffd56e" strokeLinecap="round" strokeWidth="4">
          <path d="M77 68q-9 8-10 18m96-18q9 8 10 18M70 111q-5 8-3 16m106-16q5 8 3 16" />
        </g>
      )}
      {kind === 'lion' && mystical && (
        <g>
          <path d="M80 46q40-40 80 0" fill="none" stroke="#ffce55" strokeLinecap="round" strokeWidth="6" />
          <circle cx="120" cy="20" r="9" fill="#fff3b0" stroke="#e5a82c" strokeWidth="3" />
          <path d="m72 69 8 4m80-4-8 4M72 119l8-3m80 3-8-3" stroke="#fff1bc" strokeLinecap="round" strokeWidth="5" />
          <path d="m120 68 4 8 9 1-7 6 2 9-8-5-8 5 2-9-7-6 9-1z" fill="#fff0a6" stroke="#d99a24" strokeWidth="2" />
        </g>
      )}

      {kind === 'jaguar' && stage === 1 && (
        <g fill="#fff3d3">
          <circle cx="96" cy="61" r="2" />
          <circle cx="144" cy="62" r="2" />
          <path d="M83 135q37 15 74 0" fill="none" stroke="#8e482a" strokeLinecap="round" strokeWidth="3" />
        </g>
      )}
      {kind === 'jaguar' && stage === 2 && (
        <g>
          <path d="M80 145q40 19 80 0" fill="none" stroke="#603d2d" strokeLinecap="round" strokeWidth="5" />
          <path d="M91 145v8m12-5v8m12-6v8m12-8v8m12-8v7m12-10v6" stroke="#fff0cf" strokeLinecap="round" strokeWidth="3" />
          <path d="M87 36q33-26 66 0" fill="none" stroke="#f6bd4c" strokeLinecap="round" strokeWidth="5" />
          <path d="M90 34q-7 5-8 13m68-13q7 5 8 13" fill="none" stroke="#8e482a" strokeLinecap="round" strokeWidth="3" />
        </g>
      )}
      {kind === 'jaguar' && mystical && (
        <g>
          <path d="M77 47a48 48 0 0 1 86 0" fill="none" stroke="#6352b4" strokeLinecap="round" strokeWidth="6" />
          <path d="M120 31c-15 15-15 31 0 41 15-10 15-26 0-41z" fill="#b9a8ff" stroke="#6654b5" strokeWidth="3" />
          <path d="M87 144q33 15 66 0" fill="none" stroke="#8370d6" strokeLinecap="round" strokeWidth="4" />
          <circle cx="120" cy="144" r="6" fill="#e8ddff" stroke="#6654b5" strokeWidth="2" />
          <path d="m72 78 7 4-7 4m96-8-7 4 7 4" fill="none" stroke="#79d8dc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="m120 49 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#efffff" />
        </g>
      )}

      {kind === 'dog' && stage === 1 && (
        <g>
          <path d="M102 45q18-15 36 0" fill="none" stroke="#fff1d7" strokeLinecap="round" strokeWidth="5" />
          <path d="M110 139q10 7 20 0" fill="none" stroke="#75412f" strokeLinecap="round" strokeWidth="3" />
          <circle cx="78" cy="105" r="3" fill="#fff0d9" />
          <circle cx="162" cy="105" r="3" fill="#fff0d9" />
        </g>
      )}
      {kind === 'dog' && stage === 2 && (
        <g>
          <path d="M84 145q36 21 72 0v15q-36 19-72 0z" fill="#55a9bd" stroke="#28778a" strokeWidth="3" />
          <circle cx="120" cy="155" r="12" fill="#ffe18a" stroke="#ba7f2d" strokeWidth="3" />
          <path d="m120 148 2 5 5 1-4 4 1 5-4-3-5 3 1-5-4-4 5-1z" fill="#fff9dc" />
          <path d="M106 42q14-12 28 0" fill="none" stroke="#fff4de" strokeLinecap="round" strokeWidth="5" />
          <path d="M55 96q-3 9 0 17m130-17q3 9 0 17" fill="none" stroke="#75412f" strokeLinecap="round" strokeWidth="3" />
        </g>
      )}
      {kind === 'dog' && mystical && (
        <g>
          <path d="M71 134q16-12 27-5l22 12 22-12q11-7 27 5l-10 37q-18-8-39-8t-39 8z" fill="#6378d1" stroke="#384993" strokeLinejoin="round" strokeWidth="3" />
          <path d="M84 151q-14 16-22 5m94-5q14 16 22 5" fill="none" stroke="#d5dcff" strokeLinecap="round" strokeWidth="4" />
          <path d="M84 144q36 19 72 0v14q-36 19-72 0z" fill="#70d6e3" stroke="#38569a" strokeWidth="3" />
          <circle cx="120" cy="154" r="12" fill="#ffdc7c" stroke="#a87035" strokeWidth="3" />
          <path d="m120 146 3 6 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1z" fill="#fff9de" />
          <path d="m69 75 10 7-11 5 10 6m83-18-10 7 11 5-10 6" fill="none" stroke="#8feafa" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      )}

      {kind === 'hyena' && stage === 1 && (
        <g>
          <path d="M96 48q6-16 12-7l5 8q7-20 13-3l3 6q8-13 12-4l-4 15H95z" fill="#8c5e46" stroke="#604c3d" strokeLinejoin="round" strokeWidth="2" />
          <path d="M89 130q31 15 62 0" fill="none" stroke="#604c3d" strokeLinecap="round" strokeWidth="3" />
          <path d="M91 58q-8 4-10 11m68-11q8 4 10 11" fill="none" stroke="#fff0cf" strokeLinecap="round" strokeWidth="3" />
        </g>
      )}
      {kind === 'hyena' && stage === 2 && (
        <g>
          <path d="M89 47q7-22 14-8l6 9q8-27 16-8l4 9q10-20 15-6l-6 23H91z" fill="#d77b35" stroke="#8b4c2f" strokeLinejoin="round" strokeWidth="3" />
          <path d="M82 148q38 17 76 0" fill="none" stroke="#dfaa58" strokeLinecap="round" strokeWidth="7" />
          <path d="m78 139 8-9 6 11m64-2 8-9 6 11" fill="#a78456" stroke="#604c3d" strokeLinejoin="round" strokeWidth="2" />
          <path d="M108 127q12 10 24 0" fill="none" stroke="#604c3d" strokeLinecap="round" strokeWidth="3" />
        </g>
      )}
      {kind === 'hyena' && mystical && (
        <g>
          <path d="M88 47q7-25 14-10l7 10q8-31 16-9l5 10q10-25 15-8l-6 26H91z" fill="#514b89" stroke="#383363" strokeLinejoin="round" strokeWidth="3" />
          <path d="M77 140q11-11 22-5l21 12 21-12q11-6 22 5l-9 27q-14-7-34-7t-34 7z" fill="#786bc0" stroke="#49417d" strokeLinejoin="round" strokeWidth="3" />
          <path d="M83 150q37 18 74 0" fill="none" stroke="#ffba69" strokeLinecap="round" strokeWidth="5" />
          <path d="m76 79 9 3-7 7m86-10-9 3 7 7" fill="none" stroke="#ffcf74" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <circle cx="120" cy="68" r="4" fill="#f8e9a8" />
          <circle cx="102" cy="49" r="3" fill="#f8e9a8" />
          <circle cx="140" cy="48" r="3" fill="#f8e9a8" />
        </g>
      )}

      <path d="M90 77q11-8 21-1m18 0q10-7 21 1" fill="none" stroke={colors.dark} strokeLinecap="round" strokeWidth="4" opacity=".7" />
      <ellipse cx="101" cy="93" rx="10" ry="13" fill="#34251f" />
      <ellipse cx="139" cy="93" rx="10" ry="13" fill="#34251f" />
      <ellipse cx="98" cy="89" rx="3.3" ry="4.3" fill="#fff" />
      <ellipse cx="136" cy="89" rx="3.3" ry="4.3" fill="#fff" />
      <ellipse cx="84" cy="111" rx="10" ry="5" fill="#ef8e83" opacity=".55" />
      <ellipse cx="156" cy="111" rx="10" ry="5" fill="#ef8e83" opacity=".55" />

      <ellipse cx="120" cy="116" rx="23" ry="16" fill={colors.muzzle} />
      <path d="M114 108q6-6 12 0-1 7-6 7t-6-7" fill="#50352e" />
      <path d="M120 115v9m0 0q-8 9-14 1m14-1q8 9 14 1" fill="none" stroke="#50352e" strokeLinecap="round" strokeWidth="3" />

      <path d="M83 183q5 3 10 0m53 0q5 3 10 0" fill="none" stroke="#fff7e8" strokeLinecap="round" strokeWidth="3" opacity=".85" />
      <path d="M80 199v5m8-7v5m64-3v5m8-7v5" fill="none" stroke="#fff7e8" strokeLinecap="round" strokeWidth="2.5" opacity=".9" />
    </svg>
  )
}
