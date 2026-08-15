"""Chargement des données du site AZES (fichiers JSON du dossier ../data)."""

from __future__ import annotations

import json
import re
from pathlib import Path

import pandas as pd

DATA_DIR = Path(__file__).resolve().parents[1] / "data"

# Métadonnées des zones (miroir de lib/data/zones.ts, ordre officiel du site).
# L'ordre est stable : il fixe l'attribution des couleurs de série.
ZONES = {
    "zes-maluku": {"nom": "ZES de Maluku", "court": "Maluku", "region": "Kinshasa"},
    "zes-kin-malebo": {"nom": "ZES de Kin-Malebo", "court": "Kin-Malebo", "region": "Kinshasa"},
    "zes-kinsevere": {"nom": "ZES de Kinsevere", "court": "Kinsevere", "region": "Haut-Katanga"},
    "zes-kiswishi": {"nom": "ZES de Kiswishi", "court": "Kiswishi", "region": "Haut-Katanga"},
    "zes-musompo": {"nom": "ZES de Musompo", "court": "Musompo", "region": "Lualaba"},
    "zes-nganda-jika": {"nom": "ZESTA de Nganda-Jika", "court": "ZESTA Nganda-Jika", "region": "Kasaï Central"},
    "zes-kalamba-mbuji": {"nom": "ZES de Kalamba-Mbuji", "court": "Kalamba-Mbuji", "region": "Kasaï Oriental"},
}


def _load(name: str):
    path = DATA_DIR / name
    if not path.exists():
        return None
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def parse_montant(value) -> float:
    """Convertit "$500000000" ou "$1,2M" en nombre de dollars (0 si illisible)."""
    if isinstance(value, (int, float)):
        return float(value)
    if not isinstance(value, str):
        return 0.0
    cleaned = re.sub(r"[^\d.]", "", value.replace(",", "."))
    if not cleaned:
        return 0.0
    try:
        montant = float(cleaned)
    except ValueError:
        return 0.0
    upper = value.upper()
    if "M" in upper:
        montant *= 1_000_000
    elif "K" in upper:
        montant *= 1_000
    return montant


def load_stats() -> dict:
    stats = _load("stats.json") or {}
    stats["investissements_usd"] = parse_montant(stats.get("investissements", 0))
    return stats


def load_projets_counts() -> dict:
    return _load("projets-counts.json") or {}


def load_zones() -> pd.DataFrame:
    """Une ligne par zone : foncier, infrastructures, impact et secteurs."""
    detail = _load("zones-detail.json") or {}
    zstats = _load("zones-stats.json") or {}
    rows = []
    for slug, meta in ZONES.items():
        d = detail.get(slug, {})
        foncier = d.get("foncier", {})
        infra = d.get("infrastructures", {})
        activite = d.get("activite", {})
        impact = d.get("impact", {})
        s = zstats.get(slug, {})
        rows.append(
            {
                "slug": slug,
                "zone": meta["nom"],
                "court": meta["court"],
                "region": meta["region"],
                "superficie_totale_ha": foncier.get("superficieTotale", 0) or 0,
                "superficie_industrielle_ha": foncier.get("superficieIndustrielle", 0) or 0,
                "energie_mw": infra.get("energieMW", 0) or 0,
                "secteurs": ", ".join(activite.get("secteurs", [])),
                "emplois": s.get("emplois", impact.get("emplois", 0)) or 0,
                "entreprises": s.get("entreprises", 0) or 0,
                "investissement_usd": parse_montant(s.get("investissement", impact.get("investissement", 0))),
            }
        )
    return pd.DataFrame(rows)


def load_entreprises() -> pd.DataFrame:
    data = _load("entreprises-emplois.json") or []
    df = pd.DataFrame(data)
    if df.empty:
        df = pd.DataFrame(columns=["nom", "zone", "emplois"])
    return df[["nom", "zone", "emplois"]]


def load_formations() -> pd.DataFrame:
    data = _load("formations.json") or []
    df = pd.DataFrame(data)
    if df.empty:
        df = pd.DataFrame(columns=["titre", "duree", "zone", "places"])
    return df[["titre", "duree", "zone", "places"]]


def load_emplois_offres() -> pd.DataFrame:
    data = _load("emplois.json") or []
    return pd.DataFrame(data)


def load_appels_offres() -> pd.DataFrame:
    data = _load("appels-offres-data.json") or []
    return pd.DataFrame(data)
