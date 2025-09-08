// Types globaux pour le projet Hyperacousie Solidarité

export interface NavigationItem {
  href: string;
  label: string;
  external?: boolean;
}

export interface ButtonProps {
  variant?:
    | "coral"
    | "teal"
    | "white"
    | "primary"
    | "secondary"
    | "outline"
    | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  class?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: string; // Pour les icônes React/SVG
  iconPosition?: "left" | "right";
}
