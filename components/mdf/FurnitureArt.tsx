import type { ArtKind } from '@/lib/mdf/data'

/**
 * Illustrations au trait des huit familles de meubles.
 *
 * Dessinées en SVG plutôt que photographiées : rien à charger, rien à
 * licencier, et un rendu identique en toute circonstance. Pour passer à de
 * vraies photos plus tard, il suffit de remplacer le <svg> par une <Image />
 * en gardant le même conteneur et le même ratio.
 */

const S = {
  trait: '#C9995F',
  traitFaible: 'rgba(201,153,95,0.42)',
  panneau: 'rgba(201,153,95,0.10)',
  creux: 'rgba(20,16,12,0.55)',
}

function Cuisine() {
  return (
    <>
      {/* meubles hauts */}
      <rect x="28" y="34" width="96" height="70" fill={S.panneau} />
      <rect x="128" y="34" width="62" height="70" fill={S.panneau} />
      <line x1="76" y1="34" x2="76" y2="104" />
      {/* hotte */}
      <path d="M206 34h72v22l-16 16h-40l-16-16z" fill={S.panneau} />
      <rect x="238" y="34" width="8" height="10" fill={S.creux} />
      <rect x="294" y="34" width="78" height="70" fill={S.panneau} />
      <line x1="333" y1="34" x2="333" y2="104" />
      {/* plan de travail */}
      <rect x="20" y="168" width="360" height="9" fill={S.trait} opacity="0.55" />
      {/* meubles bas */}
      <rect x="28" y="177" width="88" height="86" fill={S.panneau} />
      <line x1="28" y1="205" x2="116" y2="205" />
      <line x1="28" y1="233" x2="116" y2="233" />
      <rect x="120" y="177" width="110" height="86" fill={S.panneau} />
      {/* évier */}
      <rect x="140" y="150" width="70" height="18" fill={S.creux} />
      <path d="M175 150v-24a10 10 0 0 1 20 0" fill="none" />
      <rect x="234" y="177" width="66" height="86" fill={S.panneau} />
      {/* four */}
      <rect x="304" y="177" width="68" height="86" fill={S.panneau} />
      <rect x="314" y="190" width="48" height="34" fill={S.creux} />
      {/* plinthe */}
      <line x1="28" y1="263" x2="372" y2="263" strokeWidth="4" />
      {/* poignées */}
      <g stroke={S.traitFaible}>
        <line x1="60" y1="191" x2="86" y2="191" />
        <line x1="60" y1="219" x2="86" y2="219" />
        <line x1="160" y1="191" x2="190" y2="191" />
        <line x1="252" y1="191" x2="282" y2="191" />
        <line x1="66" y1="94" x2="86" y2="94" />
        <line x1="150" y1="94" x2="170" y2="94" />
        <line x1="316" y1="94" x2="350" y2="94" />
      </g>
    </>
  )
}

function Dressing() {
  return (
    <>
      <rect x="30" y="24" width="340" height="248" fill={S.panneau} />
      <line x1="145" y1="24" x2="145" y2="272" />
      <line x1="255" y1="24" x2="255" y2="272" />
      {/* penderie longue */}
      <line x1="42" y1="58" x2="133" y2="58" strokeWidth="3" />
      {[54, 74, 94, 114].map((x) => (
        <path
          key={x}
          d={`M${x} 58v9M${x - 9} 86L${x + 9} 86L${x} 67Z`}
          fill="none"
          strokeWidth="1.2"
        />
      ))}
      {/* penderie courte + tablettes */}
      <line x1="157" y1="52" x2="243" y2="52" strokeWidth="3" />
      {[172, 190, 208, 226].map((x) => (
        <path
          key={x}
          d={`M${x} 52v8M${x - 8} 78L${x + 8} 78L${x} 60Z`}
          fill="none"
          strokeWidth="1.2"
        />
      ))}
      <line x1="157" y1="150" x2="243" y2="150" />
      <line x1="157" y1="192" x2="243" y2="192" />
      {/* tiroirs */}
      {[38, 82, 126, 170, 214].map((y) => (
        <rect key={y} x="267" y={y} width="90" height="36" fill="none" />
      ))}
      <g stroke={S.traitFaible}>
        {[56, 100, 144, 188, 232].map((y) => (
          <line key={y} x1="296" y1={y} x2="328" y2={y} />
        ))}
      </g>
      {/* chaussures inclinées */}
      <g stroke={S.traitFaible}>
        <path d="M42 132l91-14M42 174l91-14M42 216l91-14" fill="none" />
      </g>
      <line x1="30" y1="272" x2="370" y2="272" strokeWidth="4" />
    </>
  )
}

