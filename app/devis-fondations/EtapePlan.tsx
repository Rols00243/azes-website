'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import {
  ArrowUpTrayIcon,
  ArrowsPointingOutIcon,
  CursorArrowRaysIcon,
  DocumentMagnifyingGlassIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import { analyserDXF, facteurDeduit, type AnalyseDXF } from '@/lib/fondations/plans/dxf'
import { extraireImagesPDF, compterPagesPDF } from '@/lib/fondations/plans/pdf'
import {
  echelleParReference,
  releverTraces,
  type ApportPlan,
  type Point,
  type RoleTrace,
  type Trace,
} from '@/lib/fondations/plans/mesure'
import { formatNombre } from '@/lib/fondations/format'
import { Carte, ChampNombre, ChampSelect, Grille, Note, Statistique } from './ui'

type Mode = 'nav' | 'calibrer' | 'tracer' | 'compter'

const MODES: { cle: Mode; label: string; icone: React.ComponentType<{ className?: string }> }[] = [
  { cle: 'nav', label: 'Déplacer', icone: ArrowsPointingOutIcon },
  { cle: 'calibrer', label: '1 · Calibrer', icone: CursorArrowRaysIcon },
  { cle: 'tracer', label: '2 · Tracer', icone: PencilIcon },
  { cle: 'compter', label: '3 · Poteaux', icone: MapPinIcon },
]

const CONSIGNES: Record<Mode, string> = {
  nav: 'Faites glisser pour déplacer le plan, pincez ou molette pour zoomer.',
  calibrer:
    "Touchez les deux extrémités d'une cote connue du plan, puis saisissez sa longueur réelle en mètres.",
  tracer:
    "Touchez les angles successifs d'un mur de fondation. « Terminer le tracé » clôt la ligne en cours.",
  compter: 'Touchez chaque poteau ou semelle isolée du plan pour les compter.',
}

const COULEURS: Record<string, string> = {
  perimetre: '#1B4F8C',
  refend: '#2A7A4B',
  autre: '#C4894A',
  calibration: '#C0392B',
}

const ROLES: { valeur: RoleTrace | ''; label: string }[] = [
  { valeur: '', label: '— ignorer —' },
  { valeur: 'perimetre', label: 'Périmètre' },
  { valeur: 'refend', label: 'Refend' },
  { valeur: 'autre', label: 'Autre linéaire' },
]

const UNITES: { valeur: number; label: string }[] = [
  { valeur: 0.001, label: 'millimètres' },
  { valeur: 0.01, label: 'centimètres' },
  { valeur: 1, label: 'mètres' },
  { valeur: 0.0254, label: 'pouces' },
  { valeur: 0.3048, label: 'pieds' },
]

interface Calibration {
  a: Point
  b: Point | null
  metres: number
}

interface Props {
  onApport: (apport: ApportPlan) => void
}

