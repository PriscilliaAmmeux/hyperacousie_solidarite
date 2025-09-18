export interface NavigationItem {
  href: string;
  label: string;
  external?: boolean;
}

export interface ButtonProps {
  variant?:
    | "coral"
    | "blue"
    | "teal"
    | "white"
    | "primary"
    | "secondary"
    | "outline"
    | "ghost";

  size?: "sm" | "md" | "lg";
  href?: string;
  download?: string;
  target?: string;
  rel?: string;
  class?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: string;
  iconPosition?: "left" | "right";
}
