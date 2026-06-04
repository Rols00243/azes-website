import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-azes-blue-dark text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Colonne 1 — Logo & Mission */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-azes-brown rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ZES</span>
              </div>
              <div>
                <div className="font-bold text-lg">AZES</div>
                <div className="text-xs text-blue-200">Zones Économiques Spéciales</div>
              </div>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed mb-6">
              L'Agence des Zones Économiques Spéciales pilote le développement et la promotion des ZES en République Démocratique du Congo, au service de la croissance et de l'emploi.
            </p>
            <div className="flex gap-3">
              {['LinkedIn', 'Twitter', 'Facebook'].map((r) => (
                <a
                  key={r}
                  href="#"
                  aria-label={r}
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-xs hover:bg-azes-brown transition-colors"
                >
                  {r[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 — Liens rapides */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-azes-brown mb-4">Liens rapides</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/a-propos', label: 'À propos de l\'AZES' },
                { href: '/zones', label: 'Nos zones' },
                { href: '/emplois', label: 'Emplois' },
                { href: '/demarches', label: 'Démarches en ligne' },
                { href: '/guichet-unique', label: 'Guichet Unique' },
                { href: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all">
                    → {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 3 — Projets & Docs */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-azes-brown mb-4">Projets & Documents</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/projets-opportunites/projets-en-cours', label: 'Projets en cours' },
                { href: '/projets-opportunites/projets-planifies', label: 'Projets planifiés' },
                { href: '/projets-opportunites/opportunites-investissement', label: 'Opportunités' },
                { href: '/projets-opportunites/appels-offres', label: 'Appels d\'offres' },
                { href: '/documents', label: 'Centre documentaire' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-blue-100 hover:text-white hover:translate-x-1 inline-block transition-all">
                    → {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne 4 — Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-azes-brown mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-blue-100">
              <div>
                <div className="font-semibold text-white mb-0.5">Siège social</div>
                <div>Boulevard du 30 Juin, Kinshasa</div>
                <div>Gombe, République Démocratique du Congo</div>
              </div>
              <div>
                <div className="font-semibold text-white mb-0.5">Téléphone</div>
                <a href="tel:+243812345678" className="hover:text-white transition-colors">+243 81 234 5678</a>
              </div>
              <div>
                <div className="font-semibold text-white mb-0.5">Email</div>
                <a href="mailto:info@azes.cd" className="hover:text-white transition-colors">info@azes.cd</a>
              </div>
              <div>
                <div className="font-semibold text-white mb-0.5">Horaires</div>
                <div>Lun–Ven : 08h00–17h00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de séparation */}
      <div className="border-t border-azes-brown/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-blue-200">
          <span>© {new Date().getFullYear()} AZES — Tous droits réservés</span>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">Politique de confidentialité</Link>
            <Link href="#" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-white transition-colors">Accessibilité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