export default function EtapePlan({ onApport }: Props) {
  const [message, setMessage] = useState('')
  const [erreur, setErreur] = useState(false)
  const [nomFichier, setNomFichier] = useState('')

  // Analyse DXF
  const [dxf, setDxf] = useState<AnalyseDXF | null>(null)
  const [facteur, setFacteur] = useState(1)
  const [roles, setRoles] = useState<Record<string, RoleTrace | ''>>({})
  const [blocPoteau, setBlocPoteau] = useState('')

  // Mesure sur image
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [mode, setMode] = useState<Mode>('nav')
  const [calibration, setCalibration] = useState<Calibration | null>(null)
  const [metresParPixel, setMetresParPixel] = useState(0)
  const [traces, setTraces] = useState<Trace[]>([])
  const [traceEnCours, setTraceEnCours] = useState<Trace | null>(null)
  const [role, setRole] = useState<RoleTrace>('perimetre')
  const [poteaux, setPoteaux] = useState<Point[]>([])

  const toileRef = useRef<HTMLCanvasElement>(null)
  const fichierRef = useRef<HTMLInputElement>(null)
  const vue = useRef({ k: 1, x: 0, y: 0 })
  const pointeurs = useRef(new Map<number, Point>())
  const depart = useRef<Point | null>(null)
  const deplace = useRef(false)
  const pincement = useRef(0)
  const [tick, setTick] = useState(0)
  const redessiner = useCallback(() => setTick((t) => t + 1), [])

  const informer = (texte: string, estErreur = false) => {
    setMessage(texte)
    setErreur(estErreur)
  }

  /* ────────────────────────────  Chargement  ──────────────────────────── */

  const chargerImage = useCallback((source: Blob, texte: string) => {
    const img = new Image()
    img.onload = () => {
      setDxf(null)
      setImage(img)
      setCalibration(null)
      setMetresParPixel(0)
      setTraces([])
      setTraceEnCours(null)
      setPoteaux([])
      setMode('calibrer')
      informer(`${texte} ${img.naturalWidth} × ${img.naturalHeight} pixels.`)
    }
    img.onerror = () => informer('Image illisible.', true)
    img.src = URL.createObjectURL(source)
  }, [])

  const chargerDXF = useCallback((contenu: string, nom: string) => {
    const analyse = analyserDXF(contenu)
    if (!analyse.entites) {
      informer("Aucune entité de dessin trouvée dans ce DXF.", true)
      return
    }
    const deduit = facteurDeduit(analyse)
    // Un plan superpose semelle, longrine et axe sur le même mur : on ne retient
    // d'office qu'un seul calque en périmètre pour ne pas compter deux fois.
    const choix: Record<string, RoleTrace | ''> = {}
    let perimetrePris = false
    analyse.calquesSuggeres.forEach((calque) => {
      if (/refend|interieur|intérieur/i.test(calque)) choix[calque] = 'refend'
      else if (!perimetrePris) {
        choix[calque] = 'perimetre'
        perimetrePris = true
      } else choix[calque] = ''
    })
    setImage(null)
    setDxf(analyse)
    setFacteur(deduit.facteur)
    setRoles(choix)
    setBlocPoteau(analyse.blocsSuggeres[0] || analyse.blocs[0]?.nom || '')
    informer(
      `${nom} : ${analyse.entites} entités, ${analyse.calques.length} calques, unité ${deduit.unite}.`
    )
  }, [])

  const lireFichier = useCallback(
    (fichier: File) => {
      setNomFichier(fichier.name)
      const nom = fichier.name.toLowerCase()
      informer(`Lecture de « ${fichier.name} »…`)

      if (nom.endsWith('.dxf')) {
        const lecteur = new FileReader()
        lecteur.onload = () => {
          try {
            chargerDXF(String(lecteur.result), fichier.name)
          } catch (e) {
            informer(`Ce DXF n'a pas pu être lu : ${(e as Error).message}`, true)
          }
        }
        lecteur.onerror = () => informer('Lecture du fichier impossible.', true)
        lecteur.readAsText(fichier)
        return
      }

      if (nom.endsWith('.pdf')) {
        const lecteur = new FileReader()
        lecteur.onload = () => {
          const octets = new Uint8Array(lecteur.result as ArrayBuffer)
          const images = extraireImagesPDF(octets)
          if (!images.length) {
            informer(
              "Ce PDF est vectoriel : il ne contient aucune image à mesurer. Exportez le plan en DXF (mesures exactes) ou en image depuis votre logiciel de dessin.",
              true
            )
            return
          }
          const pages = compterPagesPDF(octets)
          // Copie dans un tampon neuf : la vue extraite pointe sur le PDF entier.
          const jpeg = new Uint8Array(images[0].donnees)
          chargerImage(
            new Blob([jpeg.buffer as ArrayBuffer], { type: 'image/jpeg' }),
            `Image du PDF extraite${pages > 1 ? ` (la plus lourde sur ${pages} pages)` : ''}.`
          )
        }
        lecteur.readAsArrayBuffer(fichier)
        return
      }

      chargerImage(fichier, 'Plan chargé.')
    },
    [chargerDXF, chargerImage]
  )

  /* ──────────────────────────────  Dessin  ────────────────────────────── */

  const cadrer = useCallback(() => {
    const toile = toileRef.current
    if (!toile || !image) return
    const rect = toile.getBoundingClientRect()
    const k = Math.min(rect.width / image.naturalWidth, rect.height / image.naturalHeight)
    vue.current = {
      k,
      x: (rect.width - image.naturalWidth * k) / 2,
      y: (rect.height - image.naturalHeight * k) / 2,
    }
  }, [image])

  useEffect(() => {
    if (!image) return
    const toile = toileRef.current
    if (!toile) return
    const ajuster = () => {
      const rect = toile.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      toile.width = Math.max(1, Math.round(rect.width * dpr))
      toile.height = Math.max(1, Math.round(rect.height * dpr))
      const ctx = toile.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cadrer()
      redessiner()
    }
    ajuster()
    window.addEventListener('resize', ajuster)
    return () => window.removeEventListener('resize', ajuster)
  }, [image, cadrer, redessiner])

  useEffect(() => {
    const toile = toileRef.current
    const ctx = toile?.getContext('2d')
    if (!toile || !ctx || !image) return
    const rect = toile.getBoundingClientRect()
    const versEcran = (p: Point): Point => [
      p[0] * vue.current.k + vue.current.x,
      p[1] * vue.current.k + vue.current.y,
    ]

    ctx.clearRect(0, 0, rect.width, rect.height)
    ctx.save()
    ctx.translate(vue.current.x, vue.current.y)
    ctx.scale(vue.current.k, vue.current.k)
    ctx.drawImage(image, 0, 0)
    ctx.restore()

    const marqueur = (p: Point, couleur: string) => {
      ctx.fillStyle = couleur
      ctx.beginPath()
      ctx.arc(p[0], p[1], 4.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    const tracer = (t: Trace, enCours: boolean) => {
      if (!t.points.length) return
      const couleur = COULEURS[t.role] || COULEURS.autre
      ctx.strokeStyle = couleur
      ctx.lineWidth = enCours ? 2.5 : 2
      ctx.setLineDash(enCours ? [5, 3] : [])
      ctx.beginPath()
      t.points.forEach((p, i) => {
        const e = versEcran(p)
        if (i === 0) ctx.moveTo(e[0], e[1])
        else ctx.lineTo(e[0], e[1])
      })
      if (t.ferme && t.points.length > 2) ctx.closePath()
      ctx.stroke()
      ctx.setLineDash([])
      t.points.forEach((p) => marqueur(versEcran(p), couleur))
    }

    traces.forEach((t) => tracer(t, false))
    if (traceEnCours) tracer(traceEnCours, true)

    if (calibration) {
      const a = versEcran(calibration.a)
      if (calibration.b) {
        const b = versEcran(calibration.b)
        ctx.strokeStyle = COULEURS.calibration
        ctx.lineWidth = 2
        ctx.setLineDash([6, 4])
        ctx.beginPath()
        ctx.moveTo(a[0], a[1])
        ctx.lineTo(b[0], b[1])
        ctx.stroke()
        ctx.setLineDash([])
        marqueur(b, COULEURS.calibration)
      }
      marqueur(a, COULEURS.calibration)
    }

    poteaux.forEach((p) => {
      const e = versEcran(p)
      ctx.strokeStyle = COULEURS.calibration
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(e[0], e[1], 7, 0, Math.PI * 2)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(e[0] - 4, e[1])
      ctx.lineTo(e[0] + 4, e[1])
      ctx.moveTo(e[0], e[1] - 4)
      ctx.lineTo(e[0], e[1] + 4)
      ctx.stroke()
    })
  }, [image, traces, traceEnCours, calibration, poteaux, tick])

  /* ───────────────────────────  Gestes tactiles  ─────────────────────────── */

  const versImage = (x: number, y: number): Point => [
    (x - vue.current.x) / vue.current.k,
    (y - vue.current.y) / vue.current.k,
  ]

  const zoomer = (facteurZoom: number, centre: Point) => {
    const k = Math.max(0.05, Math.min(40, vue.current.k * facteurZoom))
    const reel = k / vue.current.k
    vue.current = {
      k,
      x: centre[0] - (centre[0] - vue.current.x) * reel,
      y: centre[1] - (centre[1] - vue.current.y) * reel,
    }
  }

  const placerPoint = (p: Point) => {
    if (mode === 'calibrer') {
      setCalibration((precedent) => {
        if (!precedent || precedent.b) return { a: p, b: null, metres: precedent?.metres ?? 0 }
        const suivant = { ...precedent, b: p }
        const pixels = Math.hypot(p[0] - precedent.a[0], p[1] - precedent.a[1])
        setMetresParPixel(echelleParReference(pixels, precedent.metres))
        return suivant
      })
    } else if (mode === 'tracer') {
      setTraceEnCours((precedent) => {
        const base: Trace = precedent ?? { id: `t${Date.now()}`, role, points: [], ferme: false }
        return { ...base, role, points: [...base.points, p] }
      })
    } else if (mode === 'compter') {
      setPoteaux((precedent) => [...precedent, p])
    }
    redessiner()
  }

  const surPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    pointeurs.current.set(e.pointerId, [e.nativeEvent.offsetX, e.nativeEvent.offsetY])
    if (pointeurs.current.size === 1) {
      depart.current = [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
      deplace.current = false
    } else if (pointeurs.current.size === 2) {
      const pts = [...pointeurs.current.values()]
      pincement.current = Math.hypot(pts[0][0] - pts[1][0], pts[0][1] - pts[1][1])
    }
  }

  const surPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!pointeurs.current.has(e.pointerId)) return
    const precedent = pointeurs.current.get(e.pointerId) as Point
    const position: Point = [e.nativeEvent.offsetX, e.nativeEvent.offsetY]
    pointeurs.current.set(e.pointerId, position)

    if (pointeurs.current.size === 2) {
      const pts = [...pointeurs.current.values()]
      const d = Math.hypot(pts[0][0] - pts[1][0], pts[0][1] - pts[1][1])
      if (pincement.current > 0) {
        zoomer(d / pincement.current, [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2])
      }
      pincement.current = d
      deplace.current = true
      redessiner()
      return
    }

    if (depart.current && Math.hypot(position[0] - depart.current[0], position[1] - depart.current[1]) > 6) {
      deplace.current = true
    }
    if (deplace.current) {
      vue.current = {
        ...vue.current,
        x: vue.current.x + (position[0] - precedent[0]),
        y: vue.current.y + (position[1] - precedent[1]),
      }
      redessiner()
    }
  }

  const surPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const position = pointeurs.current.get(e.pointerId)
    pointeurs.current.delete(e.pointerId)
    if (pointeurs.current.size === 0) pincement.current = 0
    if (deplace.current || !position) return
    placerPoint(versImage(position[0], position[1]))
  }

  /* ───────────────────────────────  Relevé  ─────────────────────────────── */

  const tousTraces = traceEnCours ? [...traces, traceEnCours] : traces
  const releve = releverTraces(tousTraces, metresParPixel)

  const majCalibrage = (metres: number) => {
    setCalibration((precedent) => {
      const suivant: Calibration = precedent
        ? { ...precedent, metres }
        : { a: [0, 0], b: null, metres }
      if (suivant.b) {
        const pixels = Math.hypot(suivant.b[0] - suivant.a[0], suivant.b[1] - suivant.a[1])
        setMetresParPixel(echelleParReference(pixels, metres))
      }
      return suivant
    })
  }

  const terminerTrace = () => {
    if (traceEnCours && traceEnCours.points.length > 1) {
      setTraces((precedent) => [
        ...precedent,
        {
          ...traceEnCours,
          ferme: traceEnCours.role === 'perimetre' && traceEnCours.points.length > 2,
        },
      ])
    }
    setTraceEnCours(null)
    redessiner()
  }

  const annuler = () => {
    if (mode === 'compter') setPoteaux((p) => p.slice(0, -1))
    else if (traceEnCours && traceEnCours.points.length) {
      const points = traceEnCours.points.slice(0, -1)
      setTraceEnCours(points.length ? { ...traceEnCours, points } : null)
    } else if (traces.length) {
      const dernier = traces[traces.length - 1]
      setTraces((p) => p.slice(0, -1))
      setTraceEnCours({ ...dernier, ferme: false })
    }
    redessiner()
  }

  const toutEffacer = () => {
    setTraces([])
    setTraceEnCours(null)
    setPoteaux([])
    setCalibration(null)
    setMetresParPixel(0)
    redessiner()
  }

  /* ───────────────────────────────  Apport  ─────────────────────────────── */

  const construireApport = (): ApportPlan | null => {
    if (dxf) {
      const parRole: Record<string, number> = { perimetre: 0, refend: 0, autre: 0 }
      dxf.calques.forEach((c) => {
        const r = roles[c.nom]
        if (r) parRole[r] += c.longueur * facteur
      })
      const poteauxDxf = dxf.blocs.find((b) => b.nom === blocPoteau)?.nombre ?? 0
      let dimensions: { longueur: number; largeur: number } | undefined
      let emprise = 0
      if (dxf.bbox) {
        const L = (dxf.bbox.xMax - dxf.bbox.xMin) * facteur
        const l = (dxf.bbox.yMax - dxf.bbox.yMin) * facteur
        if (L > 0 && l > 0 && L < 500 && l < 500) {
          dimensions = { longueur: L, largeur: l }
          emprise = L * l
        }
      }
      return {
        segments: [
          { nom: 'Périmètre (plan)', longueur: parRole.perimetre, nombre: 1 },
          { nom: 'Refends (plan)', longueur: parRole.refend, nombre: 1 },
          { nom: 'Autre linéaire (plan)', longueur: parRole.autre, nombre: 1 },
        ],
        poteaux: poteauxDxf,
        emprise,
        dimensions,
        source: `DXF ${nomFichier}`,
      }
    }

    if (image && metresParPixel > 0) {
      return {
        segments: [
          { nom: 'Périmètre (plan)', longueur: releve.parRole.perimetre, nombre: 1 },
          { nom: 'Refends (plan)', longueur: releve.parRole.refend, nombre: 1 },
          { nom: 'Autre linéaire (plan)', longueur: releve.parRole.autre, nombre: 1 },
        ],
        poteaux: poteaux.length,
        emprise: releve.aire,
        source: `Plan mesuré ${nomFichier}`,
      }
    }

    return null
  }

  const apport = construireApport()
  const totalApport = apport ? apport.segments.reduce((s, x) => s + x.longueur, 0) : 0

  /* ────────────────────────────────  Rendu  ──────────────────────────────── */

  return (
    <div className="space-y-5">
      <Carte
        titre="Analyse de plan"
        description="DXF, PDF ou photo — le linéaire relevé alimente directement le métré."
        icone={DocumentMagnifyingGlassIcon}
      >
        <button
          type="button"
          onClick={() => fichierRef.current?.click()}
          className="w-full flex flex-col items-center gap-1 py-7 px-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#1B4F8C] hover:bg-blue-50/40 transition-colors"
        >
          <ArrowUpTrayIcon className="w-6 h-6 text-[#1B4F8C]" />
          <span className="text-sm font-semibold text-[#1B4F8C]">Choisir un plan de fondation</span>
          <span className="text-[11px] text-gray-500 text-center leading-snug">
            DXF : mesures exactes, automatiques · PDF scanné, photo ou capture : mesure à
            l&apos;échelle
          </span>
        </button>
        <input
          ref={fichierRef}
          type="file"
          accept=".dxf,.pdf,image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) lireFichier(f)
            e.target.value = ''
          }}
        />

        {message && (
          <p
            className={clsx(
              'text-xs rounded-xl px-3.5 py-3 border leading-relaxed',
              erreur
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-gray-50 border-gray-200 text-gray-600'
            )}
          >
            {message}
          </p>
        )}

        {/* ─────────── DXF ─────────── */}
        {dxf && (
          <>
            <Grille>
              <ChampSelect<number>
                label="Unité du dessin"
                valeur={facteur}
                options={UNITES.map((u) => ({ valeur: u.valeur, label: u.label }))}
                onChange={setFacteur}
              />
              {dxf.blocs.length > 0 && (
                <ChampSelect<string>
                  label="Bloc représentant un poteau"
                  valeur={blocPoteau}
                  options={[
                    { valeur: '', label: '— aucun —' },
                    ...dxf.blocs.map((b) => ({ valeur: b.nom, label: `${b.nom} (${b.nombre})` })),
                  ]}
                  onChange={setBlocPoteau}
                />
              )}
            </Grille>

            <Note>
              Indiquez le rôle de chaque calque : seuls ceux que vous retenez alimentent le linéaire.
              Sur un plan, semelle, longrine et axe se superposent sur le même mur — les additionner
              compterait plusieurs fois le même métré.
            </Note>

            <div className="space-y-2">
              {dxf.calques.map((c) => (
                <div
                  key={c.nom}
                  className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-semibold text-[#0A2342] truncate">{c.nom}</div>
                    <div className="text-[11px] text-gray-500 tabular-nums">
                      {formatNombre(c.longueur * facteur)} m · {c.entites} entités
                      {c.inserts > 0 && ` · ${c.inserts} blocs`}
                      {c.approximatif && ' · courbes approchées'}
                    </div>
                  </div>
                  <select
                    value={roles[c.nom] ?? ''}
                    onChange={(e) =>
                      setRoles((precedent) => ({
                        ...precedent,
                        [c.nom]: e.target.value as RoleTrace | '',
                      }))
                    }
                    aria-label={`Rôle du calque ${c.nom}`}
                    className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#1B4F8C] min-w-[150px]"
                  >
                    {ROLES.map((r) => (
                      <option key={r.valeur} value={r.valeur}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {dxf.bbox && (
              <Statistique
                label="Emprise du dessin"
                valeur={`${formatNombre((dxf.bbox.xMax - dxf.bbox.xMin) * facteur)} × ${formatNombre(
                  (dxf.bbox.yMax - dxf.bbox.yMin) * facteur
                )}`}
                unite="m"
              />
            )}
          </>
        )}

        {/* ─────────── Image ─────────── */}
        {image && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {MODES.map((m) => (
                <button
                  key={m.cle}
                  type="button"
                  onClick={() => setMode(m.cle)}
                  className={clsx(
                    'flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl text-xs font-semibold transition-colors border',
                    mode === m.cle
                      ? 'bg-[#1B4F8C] border-[#1B4F8C] text-white'
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-[#1B4F8C] hover:text-[#1B4F8C]'
                  )}
                >
                  <m.icone className="w-4 h-4" />
                  {m.label}
                </button>
              ))}
            </div>

            <p className="text-xs text-gray-500 bg-gray-50 border-l-[3px] border-[#1B4F8C] rounded-r-lg px-3 py-2.5 leading-relaxed">
              {CONSIGNES[mode]}
            </p>

            <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 touch-none">
              <canvas
                ref={toileRef}
                className="block w-full h-[58vh] max-h-[460px]"
                onPointerDown={surPointerDown}
                onPointerMove={surPointerMove}
                onPointerUp={surPointerUp}
                onPointerCancel={(e) => pointeurs.current.delete(e.pointerId)}
                onWheel={(e) => {
                  zoomer(e.deltaY < 0 ? 1.15 : 1 / 1.15, [
                    e.nativeEvent.offsetX,
                    e.nativeEvent.offsetY,
                  ])
                  redessiner()
                }}
              />
            </div>

            <Grille>
              <ChampNombre
                label="Longueur réelle de la cote calibrée"
                valeur={calibration?.metres ?? 0}
                onChange={majCalibrage}
                unite="m"
                aide="Une cote portée sur le plan, ou une longueur connue sur le terrain."
              />
              <ChampSelect<RoleTrace>
                label="Rôle du tracé en cours"
                valeur={role}
                options={[
                  { valeur: 'perimetre', label: 'Périmètre' },
                  { valeur: 'refend', label: 'Refend' },
                  { valeur: 'autre', label: 'Autre linéaire' },
                ]}
                onChange={setRole}
                aide="Un périmètre fermé donne aussi la surface."
              />
            </Grille>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={terminerTrace}
                className="py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-600 hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors"
              >
                Terminer le tracé
              </button>
              <button
                type="button"
                onClick={annuler}
                className="py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-600 hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={toutEffacer}
                className="py-2.5 rounded-xl border border-gray-300 text-xs font-semibold text-gray-600 hover:border-red-400 hover:text-red-500 transition-colors"
              >
                Tout effacer
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Statistique
                label="Échelle"
                valeur={metresParPixel > 0 ? formatNombre(metresParPixel * 1000, 1) : '—'}
                unite={metresParPixel > 0 ? 'mm/px' : ''}
              />
              <Statistique label="Périmètre" valeur={formatNombre(releve.parRole.perimetre)} unite="ml" />
              <Statistique label="Refends" valeur={formatNombre(releve.parRole.refend)} unite="ml" accent="#2A7A4B" />
              <Statistique label="Poteaux" valeur={String(poteaux.length)} unite="u." accent="#C4894A" />
            </div>
            {releve.aire > 0 && (
              <Statistique label="Surface fermée" valeur={formatNombre(releve.aire)} unite="m²" accent="#C4894A" />
            )}
          </>
        )}

        {apport && totalApport > 0 && (
          <>
            <p className="text-xs text-[#1d5535] bg-green-50 border border-green-200 rounded-xl px-3.5 py-3">
              Prêt à reporter : <strong>{formatNombre(totalApport)} ml</strong> de fondation
              {apport.poteaux ? <>, <strong>{apport.poteaux}</strong> poteaux</> : null}
              {apport.emprise ? <>, emprise <strong>{formatNombre(apport.emprise)} m²</strong></> : null}.
            </p>
            <button
              type="button"
              onClick={() => onApport(apport)}
              className="w-full py-3.5 bg-[#1B4F8C] text-white font-semibold rounded-xl hover:bg-[#163f70] transition-colors text-sm"
            >
              Reporter dans le métré
            </button>
          </>
        )}
      </Carte>
    </div>
  )
}