function Tv() {
  return (
    <>
      {/* écran */}
      <rect x="118" y="36" width="164" height="96" fill={S.creux} />
      <rect x="118" y="36" width="164" height="96" fill="none" />
      {/* colonnes latérales */}
      <rect x="24" y="24" width="76" height="130" fill={S.panneau} />
      <line x1="24" y1="70" x2="100" y2="70" />
      <line x1="24" y1="112" x2="100" y2="112" />
      <rect x="300" y="24" width="76" height="130" fill={S.panneau} />
      <line x1="300" y1="70" x2="376" y2="70" />
      <line x1="300" y1="112" x2="376" y2="112" />
      {/* meuble bas suspendu */}
      <rect x="24" y="188" width="352" height="58" fill={S.panneau} />
      <line x1="141" y1="188" x2="141" y2="246" />
      <line x1="259" y1="188" x2="259" y2="246" />
      <g stroke={S.traitFaible}>
        <line x1="62" y1="217" x2="104" y2="217" />
        <line x1="179" y1="217" x2="221" y2="217" />
        <line x1="297" y1="217" x2="339" y2="217" />
      </g>
      {/* lumière indirecte */}
      <path d="M28 252h344" strokeWidth="2" stroke={S.traitFaible} />
      <path d="M46 262h308" strokeWidth="1" stroke="rgba(201,153,95,0.22)" />
      <path d="M70 270h260" strokeWidth="1" stroke="rgba(201,153,95,0.12)" />
    </>
  )
}

function Bibliotheque() {
  const livres = (x0: number, y: number, n: number) => (
    <g stroke={S.traitFaible} strokeWidth="2.4">
      {Array.from({ length: n }).map((_, i) => (
        <line key={i} x1={x0 + i * 7} y1={y - (i % 4) * 4 - 16} x2={x0 + i * 7} y2={y - 2} />
      ))}
    </g>
  )
  return (
    <>
      <rect x="26" y="20" width="348" height="252" fill={S.panneau} />
      <line x1="142" y1="20" x2="142" y2="272" />
      <line x1="258" y1="20" x2="258" y2="272" />
      {[74, 122, 176, 224].map((y) => (
        <line key={y} x1="26" y1={y} x2="374" y2={y} />
      ))}
      {livres(38, 74, 12)}
      {livres(154, 74, 9)}
      {livres(270, 122, 13)}
      {livres(38, 176, 10)}
      {livres(270, 224, 11)}
      {/* objets */}
      <rect x="158" y="150" width="26" height="26" fill="none" />
      <path d="M290 176l14-24 14 24z" fill="none" />
      <circle cx="60" cy="210" r="13" fill="none" />
      <line x1="26" y1="272" x2="374" y2="272" strokeWidth="4" />
    </>
  )
}

function Bureau() {
  return (
    <>
      {/* plateau */}
      <rect x="34" y="150" width="332" height="12" fill={S.trait} opacity="0.55" />
      {/* caisson */}
      <rect x="52" y="162" width="86" height="94" fill={S.panneau} />
      <line x1="52" y1="192" x2="138" y2="192" />
      <line x1="52" y1="224" x2="138" y2="224" />
      <g stroke={S.traitFaible}>
        <line x1="82" y1="177" x2="108" y2="177" />
        <line x1="82" y1="208" x2="108" y2="208" />
        <line x1="82" y1="240" x2="108" y2="240" />
      </g>
      {/* piètement */}
      <path d="M330 162v94M282 162v94" fill="none" />
      <line x1="272" y1="256" x2="340" y2="256" strokeWidth="3" />
      {/* écran */}
      <rect x="150" y="64" width="120" height="70" fill={S.creux} />
      <rect x="150" y="64" width="120" height="70" fill="none" />
      <path d="M210 134v16h-22h44" fill="none" />
      {/* lampe */}
      <path d="M320 150v-52l-30-22" fill="none" />
      <path d="M276 70l24 12-8 14-22-12z" fill={S.panneau} />
      {/* accessoires */}
      <rect x="60" y="132" width="34" height="18" fill="none" />
      <path d="M96 150v-22h10v22" fill="none" />
      {/* passe-câble */}
      <ellipse cx="240" cy="156" rx="12" ry="3" fill={S.creux} />
      <path d="M240 159c0 22-14 30-14 52" fill="none" stroke={S.traitFaible} strokeDasharray="4 4" />
    </>
  )
}

