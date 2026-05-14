export default function BpmnMockup() {
  return (
    <svg
      role="img"
      aria-label="Diagrama de proceso Proocess"
      viewBox="0 0 900 480"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="g-coral" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="7" in="SourceGraphic" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <filter id="g-soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" in="SourceGraphic" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>

        <marker id="a-coral" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <path d="M0,.5L0,6.5L9,3.5z" fill="#F95068" opacity=".75"/>
        </marker>
        <marker id="a-muted" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <path d="M0,.5L0,6.5L9,3.5z" fill="rgba(247,245,242,.16)"/>
        </marker>

        <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="14" cy="14" r=".7" fill="rgba(247,245,242,.05)"/>
        </pattern>

        <radialGradient id="atmo" cx="50%" cy="50%" r="45%">
          <stop offset="0%"   stopColor="rgba(249,80,104,.045)"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>

      {/* Fondos */}
      <rect width="900" height="480" fill="url(#dots)"/>
      <rect width="900" height="480" fill="url(#atmo)"/>

      {/* Corredor de luz coral */}
      <line x1="109" y1="240" x2="791" y2="240"
        stroke="rgba(249,80,104,.07)" strokeWidth="1" filter="url(#g-coral)"/>

      {/* ── CONEXIONES ── */}

      {/* Path principal */}
      <line x1="123" y1="240" x2="147" y2="240" stroke="#F95068" strokeWidth="1.5" opacity=".65" markerEnd="url(#a-coral)"/>
      <line x1="295" y1="240" x2="330" y2="240" stroke="#F95068" strokeWidth="1.5" opacity=".65" markerEnd="url(#a-coral)"/>
      <line x1="370" y1="240" x2="393" y2="240" stroke="#F95068" strokeWidth="1.5" opacity=".65" markerEnd="url(#a-coral)"/>
      <line x1="525" y1="240" x2="548" y2="240" stroke="#F95068" strokeWidth="1.5" opacity=".65" markerEnd="url(#a-coral)"/>
      <line x1="588" y1="240" x2="611" y2="240" stroke="#F95068" strokeWidth="1.5" opacity=".65" markerEnd="url(#a-coral)"/>
      <line x1="741" y1="240" x2="777" y2="240" stroke="#F95068" strokeWidth="1.5" opacity=".65" markerEnd="url(#a-coral)"/>

      {/* Ramas secundarias */}
      <path d="M350,220 Q350,159 393,159" stroke="rgba(247,245,242,.14)" strokeWidth="1.2" fill="none" markerEnd="url(#a-muted)"/>
      <path d="M350,260 Q350,321 393,321" stroke="rgba(247,245,242,.14)" strokeWidth="1.2" fill="none" markerEnd="url(#a-muted)"/>
      <path d="M525,159 Q568,159 568,220" stroke="rgba(247,245,242,.14)" strokeWidth="1.2" fill="none" markerEnd="url(#a-muted)"/>
      <path d="M525,321 Q568,321 568,260" stroke="rgba(247,245,242,.14)" strokeWidth="1.2" fill="none" markerEnd="url(#a-muted)"/>

      {/* ── NODOS ── */}

      {/* Evento de inicio */}
      <circle cx="109" cy="240" r="22" fill="rgba(249,80,104,.04)" stroke="none"/>
      <circle cx="109" cy="240" r="14" fill="rgba(249,80,104,.08)" stroke="#F95068" strokeWidth="1.5" filter="url(#g-coral)"/>
      <circle cx="109" cy="240" r="5"  fill="#F95068" opacity=".9"/>

      {/* Tarea A: Capturar conocimiento */}
      <rect x="147" y="214" width="148" height="52" rx="7"
        fill="rgba(39,50,59,.9)" stroke="rgba(247,245,242,.1)" strokeWidth="1"/>
      <text x="221" y="236" textAnchor="middle"
        fill="rgba(247,245,242,.88)" fontSize="11.5"
        fontFamily="Inter,system-ui,sans-serif" fontWeight="500">Capturar</text>
      <text x="221" y="252" textAnchor="middle"
        fill="rgba(247,245,242,.45)" fontSize="10"
        fontFamily="Inter,system-ui,sans-serif">conocimiento</text>

      {/* Gateway 1 — split */}
      <polygon points="350,220 370,240 350,260 330,240"
        fill="rgba(39,50,59,.8)" stroke="rgba(247,245,242,.18)" strokeWidth="1"/>
      <text x="350" y="245" textAnchor="middle"
        fill="rgba(247,245,242,.28)" fontSize="13"
        fontFamily="Inter,system-ui,sans-serif" fontWeight="300">+</text>

      {/* Tarea B: Revisar excepciones (rama superior, muted) */}
      <rect x="393" y="136" width="132" height="46" rx="6"
        fill="rgba(39,50,59,.45)" stroke="rgba(247,245,242,.06)" strokeWidth="1"/>
      <text x="459" y="157" textAnchor="middle"
        fill="rgba(247,245,242,.28)" fontSize="11"
        fontFamily="Inter,system-ui,sans-serif">Revisar</text>
      <text x="459" y="172" textAnchor="middle"
        fill="rgba(247,245,242,.15)" fontSize="9.5"
        fontFamily="Inter,system-ui,sans-serif">excepciones</text>

      {/* Tarea C: Estructurar el proceso (path principal) */}
      <rect x="393" y="217" width="132" height="46" rx="6"
        fill="rgba(39,50,59,.98)" stroke="rgba(249,80,104,.28)" strokeWidth="1"
        filter="url(#g-soft)"/>
      <text x="459" y="237" textAnchor="middle"
        fill="rgba(247,245,242,.9)" fontSize="11.5"
        fontFamily="Inter,system-ui,sans-serif" fontWeight="600">Estructurar</text>
      <text x="459" y="252" textAnchor="middle"
        fill="rgba(247,245,242,.46)" fontSize="9.5"
        fontFamily="Inter,system-ui,sans-serif">el proceso</text>

      {/* Tarea D: Documentar variantes (rama inferior, muted) */}
      <rect x="393" y="298" width="132" height="46" rx="6"
        fill="rgba(39,50,59,.45)" stroke="rgba(247,245,242,.06)" strokeWidth="1"/>
      <text x="459" y="319" textAnchor="middle"
        fill="rgba(247,245,242,.28)" fontSize="11"
        fontFamily="Inter,system-ui,sans-serif">Documentar</text>
      <text x="459" y="334" textAnchor="middle"
        fill="rgba(247,245,242,.15)" fontSize="9.5"
        fontFamily="Inter,system-ui,sans-serif">variantes</text>

      {/* Gateway 2 — merge */}
      <polygon points="568,220 588,240 568,260 548,240"
        fill="rgba(39,50,59,.8)" stroke="rgba(247,245,242,.18)" strokeWidth="1"/>

      {/* Tarea E: Publicar y validar */}
      <rect x="611" y="217" width="130" height="46" rx="6"
        fill="rgba(39,50,59,.9)" stroke="rgba(247,245,242,.1)" strokeWidth="1"/>
      <text x="676" y="237" textAnchor="middle"
        fill="rgba(247,245,242,.88)" fontSize="11.5"
        fontFamily="Inter,system-ui,sans-serif" fontWeight="500">Publicar</text>
      <text x="676" y="252" textAnchor="middle"
        fill="rgba(247,245,242,.45)" fontSize="10"
        fontFamily="Inter,system-ui,sans-serif">y validar</text>

      {/* Evento de fin */}
      <circle cx="791" cy="240" r="22" fill="rgba(249,80,104,.05)" stroke="none"/>
      <circle cx="791" cy="240" r="14" fill="rgba(249,80,104,.14)" stroke="#F95068" strokeWidth="2.5" filter="url(#g-coral)"/>
      <circle cx="791" cy="240" r="8"  fill="#F95068" opacity=".95"/>

      {/* Etiquetas atmosféricas */}
      <text x="40" y="32"
        fill="rgba(247,245,242,.07)" fontSize="8.5"
        fontFamily="Inter,system-ui,sans-serif" letterSpacing=".12em" fontWeight="500">PROCESO · PROOCESS</text>
      <text x="860" y="460" textAnchor="end"
        fill="rgba(247,245,242,.055)" fontSize="8"
        fontFamily="Inter,system-ui,sans-serif">v2.4 · automatizado</text>
    </svg>
  )
}
