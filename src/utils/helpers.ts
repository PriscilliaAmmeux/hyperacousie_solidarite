// Utilities for the Hyperacousie Solidarité project
import type { NavigationItem } from "../types/index.ts";

/**
 * Checks if a URL matches the current page
 */
export function isCurrentPage(href: string, currentPath: string): boolean {
  if (href === "/" && currentPath === "/") return true;
  if (href !== "/" && currentPath.startsWith(href)) return true;
  return false;
}

/**
 * Generates navigation items
 */
export function getNavigationItems(): NavigationItem[] {
  return [
    { href: "/", label: "Accueil" },
    { href: "/comprendre", label: "Comprendre l'hyperacousie" },
    { href: "/temoignages", label: "Témoignages" },
    { href: "/ressources", label: "Ressources" },
    { href: "/contact", label: "Contact" },
  ];
}
