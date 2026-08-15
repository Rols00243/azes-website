"""Tableau de bord AZES — statistiques des Zones Économiques Spéciales (Streamlit)."""

from __future__ import annotations

import pandas as pd
import plotly.graph_objects as go
import streamlit as st

from data_loader import (
    ZONES,
    load_appels_offres,
    load_emplois_offres,
    load_entreprises,
    load_formations,
    load_projets_counts,
    load_stats,
    load_zones,
)

# Palette catégorielle validée (daltonisme + contraste), ordre fixe :
# une seule teinte pour les comparaisons de grandeur, la 2e pour une 2e série.
PALETTE = ["#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#4a3aa7", "#e34948"]

SURFACE = "#fcfcfb"
INK = "#0b0b0b"
INK_MUTED = "#898781"
GRID = "#e1e0d9"

st.set_page_config(page_title="Tableau de bord AZES", page_icon="📊", layout="wide")


def style_fig(fig: go.Figure, height: int = 380) -> go.Figure:
    fig.update_layout(
        height=height,
        paper_bgcolor=SURFACE,
        plot_bgcolor=SURFACE,
        font=dict(family="system-ui, sans-serif", color=INK, size=13),
        margin=dict(l=10, r=10, t=10, b=10),
        legend=dict(orientation="h", yanchor="bottom", y=1.02, x=0),
        bargap=0.35,
    )
    fig.update_xaxes(gridcolor=GRID, zerolinecolor=GRID, tickfont=dict(color=INK_MUTED))
    fig.update_yaxes(gridcolor=GRID, zerolinecolor=GRID, tickfont=dict(color=INK_MUTED))
    return fig


def hbar(df: pd.DataFrame, x: str, y: str, colors, x_title: str, labels=True) -> go.Figure:
    fig = go.Figure(
        go.Bar(
            x=df[x],
            y=df[y],
            orientation="h",
            marker=dict(color=colors, cornerradius=4),
            text=df[x] if labels else None,
            textposition="outside",
            textfont=dict(color=INK),
            cliponaxis=False,
            hovertemplate="%{y}<br>" + x_title + " : %{x:,.0f}<extra></extra>",
        )
    )
    fig.update_layout(showlegend=False)
    fig.update_xaxes(title_text=x_title, title_font=dict(color=INK_MUTED))
    fig.update_yaxes(autorange="reversed")
    return style_fig(fig, height=90 + 42 * len(df))


st.title("📊 Tableau de bord AZES")
st.caption(
    "Statistiques des Zones Économiques Spéciales — données lues depuis les fichiers "
    "`data/` du site azes-website."
)

zones_df = load_zones()
entreprises_df = load_entreprises()
formations_df = load_formations()

# ── Filtre par région ──────────────────────────────────────────────────────────
regions = ["Toutes les régions"] + sorted(zones_df["region"].unique())
region = st.selectbox("Région", regions)
zones_view = zones_df if region == "Toutes les régions" else zones_df[zones_df["region"] == region]

tab_synthese, tab_zones, tab_emplois, tab_formations = st.tabs(
    ["Vue d'ensemble", "Zones", "Emplois & entreprises", "Formations"]
)

# ── Vue d'ensemble ─────────────────────────────────────────────────────────────
with tab_synthese:
    stats = load_stats()
    projets = load_projets_counts()

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Zones actives", f"{stats.get('zones_actives', 0):,}".replace(",", " "))
    c2.metric("Entreprises", f"{stats.get('entreprises', 0):,}".replace(",", " "))
    c3.metric("Emplois", f"{stats.get('emplois', 0):,}".replace(",", " "))
    inv = stats.get("investissements_usd", 0)
    c4.metric("Investissements", f"{inv / 1_000_000:,.0f} M$".replace(",", " "))

    c1, c2, c3, c4 = st.columns(4)
    c1.metric("Projets en cours", projets.get("projets_en_cours", 0))
    c2.metric("Projets planifiés", projets.get("projets_planifies", 0))
    c3.metric("Opportunités", projets.get("opportunites", 0))
    c4.metric("Appels d'offres", projets.get("appels_offres", 0))

    st.divider()
    st.subheader("Superficie totale par zone")
    view = zones_view.sort_values("superficie_totale_ha", ascending=False)
    st.plotly_chart(
        hbar(
            view,
            x="superficie_totale_ha",
            y="zone",
            colors=PALETTE[0],
            x_title="Superficie (ha)",
        ),
        use_container_width=True,
    )
    with st.expander("Voir les données (tableau)"):
        st.dataframe(view[["zone", "region", "superficie_totale_ha", "secteurs"]], hide_index=True)

