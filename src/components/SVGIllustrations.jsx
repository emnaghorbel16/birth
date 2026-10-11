// Cute fluffy bunny/cat mascot SVG with expressions
export const MascotSVG = ({ mood = 'happy', className = '' }) => {
  const expressions = {
    sad: (
      <>
        {/* Sad eyes - drooping */}
        <ellipse cx="42" cy="50" rx="5" ry="4" fill="#333" />
        <ellipse cx="68" cy="50" rx="5" ry="4" fill="#333" />
        {/* Sad eyebrows */}
        <path d="M37 43 Q42 40 47 43" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M63 43 Q68 40 73 43" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Sad mouth */}
        <path d="M47 65 Q55 60 63 65" stroke="#555" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Tears */}
        <ellipse cx="40" cy="57" rx="2" ry="4" fill="#A8D4F0" opacity="0.8"/>
        <ellipse cx="70" cy="57" rx="2" ry="4" fill="#A8D4F0" opacity="0.8"/>
      </>
    ),
    unimpressed: (
      <>
        {/* Unimpressed eyes - flat */}
        <ellipse cx="42" cy="50" rx="5" ry="3" fill="#333" />
        <ellipse cx="68" cy="50" rx="5" ry="3" fill="#333" />
        {/* Flat brows */}
        <path d="M37 44 L47 44" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M63 44 L73 44" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Flat mouth */}
        <path d="M47 64 L63 64" stroke="#555" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </>
    ),
    happy: (
      <>
        {/* Happy eyes - round */}
        <ellipse cx="42" cy="50" rx="5" ry="5" fill="#333" />
        <ellipse cx="68" cy="50" rx="5" ry="5" fill="#333" />
        {/* Eye shine */}
        <circle cx="44" cy="48" r="1.5" fill="white"/>
        <circle cx="70" cy="48" r="1.5" fill="white"/>
        {/* Happy brows */}
        <path d="M37 43 Q42 39 47 42" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M63 42 Q68 39 73 43" stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* Smile */}
        <path d="M46 62 Q55 70 64 62" stroke="#EC5A86" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Blush */}
        <ellipse cx="35" cy="60" rx="7" ry="4" fill="#F9B8C6" opacity="0.7"/>
        <ellipse cx="75" cy="60" rx="7" ry="4" fill="#F9B8C6" opacity="0.7"/>
      </>
    ),
    ecstatic: (
      <>
        {/* Star eyes - sparkly */}
        <text x="37" y="57" fontSize="12" fill="#F5C26B">★</text>
        <text x="63" y="57" fontSize="12" fill="#F5C26B">★</text>
        {/* Sparkles around eyes */}
        <text x="29" y="46" fontSize="8" fill="#F5C26B">✦</text>
        <text x="68" y="44" fontSize="8" fill="#F5C26B">✦</text>
        {/* Big happy mouth */}
        <path d="M44 62 Q55 74 66 62" stroke="#EC5A86" strokeWidth="3" fill="#FDE4E8" strokeLinecap="round"/>
        {/* Big blush */}
        <ellipse cx="33" cy="60" rx="9" ry="6" fill="#F9B8C6" opacity="0.8"/>
        <ellipse cx="77" cy="60" rx="9" ry="6" fill="#F9B8C6" opacity="0.8"/>
        {/* Hearts above head */}
        <text x="20" y="20" fontSize="12" fill="#EC5A86">♥</text>
        <text x="78" y="18" fontSize="10" fill="#F9B8C6">♥</text>
        <text x="50" y="12" fontSize="8" fill="#A3123F">♥</text>
      </>
    ),
  }

  return (
    <svg
      className={className}
      viewBox="0 0 110 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Mascot feeling ${mood}`}
      role="img"
    >
      {/* Party hat */}
      <polygon points="55,2 38,28 72,28" fill="#EC5A86" stroke="#A3123F" strokeWidth="1"/>
      <line x1="38" y1="28" x2="72" y2="28" stroke="#F5C26B" strokeWidth="2"/>
      <circle cx="55" cy="2" r="3" fill="#F5C26B"/>
      {/* Hat pompom string */}
      <path d="M46 16 Q55 22 64 16" stroke="#FFF6EC" strokeWidth="1.5" fill="none" strokeDasharray="2,2"/>

      {/* Body - fluffy */}
      <ellipse cx="55" cy="80" rx="28" ry="22" fill="#FFF6EC" stroke="#F9B8C6" strokeWidth="1.5"/>

      {/* Tail */}
      <circle cx="82" cy="88" r="9" fill="white" stroke="#F9B8C6" strokeWidth="1"/>
      <circle cx="82" cy="88" r="6" fill="#FDE4E8"/>

      {/* Head */}
      <ellipse cx="55" cy="55" rx="32" ry="30" fill="white" stroke="#F9B8C6" strokeWidth="1.5"/>

      {/* Ears */}
      <ellipse cx="32" cy="30" rx="10" ry="18" fill="white" stroke="#F9B8C6" strokeWidth="1.5" transform="rotate(-10 32 30)"/>
      <ellipse cx="78" cy="30" rx="10" ry="18" fill="white" stroke="#F9B8C6" strokeWidth="1.5" transform="rotate(10 78 30)"/>
      <ellipse cx="32" cy="30" rx="6" ry="13" fill="#FDE4E8" transform="rotate(-10 32 30)"/>
      <ellipse cx="78" cy="30" rx="6" ry="13" fill="#FDE4E8" transform="rotate(10 78 30)"/>

      {/* Nose */}
      <ellipse cx="55" cy="58" rx="4" ry="3" fill="#F9B8C6"/>
      <ellipse cx="55" cy="57" rx="2" ry="1.5" fill="#EC5A86"/>

      {/* Whiskers */}
      <line x1="20" y1="56" x2="45" y2="58" stroke="#ccc" strokeWidth="1" opacity="0.7"/>
      <line x1="20" y1="60" x2="45" y2="60" stroke="#ccc" strokeWidth="1" opacity="0.7"/>
      <line x1="65" y1="58" x2="90" y2="56" stroke="#ccc" strokeWidth="1" opacity="0.7"/>
      <line x1="65" y1="60" x2="90" y2="60" stroke="#ccc" strokeWidth="1" opacity="0.7"/>

      {/* Expression */}
      {expressions[mood]}

      {/* Tiny paws */}
      <ellipse cx="35" cy="97" rx="8" ry="5" fill="white" stroke="#F9B8C6" strokeWidth="1.5"/>
      <ellipse cx="75" cy="97" rx="8" ry="5" fill="white" stroke="#F9B8C6" strokeWidth="1.5"/>
    </svg>
  )
}

