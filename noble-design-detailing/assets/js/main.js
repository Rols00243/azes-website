/* ==========================================================================
   Noble Design Detailing — Interactions
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- En-tête figé au défilement ---------------------------------- */
  var entete = document.querySelector(".entete");
  if (entete) {
    var majEntete = function () {
      entete.classList.toggle("figee", window.scrollY > 20);
    };
    majEntete();
    window.addEventListener("scroll", majEntete, { passive: true });
  }

  /* ---------- Menu mobile -------------------------------------------------- */
  var burger = document.querySelector(".burger");
  var menu = document.querySelector(".menu-mobile");

  if (burger && menu) {
    var basculeMenu = function (ouvrir) {
      menu.classList.toggle("ouvert", ouvrir);
      burger.setAttribute("aria-expanded", String(ouvrir));
      document.body.style.overflow = ouvrir ? "hidden" : "";
    };

    burger.addEventListener("click", function () {
      basculeMenu(!menu.classList.contains("ouvert"));
    });

    menu.querySelectorAll("a").forEach(function (lien) {
      lien.addEventListener("click", function () {
        basculeMenu(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("ouvert")) {
        basculeMenu(false);
      }
    });

    // Passage en affichage bureau alors que le menu est ouvert
    window.addEventListener("resize", function () {
      if (window.innerWidth > 940 && menu.classList.contains("ouvert")) {
        basculeMenu(false);
      }
    });
  }

  /* ---------- Apparition au défilement ------------------------------------ */
  var aReveler = document.querySelectorAll(".apparait");

  if (aReveler.length) {
    if ("IntersectionObserver" in window) {
      var observateur = new IntersectionObserver(
        function (entrees) {
          entrees.forEach(function (entree) {
            if (entree.isIntersecting) {
              entree.target.classList.add("visible");
              observateur.unobserve(entree.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
      );

      aReveler.forEach(function (el, i) {
        el.style.transitionDelay = (i % 4) * 90 + "ms";
        observateur.observe(el);
      });
    } else {
      aReveler.forEach(function (el) {
        el.classList.add("visible");
      });
    }
  }

  /* ---------- Comparateur avant / après ----------------------------------- */
  document.querySelectorAll(".comparateur").forEach(function (zone) {
    var deplace = function (clientX) {
      var rect = zone.getBoundingClientRect();
      var pos = ((clientX - rect.left) / rect.width) * 100;
      pos = Math.max(0, Math.min(100, pos));
      zone.style.setProperty("--position", pos + "%");
    };

    var actif = false;

    zone.addEventListener("pointerdown", function (e) {
      actif = true;
      try {
        zone.setPointerCapture(e.pointerId);
      } catch (err) {
        /* capture non supportée : le glissement reste possible */
      }
      deplace(e.clientX);
    });

    zone.addEventListener("pointermove", function (e) {
      if (actif) deplace(e.clientX);
    });

    ["pointerup", "pointercancel"].forEach(function (evt) {
      zone.addEventListener(evt, function () {
        actif = false;
      });
    });

    zone.setAttribute("tabindex", "0");
    zone.setAttribute("role", "slider");
    zone.setAttribute("aria-label", "Comparer avant et après traitement");
    zone.addEventListener("keydown", function (e) {
      var actuel = parseFloat(zone.style.getPropertyValue("--position")) || 50;
      if (e.key === "ArrowLeft") {
        zone.style.setProperty("--position", Math.max(0, actuel - 4) + "%");
        e.preventDefault();
      }
      if (e.key === "ArrowRight") {
        zone.style.setProperty("--position", Math.min(100, actuel + 4) + "%");
        e.preventDefault();
      }
    });
  });

  /* ---------- Filtres de la galerie --------------------------------------- */
  var filtres = document.querySelectorAll(".filtre");
  var vignettes = document.querySelectorAll(".galerie figure");

  if (filtres.length && vignettes.length) {
    filtres.forEach(function (bouton) {
      bouton.addEventListener("click", function () {
        var cible = bouton.dataset.filtre;

        filtres.forEach(function (b) {
          b.classList.toggle("actif", b === bouton);
          b.setAttribute("aria-pressed", String(b === bouton));
        });

        vignettes.forEach(function (figure) {
          var ok = cible === "tout" || figure.dataset.categorie === cible;
          figure.classList.toggle("masque", !ok);
        });
      });
    });
  }

  /* ---------- Visionneuse (lightbox) -------------------------------------- */
  var visionneuse = document.querySelector(".visionneuse");

  if (visionneuse && vignettes.length) {
    var image = visionneuse.querySelector("img");
    var legende = visionneuse.querySelector(".visionneuse__legende");
    var dernierFocus = null;

    var ferme = function () {
      visionneuse.classList.remove("ouverte");
      document.body.style.overflow = "";
      if (dernierFocus) dernierFocus.focus();
    };

    vignettes.forEach(function (figure) {
      figure.setAttribute("tabindex", "0");
      figure.setAttribute("role", "button");

      var ouvre = function () {
        var src = figure.querySelector("img");
        if (!src) return;
        dernierFocus = figure;
        image.src = src.src;
        image.alt = src.alt;
        var titre = figure.querySelector("figcaption b");
        legende.textContent = titre ? titre.textContent : src.alt;
        visionneuse.classList.add("ouverte");
        document.body.style.overflow = "hidden";
        visionneuse.querySelector(".visionneuse__fermer").focus();
      };

      figure.addEventListener("click", ouvre);
      figure.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          ouvre();
        }
      });
    });

    visionneuse.addEventListener("click", function (e) {
      if (e.target === visionneuse || e.target.closest(".visionneuse__fermer")) {
        ferme();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && visionneuse.classList.contains("ouverte")) ferme();
    });
  }

  /* ---------- Formulaire de devis ----------------------------------------- */
  var formulaire = document.querySelector("[data-devis]");

  if (formulaire) {
    var retour = formulaire.querySelector(".message-formulaire");

    formulaire.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!formulaire.reportValidity()) return;

      var d = new FormData(formulaire);
      var lignes = [
        "Nom : " + (d.get("nom") || ""),
        "Téléphone : " + (d.get("telephone") || ""),
        "E-mail : " + (d.get("email") || ""),
        "Véhicule : " + (d.get("vehicule") || ""),
        "Prestation souhaitée : " + (d.get("prestation") || ""),
        "Lieu : " + (d.get("lieu") || ""),
        "",
        "Message :",
        d.get("message") || "",
      ];

      var destinataire = formulaire.dataset.devis || "contact@nobledesigndetailing.fr";
      var sujet = "Demande de devis — " + (d.get("prestation") || "Detailing");

      window.location.href =
        "mailto:" +
        destinataire +
        "?subject=" +
        encodeURIComponent(sujet) +
        "&body=" +
        encodeURIComponent(lignes.join("\n"));

      if (retour) {
        retour.textContent =
          "Merci ! Votre logiciel de messagerie s'ouvre avec la demande pré-remplie. " +
          "Si rien ne se passe, écrivez-nous directement à " + destinataire + ".";
        retour.classList.add("visible", "succes");
      }
    });
  }

  /* ---------- Année courante dans le pied de page -------------------------- */
  document.querySelectorAll("[data-annee]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