# ── Zones ──────────────────────────────────────────────────────────────────────
with tab_zones:
    st.subheader("Foncier : superficie totale et superficie industrielle")
    view = zones_view.sort_values("superficie_totale_ha", ascending=False)
    fig = go.Figure()
    fig.add_bar(
        x=view["superficie_totale_ha"],
        y=view["zone"],
        orientation="h",
        name="Superficie totale",
        marker=dict(color=PALETTE[0], cornerradius=4),
        hovertemplate="%{y}<br>Totale : %{x:,.0f} ha<extra></extra>",
    )
    fig.add_bar(
        x=view["superficie_industrielle_ha"],
        y=view["zone"],
        orientation="h",
        name="Superficie industrielle",
        marker=dict(color=PALETTE[1], cornerradius=4),
        hovertemplate="%{y}<br>Industrielle : %{x:,.0f} ha<extra></extra>",
    )
    fig.update_layout(barmode="group")
    fig.update_xaxes(title_text="Superficie (ha)", title_font=dict(color=INK_MUTED))
    fig.update_yaxes(autorange="reversed")
    st.plotly_chart(style_fig(fig, height=120 + 60 * len(view)), use_container_width=True)

    st.subheader("Capacité énergétique installée")
    view_e = zones_view.sort_values("energie_mw", ascending=False)
    st.plotly_chart(
        hbar(
            view_e,
            x="energie_mw",
            y="zone",
            colors=PALETTE[0],
            x_title="Énergie (MW)",
        ),
        use_container_width=True,
    )

    st.subheader("Détail des zones")
    st.dataframe(
        zones_view[
            [
                "zone",
                "region",
                "superficie_totale_ha",
                "superficie_industrielle_ha",
                "energie_mw",
                "emplois",
                "entreprises",
                "investissement_usd",
                "secteurs",
            ]
        ].rename(
            columns={
                "superficie_totale_ha": "Superficie (ha)",
                "superficie_industrielle_ha": "Sup. industrielle (ha)",
                "energie_mw": "Énergie (MW)",
                "investissement_usd": "Investissement ($)",
            }
        ),
        hide_index=True,
        use_container_width=True,
    )

# ── Emplois & entreprises ──────────────────────────────────────────────────────
with tab_emplois:
    offres = load_emplois_offres()
    st.metric("Offres d'emploi publiées sur le site", len(offres))

    if entreprises_df.empty:
        st.info("Aucune donnée entreprise disponible.")
    else:
        st.subheader("Emplois par entreprise")
        view = entreprises_df.sort_values("emplois", ascending=False)
        st.plotly_chart(
            hbar(view, x="emplois", y="nom", colors=PALETTE[0], x_title="Emplois"),
            use_container_width=True,
        )

        st.subheader("Emplois par zone d'implantation")
        par_zone = view.groupby("zone", as_index=False)["emplois"].sum().sort_values("emplois", ascending=False)
        st.plotly_chart(
            hbar(par_zone, x="emplois", y="zone", colors=PALETTE[0], x_title="Emplois"),
            use_container_width=True,
        )
        with st.expander("Voir les données (tableau)"):
            st.dataframe(view, hide_index=True, use_container_width=True)

# ── Formations ─────────────────────────────────────────────────────────────────
with tab_formations:
    if formations_df.empty:
        st.info("Aucune formation disponible.")
    else:
        total_places = int(formations_df["places"].sum())
        c1, c2 = st.columns(2)
        c1.metric("Formations proposées", len(formations_df))
        c2.metric("Places disponibles", total_places)

        st.subheader("Places par formation")
        view = formations_df.sort_values("places", ascending=False)
        st.plotly_chart(
            hbar(view, x="places", y="titre", colors=PALETTE[0], x_title="Places"),
            use_container_width=True,
        )
        st.dataframe(
            view.rename(columns={"titre": "Formation", "duree": "Durée", "zone": "Zone", "places": "Places"}),
            hide_index=True,
            use_container_width=True,
        )

appels = load_appels_offres()
st.divider()
st.caption(
    f"Appels d'offres publiés : {len(appels)} · "
    "Source : fichiers JSON du dépôt azes-website (dossier `data/`)."
)