// Kissing lovebirds SVG
export const LovebirdsSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Two kissing lovebirds" role="img">
    {/* Left bird */}
    <ellipse cx="30" cy="50" rx="18" ry="14" fill="#FDE4E8" stroke="#F9B8C6" strokeWidth="1.5"/>
    <circle cx="30" cy="36" r="11" fill="#FDE4E8" stroke="#F9B8C6" strokeWidth="1.5"/>
    {/* Left bird wing */}
    <path d="M14 50 Q10 62 20 68 Q30 72 35 62 Q30 55 14 50Z" fill="#F9B8C6" stroke="#EC5A86" strokeWidth="1"/>
    {/* Left bird tail */}
    <path d="M12 55 Q5 65 12 72 Q20 68 18 58Z" fill="#EC5A86"/>
    {/* Left bird eye */}
    <circle cx="35" cy="33" r="3" fill="#333"/>
    <circle cx="36" cy="32" r="1" fill="white"/>
    {/* Left beak */}
    <path d="M40 37 L46 39 L40 41Z" fill="#F5C26B" stroke="#EC5A86" strokeWidth="0.5"/>

    {/* Heart between them */}
    <text x="44" y="35" fontSize="14" fill="#EC5A86">♥</text>

    {/* Right bird */}
    <ellipse cx="70" cy="50" rx="18" ry="14" fill="#A8D4F0" stroke="#7BB8D4" strokeWidth="1.5" transform="scale(-1,1) translate(-140,0)"/>
    <circle cx="70" cy="36" r="11" fill="#A8D4F0" stroke="#7BB8D4" strokeWidth="1.5"/>
    {/* Right bird wing */}
    <path d="M86 50 Q90 62 80 68 Q70 72 65 62 Q70 55 86 50Z" fill="#7BB8D4" stroke="#5A9CBD" strokeWidth="1"/>
    {/* Right bird tail */}
    <path d="M88 55 Q95 65 88 72 Q80 68 82 58Z" fill="#5A9CBD"/>
    {/* Right bird eye */}
    <circle cx="65" cy="33" r="3" fill="#333"/>
    <circle cx="66" cy="32" r="1" fill="white"/>
    {/* Right beak */}
    <path d="M60 37 L54 39 L60 41Z" fill="#F5C26B" stroke="#EC5A86" strokeWidth="0.5"/>

    {/* Branch */}
    <path d="M15 70 Q55 75 85 70" stroke="#8B6914" strokeWidth="3" fill="none" strokeLinecap="round"/>
    {/* Leaves */}
    <ellipse cx="20" cy="68" rx="5" ry="3" fill="#6BBF4E" transform="rotate(-20 20 68)"/>
    <ellipse cx="80" cy="68" rx="5" ry="3" fill="#6BBF4E" transform="rotate(20 80 68)"/>
  </svg>
)

