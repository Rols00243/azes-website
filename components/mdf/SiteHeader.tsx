'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import Logo from './Logo'
import { collections, company, prixLabel } from '@/lib/mdf/data'

const liens = [
  { href: '/mdf/sur-mesure', label: 'Le sur-mesure' },
  { href: '/mdf/realisations', label: 'Réalisations' },
  { href: '/mdf/a-propos', label: "L'atelier" },
  { href: '/mdf/contact', label: 'Contact' },
]

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [collectionsOuvert, setCollectionsOuvert] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Les panneaux se referment à la navigation : chaque lien appelle `fermer`
  // plutôt qu'un effet sur `pathname`, qui provoquerait un rendu en cascade.
  const fermer = () => {
    setMenuOuvert(false)
    setCollectionsOuvert(false)
  }

  useEffect(() => {
    document.body.style.overflow = menuOuvert ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOuvert])

  const actif = (href: string) =>
    pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <header
        className={clsx(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled || menuOuvert
            ? 'border-b border-mdf-sand/10 bg-mdf-ink/92 backdrop-blur-xl'
            : 'border-b border-transparent',
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">
          <Link
            href="/mdf"
            className="flex items-center gap-3 text-mdf-oak transition-opacity hover:opacity-80"
          >
            <Logo className="h-9 w-9" />
            <span className="leading-tight">
              <span className="mdf-display block text-[0.95rem] tracking-[0.18em] text-mdf-cream">
                GENIUS
              </span>
              <span className="mdf-eyebrow block text-[0.58rem] text-mdf-oak/80">
                Design Pro
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOuvert(true)}
              onMouseLeave={() => setCollectionsOuvert(false)}
            >
              <Link
                href="/mdf/collections"
                onClick={fermer}
                className={clsx(
                  'flex items-center gap-2 py-6 text-sm tracking-wide transition-colors',
                  actif('/mdf/collections')
                    ? 'text-mdf-oak'
                    : 'text-mdf-sand/85 hover:text-mdf-oak',
                )}
                aria-expanded={collectionsOuvert}
              >
                Collections
                <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden="true">
                  <path
                    d="M1 1l3.5 3.5L8 1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </Link>
              <AnimatePresence>
                {collectionsOuvert && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.22 }}
                    className="absolute left-1/2 top-full w-[30rem] -translate-x-1/2 border border-mdf-sand/12 bg-mdf-espresso/98 p-3 shadow-2xl backdrop-blur-xl"
                  >
                    <ul className="grid grid-cols-2 gap-1">
                      {collections.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/mdf/collections/${c.slug}`}
                            onClick={fermer}
                            className="block px-4 py-3 transition-colors hover:bg-mdf-bark/70"
                          >
                            <span className="block text-sm text-mdf-cream">
                              {c.nom}
                            </span>
                            <span className="mt-0.5 block text-xs text-mdf-sand/45">
                              {prixLabel(c.prix)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {liens.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={fermer}
                className={clsx(
                  'text-sm tracking-wide transition-colors',
                  actif(l.href)
                    ? 'text-mdf-oak'
                    : 'text-mdf-sand/85 hover:text-mdf-oak',
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={`tel:${company.telephoneHref}`}
              className="mdf-link text-sm text-mdf-sand/70 hover:text-mdf-cream"
            >
              {company.telephone}
            </a>
            <Link
              href="/mdf/devis"
              className="bg-mdf-oak px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-mdf-ink transition-colors hover:bg-mdf-cream"
            >
              Devis gratuit
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOuvert((v) => !v)}
            className="flex h-11 w-11 items-center justify-center text-mdf-cream lg:hidden"
            aria-label={menuOuvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOuvert}
          >
            <span className="relative block h-4 w-6">
              <span
                className={clsx(
                  'absolute left-0 block h-px w-6 bg-current transition-all duration-300',
                  menuOuvert ? 'top-2 rotate-45' : 'top-0',
                )}
              />
              <span
                className={clsx(
                  'absolute left-0 top-2 block h-px w-6 bg-current transition-opacity duration-300',
                  menuOuvert && 'opacity-0',
                )}
              />
              <span
                className={clsx(
                  'absolute left-0 block h-px w-6 bg-current transition-all duration-300',
                  menuOuvert ? 'top-2 -rotate-45' : 'top-4',
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOuvert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-20 z-40 overflow-y-auto bg-mdf-ink px-5 pb-16 pt-6 lg:hidden"
          >
            <p className="mdf-eyebrow text-mdf-oak/70">Collections</p>
            <ul className="mt-4 grid grid-cols-1 gap-px border-y border-mdf-sand/10 sm:grid-cols-2">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/mdf/collections/${c.slug}`}
                    onClick={fermer}
                    className="flex items-baseline justify-between py-3.5 text-mdf-cream"
                  >
                    <span className="mdf-display text-lg">{c.nom}</span>
                    <span className="text-xs text-mdf-sand/40">
                      {prixLabel(c.prix)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-1">
              {liens.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={fermer}
                    className="mdf-display block py-3 text-2xl text-mdf-cream"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/mdf/devis"
              onClick={fermer}
              className="mt-8 block bg-mdf-oak px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.18em] text-mdf-ink"
            >
              Demander un devis gratuit
            </Link>
            <a
              href={`tel:${company.telephoneHref}`}
              className="mt-4 block border border-mdf-sand/20 px-6 py-4 text-center text-sm text-mdf-cream"
            >
              Appeler {company.telephone}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