function Chambre() {
  return (
    <>
      {/* tête de lit cannelée */}
      <rect x="86" y="26" width="228" height="130" fill={S.panneau} />
      <g stroke={S.traitFaible} strokeWidth="1.2">
        {Array.from({ length: 17 }).map((_, i) => (
          <line key={i} x1={98 + i * 13} y1="34" x2={98 + i * 13} y2="148" />
        ))}
      </g>
      {/* lit */}
      <rect x="70" y="156" width="260" height="26" fill={S.panneau} />
      <rect x="70" y="182" width="260" height="46" fill="none" />
      <line x1="70" y1="228" x2="330" y2="228" strokeWidth="3" />
      {/* oreillers */}
      <rect x="104" y="128" width="82" height="28" rx="6" fill={S.creux} />
      <rect x="214" y="128" width="82" height="28" rx="6" fill={S.creux} />
      {/* chevets suspendus */}
      <rect x="16" y="146" width="46" height="34" fill={S.panneau} />
      <line x1="16" y1="164" x2="62" y2="164" />
      <rect x="338" y="146" width="46" height="34" fill={S.panneau} />
      <line x1="338" y1="164" x2="384" y2="164" />
      {/* liseuses */}
      <circle cx="39" cy="96" r="11" fill="none" />
      <line x1="39" y1="107" x2="39" y2="146" stroke={S.traitFaible} />
      <circle cx="361" cy="96" r="11" fill="none" />
      <line x1="361" y1="107" x2="361" y2="146" stroke={S.traitFaible} />
    </>
  )
}

function Comptoir() {
  return (
    <>
      {/* plan surélevé */}
      <rect x="40" y="112" width="320" height="14" fill={S.trait} opacity="0.55" />
      <rect x="52" y="126" width="296" height="120" fill={S.panneau} />
      {/* rainures de façade */}
      <g stroke={S.traitFaible} strokeWidth="1.2">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={64 + i * 21} y1="136" x2={64 + i * 21} y2="238" />
        ))}
      </g>
      {/* retour bas côté client */}
      <rect x="86" y="168" width="226" height="10" fill={S.creux} />
      <line x1="52" y1="246" x2="348" y2="246" strokeWidth="4" />
      {/* enseigne */}
      <rect x="132" y="34" width="136" height="46" fill="none" />
      <line x1="152" y1="58" x2="248" y2="58" stroke={S.traitFaible} strokeWidth="3" />
      <path d="M200 80v32" stroke={S.traitFaible} />
      {/* tabouret */}
      <circle cx="368" cy="188" r="14" fill="none" />
      <path d="M368 202v44M356 246h24" fill="none" />
      {/* écran de caisse */}
      <rect x="242" y="76" width="56" height="34" fill={S.creux} />
    </>
  )
}

function Mural() {
  return (
    <>
      <rect x="24" y="20" width="352" height="252" fill={S.panneau} />
      {/* tasseaux de largeurs alternées */}
      <g stroke={S.traitFaible}>
        {Array.from({ length: 22 }).map((_, i) => {
          const x = 34 + i * 15.5
          return (
            <line
              key={i}
              x1={x}
              y1="30"
              x2={x}
              y2="262"
              strokeWidth={i % 3 === 0 ? 3.2 : 1.2}
              opacity={i % 3 === 0 ? 0.85 : 0.45}
            />
          )
        })}
      </g>
      {/* tablette traversante */}
      <rect x="60" y="140" width="200" height="10" fill={S.trait} opacity="0.6" />
      <path d="M72 140v-30M248 140v-30" fill="none" stroke={S.traitFaible} />
      {/* applique */}
      <circle cx="316" cy="92" r="16" fill={S.creux} />
      <circle cx="316" cy="92" r="16" fill="none" />
      <path d="M300 118h32M292 132h48" stroke="rgba(201,153,95,0.2)" />
      <line x1="24" y1="272" x2="376" y2="272" strokeWidth="4" />
    </>
  )
}

const dessins: Record<ArtKind, () => React.JSX.Element> = {
  cuisine: Cuisine,
  dressing: Dressing,
  tv: Tv,
  bibliotheque: Bibliotheque,
  bureau: Bureau,
  chambre: Chambre,
  comptoir: Comptoir,
  mural: Mural,
}

export default function FurnitureArt({
  kind,
  className = '',
}: {
  kind: ArtKind
  className?: string
}) {
  const Dessin = dessins[kind]
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="presentation"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke={S.trait} strokeWidth="1.5" fill="none" strokeLinecap="square">
        <Dessin />
      </g>
    </svg>
  )
}