// Paper plane SVG
export const PaperPlaneSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Paper plane" role="img">
    {/* Plane body */}
    <path d="M5 30 L75 5 L50 55 Z" fill="#FDE4E8" stroke="#EC5A86" strokeWidth="1.5" strokeLinejoin="round"/>
    {/* Plane fold */}
    <path d="M5 30 L50 55 L35 35 Z" fill="#F9B8C6" stroke="#EC5A86" strokeWidth="1"/>
    {/* Heart trail dots */}
    <circle cx="2" cy="40" r="2" fill="#EC5A86" opacity="0.5"/>
    <circle cx="8" cy="48" r="2" fill="#EC5A86" opacity="0.4"/>
    <circle cx="15" cy="54" r="1.5" fill="#EC5A86" opacity="0.3"/>
    <circle cx="22" cy="58" r="1.5" fill="#EC5A86" opacity="0.2"/>
    {/* Small hearts in trail */}
    <text x="0" y="44" fontSize="8" fill="#EC5A86" opacity="0.4">♥</text>
  </svg>
)

// Gift box SVG
export const GiftBoxSVG = ({ className = '', isOpen = false, color = '#A8D4F0' }) => (
  <svg className={className} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Gift box" role="img">
    {!isOpen ? (
      <>
        {/* Box body */}
        <rect x="10" y="55" width="80" height="60" rx="4" fill={color} stroke="#7BB8D4" strokeWidth="2"/>
        {/* Box lid */}
        <rect x="5" y="40" width="90" height="20" rx="4" fill={color} stroke="#7BB8D4" strokeWidth="2"/>
        {/* Vertical ribbon on body */}
        <rect x="43" y="55" width="14" height="60" fill="#F9B8C6"/>
        {/* Horizontal ribbon on lid */}
        <rect x="5" y="46" width="90" height="8" fill="#F9B8C6"/>
        {/* Bow center */}
        <circle cx="50" cy="40" r="6" fill="#EC5A86" stroke="#A3123F" strokeWidth="1"/>
        {/* Bow left loop */}
        <ellipse cx="33" cy="34" rx="14" ry="9" fill="#EC5A86" stroke="#A3123F" strokeWidth="1" transform="rotate(-20 33 34)"/>
        {/* Bow right loop */}
        <ellipse cx="67" cy="34" rx="14" ry="9" fill="#EC5A86" stroke="#A3123F" strokeWidth="1" transform="rotate(20 67 34)"/>
        {/* Bow knot */}
        <ellipse cx="50" cy="40" r="5" fill="#F9B8C6" stroke="#EC5A86" strokeWidth="1"/>
        {/* Bow tails */}
        <path d="M44 44 Q35 54 30 56" stroke="#EC5A86" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M56 44 Q65 54 70 56" stroke="#EC5A86" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Diamond accent */}
        <rect x="46" y="36" width="8" height="8" fill="#FFF6EC" transform="rotate(45 50 40)" opacity="0.6"/>
      </>
    ) : (
      <>
        {/* Open box body */}
        <rect x="10" y="55" width="80" height="60" rx="4" fill={color} stroke="#7BB8D4" strokeWidth="2"/>
        {/* Vertical ribbon on body */}
        <rect x="43" y="55" width="14" height="60" fill="#F9B8C6"/>
        {/* Lid open (tilted) */}
        <rect x="5" y="20" width="90" height="20" rx="4" fill={color} stroke="#7BB8D4" strokeWidth="2" transform="rotate(-25 50 30)"/>
        <rect x="5" y="20" width="90" height="8" fill="#F9B8C6" transform="rotate(-25 50 30)"/>
        {/* Sparkles */}
        <text x="30" y="45" fontSize="16" fill="#F5C26B">✨</text>
        <text x="58" y="38" fontSize="12" fill="#EC5A86">✦</text>
        <text x="45" y="30" fontSize="10" fill="#F5C26B">★</text>
        {/* Check heart */}
        <text x="38" y="85" fontSize="24" fill="#EC5A86">♥</text>
      </>
    )}
  </svg>
)

