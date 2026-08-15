# Tableau de bord AZES (Python / Streamlit)

Application Python qui lit les fichiers JSON du dossier `data/` du site
azes-website et affiche les statistiques des Zones Économiques Spéciales :

- **Vue d'ensemble** — indicateurs clés (zones actives, entreprises, emplois,
  investissements, projets) et superficie par zone ;
- **Zones** — foncier (superficie totale vs industrielle), capacité énergétique,
  tableau de détail par zone ;
- **Emplois & entreprises** — emplois par entreprise et par zone d'implantation ;
- **Formations** — formations proposées et places disponibles.

Un filtre par région s'applique aux graphiques de zones.

## Lancement

```bash
cd dashboard
pip install -r requirements.txt
streamlit run app.py
```

L'application s'ouvre sur http://localhost:8501.

## Structure

| Fichier | Rôle |
|---|---|
| `app.py` | Application Streamlit (interface + graphiques Plotly) |
| `data_loader.py` | Lecture des JSON de `../data` et mise en forme (pandas) |
| `.streamlit/config.toml` | Thème clair de l'application |
| `requirements.txt` | Dépendances Python |

Les données sont lues à chaque exécution : toute mise à jour des fichiers de
`data/` est reflétée au rechargement de la page.
