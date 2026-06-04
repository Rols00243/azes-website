'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

const projetsLinks = [
  { href: '/projets-opportunites', label: 'Vue d\'ensemble' },
  { href: '/projets-opportunites/projets-en-cours', label: 'Projets en cours' },
  { href: '/projets-opportunites/projets-planifies', label: 'Projets planifiés' },
  { href: '/projets-opportunites/opportunites-investissement', label: 'Opportunités d\'investissement' },
  { href: '/projets-opportunites/appels-offres', label: 'Appels d\'offres & AMI' },
]

const navLinks = [
  { href: '/zones', label: 'Zones' },
  { href: '/documents', label: 'Documents' },
  { href: '/emplois', label: 'Emplois' },
  { href: '/demarches', label: 'Démarches' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Navigation principale">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="AZES — Accueil">
            <Image
              src="/logo.png"
              alt="AZES"
              width={140}
              height={48}
              className={clsx(
                'h-12 w-auto object-contain transition-all duration-300',
                scrolled ? 'brightness-100' : 'brightness-0 invert'
              )}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Méga-menu Projets */}
            <div className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
              <button
                className={clsx(
                  'flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                  scrolled ? 'text-gray-700 hover:text-azes-blue hover:bg-blue-50' : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
                aria-expanded={megaOpen}
                aria-haspopup="true"
              >
                Projets & Opportunités
                <ChevronDownIcon className={clsx('w-4 h-4 transition-transform', megaOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden mt-1"
                  >
                    {projetsLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-5 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-azes-blue font-medium transition-colors border-b border-gray-50 last:border-0"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-all',
                  pathname === link.href
                    ? scrolled ? 'text-azes-blue bg-blue-50' : 'text-white bg-white/20'
                    : scrolled ? 'text-gray-700 hover:text-azes-blue hover:bg-blue-50' : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/guichet-unique"
              className="ml-3 px-5 py-2.5 bg-azes-brown text-white text-sm font-semibold rounded-lg hover:bg-azes-brown-dark transition-all hover:scale-105 active:scale-95"
            >
              Guichet Unique
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={clsx('lg:hidden p-2 rounded-lg transition-colors', scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10')}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2">Projets & Opportunités</div>
              {projetsLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block px-3 py-2.5 text-sm text-gray-700 hover:text-azes-blue hover:bg-blue-50 rounded-lg font-medium transition-colors">
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-gray-100" />
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="block px-3 py-2.5 text-sm text-gray-700 hover:text-azes-blue hover:bg-blue-50 rounded-lg font-semibold transition-colors">
                  {link.label}
                </Link>
              ))}
              <Link href="/guichet-unique" className="block mt-3 px-4 py-3 bg-azes-brown text-white text-sm font-semibold rounded-lg text-center hover:bg-azes-brown-dark transition-colors">
                Guichet Unique
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