// Birthday cake SVG
export const CakeSVG = ({ className = '', candleCount = 5, candlesLit = [] }) => {
  const candles = Array.from({ length: candleCount }, (_, i) => i)
  const spacing = candleCount > 0 ? Math.min(60 / candleCount, 15) : 15
  const startX = 50 - ((candleCount - 1) * spacing) / 2

  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Birthday cake" role="img">
      {/* Cake plate */}
      <ellipse cx="100" cy="185" rx="85" ry="8" fill="#EFD9A8" stroke="#D4A853" strokeWidth="1.5"/>

      {/* Bottom tier */}
      <rect x="20" y="135" width="160" height="50" rx="8" fill="#FDE4E8" stroke="#F9B8C6" strokeWidth="2"/>
      {/* Bottom tier frosting drips */}
      {[30,50,70,90,110,130,150,170].map(x => (
        <path key={x} d={`M${x} 135 Q${x+5} 148 ${x+10} 135`} fill="#FFF6EC" stroke="#F9B8C6" strokeWidth="1"/>
      ))}
      {/* Bottom tier decoration */}
      <path d="M20 155 Q100 165 180 155" stroke="#EC5A86" strokeWidth="1.5" strokeDasharray="5,3" fill="none"/>
      {[40,70,100,130,160].map(x => (
        <text key={x} x={x-8} y="170" fontSize="12" fill="#EC5A86">♥</text>
      ))}

      {/* Top tier */}
      <rect x="40" y="85" width="120" height="55" rx="8" fill="#F9B8C6" stroke="#EC5A86" strokeWidth="2"/>
      {/* Top tier frosting drips */}
      {[50,65,80,95,110,125,140].map(x => (
        <path key={x} d={`M${x} 85 Q${x+5} 97 ${x+10} 85`} fill="#FFF6EC" stroke="#EC5A86" strokeWidth="1"/>
      ))}
      {/* Top tier decoration */}
      <text x="72" y="120" fontSize="16" fill="#A3123F" fontFamily="Fredoka, sans-serif" fontWeight="600">Happy</text>
      <text x="68" y="136" fontSize="13" fill="#A3123F" fontFamily="Fredoka, sans-serif" fontWeight="500">Birthday!</text>

      {/* Star/pearl decorations */}
      {[55,100,145].map(x => (
        <circle key={x} cx={x} cy="95" r="4" fill="#FFF6EC" stroke="#EC5A86" strokeWidth="1"/>
      ))}

      {/* Candles */}
      {candles.map(i => {
        const cx = startX + i * spacing
        const isLit = candlesLit.includes(i)
        return (
          <g key={i}>
            {/* Candle body */}
            <rect x={cx - 4} y="60" width="8" height="28" rx="2" fill={i % 2 === 0 ? "#EC5A86" : "#F5C26B"} stroke={i % 2 === 0 ? "#A3123F" : "#D4A853"} strokeWidth="1"/>
            {/* Candle stripe */}
            <rect x={cx - 4} y="70" width="8" height="3" fill="rgba(255,255,255,0.4)" rx="1"/>
            {/* Wick */}
            <line x1={cx} y1="60" x2={cx} y2="56" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
            {/* Flame (only if lit) */}
            {isLit && (
              <g className="flame">
                <ellipse cx={cx} cy="50" rx="5" ry="8" fill="#F5C26B" opacity="0.9"/>
                <ellipse cx={cx} cy="51" rx="3" ry="5" fill="#FF7043"/>
                <ellipse cx={cx} cy="53" rx="1.5" ry="3" fill="#FFF176"/>
              </g>
            )}
            {/* Smoke (only if blown out) */}
            {!isLit && (
              <g>
                <path d={`M${cx} 54 Q${cx+3} 46 ${cx} 40 Q${cx-3} 34 ${cx} 28`} stroke="#999" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// Bouquet of roses SVG
export const BouquetSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Bouquet of red roses" role="img">
    {/* Wrapping paper */}
    <path d="M60 160 L30 240 L170 240 L140 160 Z" fill="#FFF6EC" stroke="#EFD9A8" strokeWidth="2"/>
    <path d="M60 160 L30 240" stroke="#F9B8C6" strokeWidth="1" opacity="0.5"/>
    <path d="M100 160 L100 240" stroke="#F9B8C6" strokeWidth="1" opacity="0.5"/>
    <path d="M140 160 L170 240" stroke="#F9B8C6" strokeWidth="1" opacity="0.5"/>

    {/* Ribbon */}
    <path d="M70 180 Q100 175 130 180 Q110 195 100 200 Q90 195 70 180Z" fill="#EC5A86"/>
    <path d="M60 185 Q80 178 100 182 Q80 200 70 205 Z" fill="#A3123F"/>
    <path d="M140 185 Q120 178 100 182 Q120 200 130 205 Z" fill="#A3123F"/>

    {/* Leaves */}
    <ellipse cx="55" cy="150" rx="15" ry="25" fill="#4CAF50" transform="rotate(-30 55 150)" opacity="0.9"/>
    <ellipse cx="145" cy="150" rx="15" ry="25" fill="#4CAF50" transform="rotate(30 145 150)" opacity="0.9"/>
    <ellipse cx="75" cy="140" rx="12" ry="20" fill="#66BB6A" transform="rotate(-15 75 140)" opacity="0.9"/>
    <ellipse cx="125" cy="140" rx="12" ry="20" fill="#66BB6A" transform="rotate(15 125 140)" opacity="0.9"/>

    {/* Stems */}
    <line x1="80" y1="160" x2="80" y2="140" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
    <line x1="100" y1="160" x2="100" y2="130" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
    <line x1="120" y1="160" x2="120" y2="140" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
    <line x1="65" y1="165" x2="65" y2="145" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>
    <line x1="135" y1="165" x2="135" y2="145" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round"/>

    {/* Roses - back row */}
    {[
      { cx: 65, cy: 130, r: 20 },
      { cx: 100, cy: 115, r: 22 },
      { cx: 135, cy: 130, r: 20 },
    ].map(({ cx, cy, r }, i) => (
      <g key={`back-${i}`}>
        <circle cx={cx} cy={cy} r={r} fill="#C62828"/>
        <circle cx={cx} cy={cy} r={r - 4} fill="#D32F2F"/>
        <circle cx={cx - 4} cy={cy - 4} r={r - 8} fill="#E53935"/>
        <ellipse cx={cx} cy={cy} rx={r - 2} ry={r - 5} fill="none" stroke="#B71C1C" strokeWidth="1" opacity="0.5"/>
      </g>
    ))}

    {/* Roses - front row */}
    {[
      { cx: 82, cy: 148, r: 18 },
      { cx: 118, cy: 148, r: 18 },
    ].map(({ cx, cy, r }, i) => (
      <g key={`front-${i}`}>
        <circle cx={cx} cy={cy} r={r} fill="#C62828"/>
        <circle cx={cx} cy={cy} r={r - 3} fill="#D32F2F"/>
        <circle cx={cx - 3} cy={cy - 3} r={r - 7} fill="#EF5350"/>
        <ellipse cx={cx} cy={cy} rx={r - 2} ry={r - 4} fill="none" stroke="#B71C1C" strokeWidth="1" opacity="0.5"/>
      </g>
    ))}

    {/* Tiny baby's breath / white flowers */}
    {[60, 80, 120, 145].map((x, i) => (
      <g key={`white-${i}`}>
        <circle cx={x} cy={155 - i * 5} r="4" fill="white" stroke="#F9B8C6" strokeWidth="1"/>
        <circle cx={x + 5} cy={152 - i * 5} r="3" fill="white" stroke="#F9B8C6" strokeWidth="1"/>
      </g>
    ))}
  </svg>
)

// Cat holding heart SVG
export const CatHeartSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Orange cat holding a heart" role="img">
    {/* Party hat */}
    <polygon points="60,2 44,30 76,30" fill="#EC5A86" stroke="#A3123F" strokeWidth="1"/>
    <line x1="44" y1="30" x2="76" y2="30" stroke="#F5C26B" strokeWidth="2"/>
    <circle cx="60" cy="2" r="3" fill="#F5C26B"/>

    {/* Body */}
    <ellipse cx="60" cy="115" rx="35" ry="38" fill="#FF8C42"/>
    {/* White belly */}
    <ellipse cx="60" cy="120" rx="20" ry="25" fill="#FFF6EC"/>
    {/* Tail */}
    <path d="M95 130 Q115 120 110 140 Q105 155 90 145" stroke="#E67E22" strokeWidth="10" fill="none" strokeLinecap="round"/>

    {/* Head */}
    <circle cx="60" cy="65" r="35" fill="#FF8C42"/>

    {/* Ears */}
    <polygon points="30,42 22,18 45,35" fill="#FF8C42" stroke="#E67E22" strokeWidth="1"/>
    <polygon points="90,42 98,18 75,35" fill="#FF8C42" stroke="#E67E22" strokeWidth="1"/>
    <polygon points="32,40 27,24 44,34" fill="#F9B8C6"/>
    <polygon points="88,40 93,24 76,34" fill="#F9B8C6"/>

    {/* Face */}
    {/* Eyes - closed happy */}
    <path d="M46 60 Q50 55 54 60" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M66 60 Q70 55 74 60" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

    {/* Nose */}
    <ellipse cx="60" cy="68" rx="4" ry="3" fill="#F9B8C6"/>
    <ellipse cx="60" cy="67" rx="2.5" ry="1.5" fill="#EC5A86"/>

    {/* Mouth */}
    <path d="M56 71 Q60 76 64 71" stroke="#E67E22" strokeWidth="2" fill="none" strokeLinecap="round"/>

    {/* Whiskers */}
    <line x1="28" y1="64" x2="52" y2="66" stroke="#333" strokeWidth="1" opacity="0.6"/>
    <line x1="28" y1="70" x2="52" y2="70" stroke="#333" strokeWidth="1" opacity="0.6"/>
    <line x1="68" y1="66" x2="92" y2="64" stroke="#333" strokeWidth="1" opacity="0.6"/>
    <line x1="68" y1="70" x2="92" y2="70" stroke="#333" strokeWidth="1" opacity="0.6"/>

    {/* Blush */}
    <ellipse cx="42" cy="74" rx="8" ry="5" fill="#F9B8C6" opacity="0.7"/>
    <ellipse cx="78" cy="74" rx="8" ry="5" fill="#F9B8C6" opacity="0.7"/>

    {/* Arms holding heart */}
    <path d="M30 110 Q20 100 25 90 Q35 95 38 105" fill="#FF8C42" stroke="#E67E22" strokeWidth="1"/>
    <path d="M90 110 Q100 100 95 90 Q85 95 82 105" fill="#FF8C42" stroke="#E67E22" strokeWidth="1"/>

    {/* Big red heart */}
    <path d="M60 130 L42 114 Q38 108 44 104 Q50 100 56 106 L60 110 L64 106 Q70 100 76 104 Q82 108 78 114 Z" fill="#E53935" stroke="#B71C1C" strokeWidth="1"/>
    {/* Heart shine */}
    <ellipse cx="52" cy="110" rx="4" ry="3" fill="rgba(255,255,255,0.4)" transform="rotate(-20 52 110)"/>

    {/* Stripes on forehead */}
    <path d="M52 48 Q56 44 60 48" stroke="#E67E22" strokeWidth="1.5" fill="none"/>
    <path d="M60 46 Q64 42 68 46" stroke="#E67E22" strokeWidth="1.5" fill="none"/>
  </svg>
)

// Cherry blossom branch SVG
export const CherryBlossomSVG = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 80 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Cherry blossom branch" role="img">
    {/* Main branch */}
    <path d="M40 200 Q35 160 45 120 Q38 90 42 60 Q37 35 40 10" stroke="#8B6914" strokeWidth="4" fill="none" strokeLinecap="round"/>
    {/* Sub branches */}
    <path d="M42 80 Q55 70 65 60" stroke="#8B6914" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M44 110 Q25 100 15 90" stroke="#8B6914" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M41 50 Q58 42 68 30" stroke="#8B6914" strokeWidth="2" fill="none" strokeLinecap="round"/>

    {/* Blossoms */}
    {[
      { cx: 45, cy: 20, r: 8 },
      { cx: 65, cy: 57, r: 7 },
      { cx: 14, cy: 88, r: 8 },
      { cx: 68, cy: 28, r: 6 },
      { cx: 40, cy: 140, r: 7 },
      { cx: 55, cy: 72, r: 6 },
    ].map(({ cx, cy, r }, i) => (
      <g key={i}>
        {/* 5 petals */}
        {[0, 72, 144, 216, 288].map(angle => {
          const rad = (angle * Math.PI) / 180
          const px = cx + r * Math.cos(rad)
          const py = cy + r * Math.sin(rad)
          return (
            <ellipse
              key={angle}
              cx={px}
              cy={py}
              rx={r * 0.6}
              ry={r * 0.4}
              fill="#F9B8C6"
              stroke="#EC5A86"
              strokeWidth="0.5"
              transform={`rotate(${angle + 90} ${px} ${py})`}
            />
          )
        })}
        {/* Center */}
        <circle cx={cx} cy={cy} r={r * 0.3} fill="#F5C26B"/>
      </g>
    ))}
  </svg>
)
