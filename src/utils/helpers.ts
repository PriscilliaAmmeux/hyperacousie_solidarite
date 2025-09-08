// Utilitaires pour le projet Hyperacousie Solidarité
import type { NavigationItem } from '../types/index.ts';

/**
 * Vérifie si une URL correspond à la page actuelle
 */
export function isCurrentPage(href: string, currentPath: string): boolean {
  if (href === '/' && currentPath === '/') return true;
  if (href !== '/' && currentPath.startsWith(href)) return true;
  return false;
}

/**
 * Génère les éléments de navigation
 */
export function getNavigationItems(): NavigationItem[] {
  return [
    { href: '/', label: 'Accueil' },
    { href: '/comprendre', label: 'Comprendre l\'hyperacousie' },
    { href: '/temoignages', label: 'Témoignages' },
    { href: '/ressources', label: 'Ressources' },
    { href: '/contact', label: 'Contact' },
  ];
}

