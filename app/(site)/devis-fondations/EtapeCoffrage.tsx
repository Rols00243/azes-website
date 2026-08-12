'use client'

import { RectangleStackIcon, Squares2X2Icon, SwatchIcon } from '@heroicons/react/24/outline'
import { DOSAGES } from '@/lib/fondations/constants'
import {
  Carte,
  CaseOption,
  ChampNombre,
  ChampSelect,
  Grille,
  Note,
  Segmente,
  type EtapeProps,
} from './ui'

const optionsDosage = DOSAGES.map((d) => ({ valeur: d as number, label: `${d} kg/m³` }))

export default function EtapeCoffrage({ input, maj }: EtapeProps) {
  const { coffrage, maconnerie, dallage } = input

  return (
    <div className="space-y-5">
      <Carte
        titre="Coffrage, clous et fil d'attache"
        description="Le bois est compté à l'achat : surface coffrée, majorée des chutes, divisée par le nombre de réemplois."
        icone={RectangleStackIcon}
        actif={coffrage.actif}
        onToggle={(v) => maj('coffrage', { actif: v })}
        accent="#8B5E3C"
      >
        <Segmente
          valeur={coffrage.type}
          onChange={(type) => maj('coffrage', { type })}
          options={[
            { valeur: 'planches', label: 'Planches' },
            { valeur: 'contreplaque', label: 'Contreplaqué' },
          ]}
        />

        {coffrage.type === 'planches' ? (
          <Grille>
            <ChampNombre
              label="Longueur d'une planche"
              valeur={coffrage.plancheLongueur}
              onChange={(v) => maj('coffrage', { plancheLongueur: v })}
              unite="m"
            />
            <ChampNombre
              label="Largeur d'une planche"
              valeur={coffrage.plancheLargeur}
              onChange={(v) => maj('coffrage', { plancheLargeur: v })}
              unite="m"
            />
          </Grille>
        ) : (
          <Grille>
            <ChampNombre
              label="Longueur d'un panneau"
              valeur={coffrage.contreplaqueLongueur}
              onChange={(v) => maj('coffrage', { contreplaqueLongueur: v })}
              unite="m"
            />
            <ChampNombre
              label="Largeur d'un panneau"
              valeur={coffrage.contreplaqueLargeur}
              onChange={(v) => maj('coffrage', { contreplaqueLargeur: v })}
              unite="m"
            />
          </Grille>
        )}

        <Grille>
          <ChampNombre
            label="Nombre de réemplois"
            valeur={coffrage.reutilisations}
            onChange={(v) => maj('coffrage', { reutilisations: v })}
            aide="Nombre de fois qu'un même panneau sert sur le chantier."
            min={1}
          />
          <ChampNombre
            label="Chutes et pertes"
            valeur={coffrage.chutes}
            onChange={(v) => maj('coffrage', { chutes: v })}
            unite="%"
          />
          <ChampNombre
            label="Chevrons par m² de coffrage"
            valeur={coffrage.chevronsMlParM2}
            onChange={(v) => maj('coffrage', { chevronsMlParM2: v })}
            unite="ml"
          />
          <ChampNombre
            label="Longueur d'un chevron"
            valeur={coffrage.chevronLongueur}
            onChange={(v) => maj('coffrage', { chevronLongueur: v })}
            unite="m"
          />
          <ChampNombre
            label="Clous par m² de coffrage"
            valeur={coffrage.clousKgParM2}
            onChange={(v) => maj('coffrage', { clousKgParM2: v })}
            unite="kg"
            aide="0,2 à 0,3 kg/m² pour un coffrage traditionnel en planches."
          />
          <ChampNombre
            label="Fil d'attache par tonne d'acier"
            valeur={coffrage.filAttacheKgParTonne}
            onChange={(v) => maj('coffrage', { filAttacheKgParTonne: v })}
            unite="kg"
            aide="10 à 15 kg de fil recuit par tonne d'armatures ligaturées."
          />
        </Grille>
        <Note>
          La surface à coffrer est calculée à partir des ouvrages cochés « coffré » dans
          l&apos;onglet <strong>Ouvrages</strong>.
        </Note>
      </Carte>

      <Carte
        titre="Maçonnerie de soubassement"
        description="Élévation en blocs entre la longrine et le dallage, avec chaînage d'arase."
        icone={Squares2X2Icon}
        actif={maconnerie.actif}
        onToggle={(v) => maj('maconnerie', { actif: v })}
      >
        <Grille>
          <ChampNombre
            label="Hauteur du soubassement"
            valeur={maconnerie.hauteur}
            onChange={(v) => maj('maconnerie', { hauteur: v })}
            unite="m"
          />
          <ChampNombre
            label="Casse et pertes"
            valeur={maconnerie.pertes}
            onChange={(v) => maj('maconnerie', { pertes: v })}
            unite="%"
          />
        </Grille>
        <Grille colonnes={3}>
          <ChampNombre
            label="Longueur du bloc"
            valeur={maconnerie.blocLongueur}
            onChange={(v) => maj('maconnerie', { blocLongueur: v })}
            unite="m"
          />
          <ChampNombre
            label="Hauteur du bloc"
            valeur={maconnerie.blocHauteur}
            onChange={(v) => maj('maconnerie', { blocHauteur: v })}
            unite="m"
          />
          <ChampNombre
            label="Épaisseur du bloc"
            valeur={maconnerie.blocEpaisseur}
            onChange={(v) => maj('maconnerie', { blocEpaisseur: v })}
            unite="m"
          />
          <ChampNombre
            label="Épaisseur du joint"
            valeur={maconnerie.joint}
            onChange={(v) => maj('maconnerie', { joint: v })}
            unite="m"
          />
          <ChampNombre
            label="Mortier par m² de mur"
            valeur={maconnerie.mortierParM2}
            onChange={(v) => maj('maconnerie', { mortierParM2: v })}
            unite="m³"
          />
          <ChampSelect<number>
            label="Dosage du mortier"
            valeur={maconnerie.dosageMortier}
            options={optionsDosage}
            onChange={(v) => maj('maconnerie', { dosageMortier: v })}
          />
        </Grille>
        <CaseOption
          label="Chaînage d'arase en tête de soubassement"
          valeur={maconnerie.arase}
          onChange={(v) => maj('maconnerie', { arase: v })}
        />
        {maconnerie.arase && (
          <Grille>
            <ChampNombre
              label="Hauteur du chaînage d'arase"
              valeur={maconnerie.araseHauteur}
              onChange={(v) => maj('maconnerie', { araseHauteur: v })}
              unite="m"
            />
            <ChampSelect<number>
              label="Dosage du chaînage"
              valeur={maconnerie.araseDosage}
              options={optionsDosage}
              onChange={(v) => maj('maconnerie', { araseDosage: v })}
            />
          </Grille>
        )}
      </Carte>

      <Carte
        titre="Hérisson et dallage"
        description="Remblai pierreux, film polyane, dalle sur terre-plein et treillis soudé."
        icone={SwatchIcon}
        actif={dallage.actif}
        onToggle={(v) =>
          maj('dallage', {
            actif: v,
            // Au premier passage, la surface reprend l'emprise du bâtiment.
            surface:
              v && dallage.surface <= 0 ? input.geometrie.longueur * input.geometrie.largeur : dallage.surface,
          })
        }
        accent="#2A7A4B"
      >
        <Grille>
          <ChampNombre
            label="Surface à daller"
            valeur={dallage.surface}
            onChange={(v) => maj('dallage', { surface: v })}
            unite="m²"
            aide="Par défaut l'emprise au sol du bâtiment."
          />
          <ChampNombre
            label="Épaisseur du hérisson"
            valeur={dallage.herissonEpaisseur}
            onChange={(v) => maj('dallage', { herissonEpaisseur: v })}
            unite="m"
          />
          <ChampNombre
            label="Lit de sable"
            valeur={dallage.sableEpaisseur}
            onChange={(v) => maj('dallage', { sableEpaisseur: v })}
            unite="m"
          />
          <ChampNombre
            label="Épaisseur de la dalle"
            valeur={dallage.dallageEpaisseur}
            onChange={(v) => maj('dallage', { dallageEpaisseur: v })}
            unite="m"
          />
          <ChampSelect<number>
            label="Dosage de la dalle"
            valeur={dallage.dallageDosage}
            options={optionsDosage}
            onChange={(v) => maj('dallage', { dallageDosage: v })}
          />
          <ChampNombre
            label="Recouvrement des treillis"
            valeur={dallage.treillisRecouvrement}
            onChange={(v) => maj('dallage', { treillisRecouvrement: v })}
            unite="%"
          />
        </Grille>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CaseOption
            label="Film polyane sous dalle"
            valeur={dallage.polyane}
            onChange={(v) => maj('dallage', { polyane: v })}
          />
          <CaseOption
            label="Treillis soudé"
            valeur={dallage.treillis}
            onChange={(v) => maj('dallage', { treillis: v })}
          />
        </div>
        {dallage.treillis && (
          <Grille>
            <ChampNombre
              label="Longueur d'un panneau"
              valeur={dallage.treillisPanneauLongueur}
              onChange={(v) => maj('dallage', { treillisPanneauLongueur: v })}
              unite="m"
            />
            <ChampNombre
              label="Largeur d'un panneau"
              valeur={dallage.treillisPanneauLargeur}
              onChange={(v) => maj('dallage', { treillisPanneauLargeur: v })}
              unite="m"
            />
          </Grille>
        )}
      </Carte>
    </div>
  )
}
