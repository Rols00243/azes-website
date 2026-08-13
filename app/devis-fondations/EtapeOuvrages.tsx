'use client'

import {
  ArrowsPointingOutIcon,
  BuildingOffice2Icon,
  CubeIcon,
  RectangleGroupIcon,
  ViewColumnsIcon,
} from '@heroicons/react/24/outline'
import { DOSAGES } from '@/lib/fondations/constants'
import { Carte, CaseOption, ChampNombre, ChampSelect, Grille, Note, type EtapeProps } from './ui'

const optionsDosage = DOSAGES.map((d) => ({ valeur: d as number, label: `${d} kg/m³` }))

export default function EtapeOuvrages({ input, maj }: EtapeProps) {
  const { fouilles, proprete, semelleFilante, semelleIsolee, longrine, amorces } = input

  return (
    <div className="space-y-5">
      <Carte
        titre="Fouilles"
        description="Terrassement en rigole le long des murs, et en puits sous les semelles isolées."
        icone={ArrowsPointingOutIcon}
        accent="#8B5E3C"
      >
        <Grille>
          <ChampNombre
            label="Largeur de la rigole"
            valeur={fouilles.largeurRigole}
            onChange={(v) => maj('fouilles', { largeurRigole: v })}
            unite="m"
            aide="Au moins la largeur de la semelle + 10 cm de confort."
          />
          <ChampNombre
            label="Profondeur de la rigole"
            valeur={fouilles.profondeurRigole}
            onChange={(v) => maj('fouilles', { profondeurRigole: v })}
            unite="m"
            aide="Assise sur le bon sol, hors terre végétale."
          />
        </Grille>

        <CaseOption
          label="Fouilles en puits (semelles isolées)"
          valeur={fouilles.puitsActif}
          onChange={(v) => maj('fouilles', { puitsActif: v })}
          aide="À activer pour une structure poteaux-poutres."
        />
        {fouilles.puitsActif && (
          <Grille colonnes={3}>
            <ChampNombre
              label="Nombre de puits"
              valeur={fouilles.puitsNombre}
              onChange={(v) => maj('fouilles', { puitsNombre: v })}
            />
            <ChampNombre
              label="Longueur"
              valeur={fouilles.puitsLongueur}
              onChange={(v) => maj('fouilles', { puitsLongueur: v })}
              unite="m"
            />
            <ChampNombre
              label="Largeur"
              valeur={fouilles.puitsLargeur}
              onChange={(v) => maj('fouilles', { puitsLargeur: v })}
              unite="m"
            />
            <ChampNombre
              label="Profondeur"
              valeur={fouilles.puitsProfondeur}
              onChange={(v) => maj('fouilles', { puitsProfondeur: v })}
              unite="m"
            />
          </Grille>
        )}

        <Grille>
          <ChampNombre
            label="Terres réutilisées en remblai"
            valeur={fouilles.remblaiPourcentage}
            onChange={(v) => maj('fouilles', { remblaiPourcentage: v })}
            unite="%"
          />
          <ChampNombre
            label="Coefficient de foisonnement"
            valeur={fouilles.foisonnement}
            onChange={(v) => maj('fouilles', { foisonnement: v })}
            aide="1,25 pour une terre ordinaire : volume évacué > volume en place."
          />
        </Grille>
        <CaseOption
          label="Évacuer les terres excédentaires"
          valeur={fouilles.evacuation}
          onChange={(v) => maj('fouilles', { evacuation: v })}
          aide="Ajoute une ligne de transport au lot Terrassement."
        />
      </Carte>

      <Carte
        titre="Béton de propreté"
        description="Couche de réglage sous les semelles, faiblement dosée."
        icone={RectangleGroupIcon}
        actif={proprete.actif}
        onToggle={(v) => maj('proprete', { actif: v })}
      >
        <Grille colonnes={3}>
          <ChampNombre
            label="Épaisseur"
            valeur={proprete.epaisseur}
            onChange={(v) => maj('proprete', { epaisseur: v })}
            unite="m"
          />
          <ChampNombre
            label="Débord de part et d'autre"
            valeur={proprete.debord}
            onChange={(v) => maj('proprete', { debord: v })}
            unite="m"
          />
          <ChampSelect<number>
            label="Dosage"
            valeur={proprete.dosage}
            options={optionsDosage}
            onChange={(v) => maj('proprete', { dosage: v })}
          />
        </Grille>
      </Carte>

      <Carte
        titre="Semelle filante"
        description="Semelle continue sous les murs porteurs."
        icone={CubeIcon}
        actif={semelleFilante.actif}
        onToggle={(v) => maj('semelleFilante', { actif: v })}
      >
        <Grille colonnes={3}>
          <ChampNombre
            label="Largeur"
            valeur={semelleFilante.largeur}
            onChange={(v) => maj('semelleFilante', { largeur: v })}
            unite="m"
          />
          <ChampNombre
            label="Hauteur"
            valeur={semelleFilante.hauteur}
            onChange={(v) => maj('semelleFilante', { hauteur: v })}
            unite="m"
          />
          <ChampSelect<number>
            label="Dosage"
            valeur={semelleFilante.dosage}
            options={optionsDosage}
            onChange={(v) => maj('semelleFilante', { dosage: v })}
          />
        </Grille>
        <CaseOption
          label="Semelle coffrée"
          valeur={semelleFilante.coffree}
          onChange={(v) => maj('semelleFilante', { coffree: v })}
          aide="Décochez si le béton est coulé à même la fouille (pleine fouille)."
        />
      </Carte>

      <Carte
        titre="Semelles isolées"
        description="Massifs sous poteaux, à ferrailler en nappe croisée."
        icone={BuildingOffice2Icon}
        actif={semelleIsolee.actif}
        onToggle={(v) => maj('semelleIsolee', { actif: v })}
      >
        <Grille colonnes={3}>
          <ChampNombre
            label="Nombre"
            valeur={semelleIsolee.nombre}
            onChange={(v) => maj('semelleIsolee', { nombre: v })}
          />
          <ChampNombre
            label="Longueur"
            valeur={semelleIsolee.longueur}
            onChange={(v) => maj('semelleIsolee', { longueur: v })}
            unite="m"
          />
          <ChampNombre
            label="Largeur"
            valeur={semelleIsolee.largeur}
            onChange={(v) => maj('semelleIsolee', { largeur: v })}
            unite="m"
          />
          <ChampNombre
            label="Hauteur"
            valeur={semelleIsolee.hauteur}
            onChange={(v) => maj('semelleIsolee', { hauteur: v })}
            unite="m"
          />
          <ChampSelect<number>
            label="Dosage"
            valeur={semelleIsolee.dosage}
            options={optionsDosage}
            onChange={(v) => maj('semelleIsolee', { dosage: v })}
          />
        </Grille>
        <CaseOption
          label="Semelles coffrées"
          valeur={semelleIsolee.coffree}
          onChange={(v) => maj('semelleIsolee', { coffree: v })}
        />
      </Carte>

      <Carte
        titre="Longrine / chaînage bas"
        description="Poutre de redressement liant les semelles et recevant les murs."
        icone={ViewColumnsIcon}
        actif={longrine.actif}
        onToggle={(v) => maj('longrine', { actif: v })}
      >
        <Grille colonnes={3}>
          <ChampNombre
            label="Largeur"
            valeur={longrine.largeur}
            onChange={(v) => maj('longrine', { largeur: v })}
            unite="m"
          />
          <ChampNombre
            label="Hauteur"
            valeur={longrine.hauteur}
            onChange={(v) => maj('longrine', { hauteur: v })}
            unite="m"
          />
          <ChampSelect<number>
            label="Dosage"
            valeur={longrine.dosage}
            options={optionsDosage}
            onChange={(v) => maj('longrine', { dosage: v })}
          />
        </Grille>
        <CaseOption
          label="Longrine coffrée"
          valeur={longrine.coffree}
          onChange={(v) => maj('longrine', { coffree: v })}
        />
      </Carte>

      <Carte
        titre="Amorces de poteaux"
        description="Départs de poteaux avec aciers en attente pour l'élévation."
        icone={ViewColumnsIcon}
        actif={amorces.actif}
        onToggle={(v) => maj('amorces', { actif: v })}
        accent="#C4894A"
      >
        <Grille colonnes={3}>
          <ChampNombre
            label="Nombre d'amorces"
            valeur={amorces.nombre}
            onChange={(v) => maj('amorces', { nombre: v })}
          />
          <ChampNombre
            label="Largeur (a)"
            valeur={amorces.largeur}
            onChange={(v) => maj('amorces', { largeur: v })}
            unite="m"
          />
          <ChampNombre
            label="Épaisseur (b)"
            valeur={amorces.epaisseur}
            onChange={(v) => maj('amorces', { epaisseur: v })}
            unite="m"
          />
          <ChampNombre
            label="Hauteur coulée"
            valeur={amorces.hauteur}
            onChange={(v) => maj('amorces', { hauteur: v })}
            unite="m"
          />
          <ChampSelect<number>
            label="Dosage"
            valeur={amorces.dosage}
            options={optionsDosage}
            onChange={(v) => maj('amorces', { dosage: v })}
          />
        </Grille>
        <CaseOption
          label="Amorces coffrées"
          valeur={amorces.coffree}
          onChange={(v) => maj('amorces', { coffree: v })}
        />
        <Note>
          La longueur d&apos;attente des aciers au-dessus de l&apos;amorce se règle dans
          l&apos;onglet <strong>Armatures</strong>.
        </Note>
      </Carte>
    </div>
  )
}
