'use client'

import { Bars3BottomLeftIcon, Bars4Icon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { DIAMETRES, MASSE_ACIER } from '@/lib/fondations/constants'
import type { Diametre } from '@/lib/fondations/types'
import { Carte, CaseOption, ChampNombre, ChampSelect, Grille, Note, type EtapeProps } from './ui'

const optionsDiametre = DIAMETRES.map((d) => ({
  valeur: d,
  label: `HA ${d} — ${MASSE_ACIER[d]} kg/ml`,
}))

/** Bandeau affiché quand l'ouvrage porteur du ferraillage est désactivé. */
function OuvrageInactif({ nom }: { nom: string }) {
  return (
    <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-3.5 py-3">
      {nom} est désactivé dans l&apos;onglet <strong>Ouvrages</strong> : ce ferraillage n&apos;est pas
      compté.
    </p>
  )
}

export default function EtapeArmatures({ input, maj }: EtapeProps) {
  const { armSemelle, armLongrine, armNappe, armAmorce } = input

  return (
    <div className="space-y-5">
      <Carte
        titre="Armatures de la semelle filante"
        description="Aciers filants et cadres répartis sur tout le linéaire."
        icone={Bars4Icon}
        actif={armSemelle.actif}
        onToggle={(v) => maj('armSemelle', { actif: v })}
      >
        {!input.semelleFilante.actif && <OuvrageInactif nom="La semelle filante" />}
        <Grille>
          <ChampSelect<Diametre>
            label="Diamètre des aciers filants"
            valeur={armSemelle.diametreLong}
            options={optionsDiametre}
            onChange={(v) => maj('armSemelle', { diametreLong: v })}
          />
          <ChampNombre
            label="Nombre de barres filantes"
            valeur={armSemelle.nombreBarres}
            onChange={(v) => maj('armSemelle', { nombreBarres: v })}
            aide="4 barres pour une semelle courante de maison."
          />
          <ChampSelect<Diametre>
            label="Diamètre des cadres"
            valeur={armSemelle.diametreCadre}
            options={optionsDiametre}
            onChange={(v) => maj('armSemelle', { diametreCadre: v })}
          />
          <ChampNombre
            label="Espacement des cadres"
            valeur={armSemelle.espacementCadre}
            onChange={(v) => maj('armSemelle', { espacementCadre: v })}
            unite="m"
          />
          <ChampNombre
            label="Enrobage"
            valeur={armSemelle.enrobage}
            onChange={(v) => maj('armSemelle', { enrobage: v })}
            unite="m"
            aide="3 cm minimum, 5 cm en sol agressif."
          />
          <ChampNombre
            label="Recouvrements et chutes"
            valeur={armSemelle.recouvrement}
            onChange={(v) => maj('armSemelle', { recouvrement: v })}
            unite="%"
          />
        </Grille>
      </Carte>

      <Carte
        titre="Nappes des semelles isolées"
        description="Quadrillage inférieur, éventuellement doublé en partie supérieure."
        icone={Squares2X2Icon}
        actif={armNappe.actif}
        onToggle={(v) => maj('armNappe', { actif: v })}
        accent="#2A7A4B"
      >
        {!input.semelleIsolee.actif && <OuvrageInactif nom="Les semelles isolées" />}
        <Grille>
          <ChampSelect<Diametre>
            label="Diamètre"
            valeur={armNappe.diametre}
            options={optionsDiametre}
            onChange={(v) => maj('armNappe', { diametre: v })}
          />
          <ChampNombre
            label="Espacement des barres"
            valeur={armNappe.espacement}
            onChange={(v) => maj('armNappe', { espacement: v })}
            unite="m"
          />
          <ChampNombre
            label="Enrobage"
            valeur={armNappe.enrobage}
            onChange={(v) => maj('armNappe', { enrobage: v })}
            unite="m"
          />
          <ChampNombre
            label="Recouvrements et chutes"
            valeur={armNappe.recouvrement}
            onChange={(v) => maj('armNappe', { recouvrement: v })}
            unite="%"
          />
        </Grille>
        <CaseOption
          label="Double nappe (inférieure + supérieure)"
          valeur={armNappe.doubleNappe}
          onChange={(v) => maj('armNappe', { doubleNappe: v })}
        />
      </Carte>

      <Carte
        titre="Armatures de la longrine"
        description="Aciers filants et cadres du chaînage bas."
        icone={Bars3BottomLeftIcon}
        actif={armLongrine.actif}
        onToggle={(v) => maj('armLongrine', { actif: v })}
      >
        {!input.longrine.actif && <OuvrageInactif nom="La longrine" />}
        <Grille>
          <ChampSelect<Diametre>
            label="Diamètre des aciers filants"
            valeur={armLongrine.diametreLong}
            options={optionsDiametre}
            onChange={(v) => maj('armLongrine', { diametreLong: v })}
          />
          <ChampNombre
            label="Nombre de barres filantes"
            valeur={armLongrine.nombreBarres}
            onChange={(v) => maj('armLongrine', { nombreBarres: v })}
          />
          <ChampSelect<Diametre>
            label="Diamètre des cadres"
            valeur={armLongrine.diametreCadre}
            options={optionsDiametre}
            onChange={(v) => maj('armLongrine', { diametreCadre: v })}
          />
          <ChampNombre
            label="Espacement des cadres"
            valeur={armLongrine.espacementCadre}
            onChange={(v) => maj('armLongrine', { espacementCadre: v })}
            unite="m"
          />
          <ChampNombre
            label="Enrobage"
            valeur={armLongrine.enrobage}
            onChange={(v) => maj('armLongrine', { enrobage: v })}
            unite="m"
          />
          <ChampNombre
            label="Recouvrements et chutes"
            valeur={armLongrine.recouvrement}
            onChange={(v) => maj('armLongrine', { recouvrement: v })}
            unite="%"
          />
        </Grille>
      </Carte>

      <Carte
        titre="Aciers en attente des poteaux"
        description="Barres verticales dépassant de l'amorce pour raccorder l'élévation."
        icone={Bars3BottomLeftIcon}
        actif={armAmorce.actif}
        onToggle={(v) => maj('armAmorce', { actif: v })}
        accent="#C4894A"
      >
        {!input.amorces.actif && <OuvrageInactif nom="Les amorces de poteaux" />}
        <Grille>
          <ChampSelect<Diametre>
            label="Diamètre des barres verticales"
            valeur={armAmorce.diametreLong}
            options={optionsDiametre}
            onChange={(v) => maj('armAmorce', { diametreLong: v })}
          />
          <ChampNombre
            label="Barres par poteau"
            valeur={armAmorce.nombreBarres}
            onChange={(v) => maj('armAmorce', { nombreBarres: v })}
          />
          <ChampSelect<Diametre>
            label="Diamètre des cadres"
            valeur={armAmorce.diametreCadre}
            options={optionsDiametre}
            onChange={(v) => maj('armAmorce', { diametreCadre: v })}
          />
          <ChampNombre
            label="Espacement des cadres"
            valeur={armAmorce.espacementCadre}
            onChange={(v) => maj('armAmorce', { espacementCadre: v })}
            unite="m"
          />
          <ChampNombre
            label="Longueur d'attente"
            valeur={armAmorce.longueurAttente}
            onChange={(v) => maj('armAmorce', { longueurAttente: v })}
            unite="m"
            aide="Dépassement au-dessus de l'amorce (≈ 50 × Ø pour un recouvrement)."
          />
          <ChampNombre
            label="Recouvrements et chutes"
            valeur={armAmorce.recouvrement}
            onChange={(v) => maj('armAmorce', { recouvrement: v })}
            unite="%"
          />
        </Grille>
        <Note>
          Les barres commerciales font 12 m : le nombre de barres à acheter est obtenu en divisant la
          longueur développée totale par 12, arrondie à l&apos;entier supérieur.
        </Note>
      </Carte>
    </div>
  )
}
