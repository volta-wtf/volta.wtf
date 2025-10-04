"use client"

import React from "react"
import { defaultIcons, type IconName } from "../lib/icons"
import { cn } from "../lib/class"

// Definir tamaños estándar
export const iconSizes = {
  xs: "size-3",      // 12px
  sm: "size-4",      // 16px
  md: "size-5",      // 20px (default)
  lg: "size-6",      // 24px
  xl: "size-8",      // 32px
  "2xl": "size-10",  // 40px
} as const

// Definir colores semánticos
export const iconColors = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  secondary: "text-secondary-foreground",
  destructive: "text-destructive",
  success: "text-green-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
} as const

export type IconSize = keyof typeof iconSizes
export type IconColor = keyof typeof iconColors

// Interfaz extendida que soporta props booleanos para tamaños y colores
export interface BaseIconProps {
  // Sintaxis original
  size?: IconSize
  color?: IconColor

  // Props booleanos para tamaños
  xs?: boolean
  sm?: boolean
  md?: boolean
  lg?: boolean
  xl?: boolean
  "2xl"?: boolean

  // Props booleanos para colores
  default?: boolean
  muted?: boolean
  primary?: boolean
  secondary?: boolean
  destructive?: boolean
  success?: boolean
  warning?: boolean
  info?: boolean

  // Props comunes
  className?: string
  onClick?: () => void
  "aria-label"?: string
}

// Función para detectar el tamaño desde props booleanos
function detectSize(props: BaseIconProps): IconSize {
  if (props.xs) return "xs"
  if (props.sm) return "sm"
  if (props.md) return "md"
  if (props.lg) return "lg"
  if (props.xl) return "xl"
  if (props["2xl"]) return "2xl"
  return props.size || "md"
}

// Función para detectar el color desde props booleanos
function detectColor(props: BaseIconProps): IconColor {
  if (props.default) return "default"
  if (props.muted) return "muted"
  if (props.primary) return "primary"
  if (props.secondary) return "secondary"
  if (props.destructive) return "destructive"
  if (props.success) return "success"
  if (props.warning) return "warning"
  if (props.info) return "info"
  return props.color || "default"
}

// Función para crear componentes de iconos individuales
function createIconComponent(name: IconName) {
  const IconComponent = React.forwardRef<SVGSVGElement, BaseIconProps>(
    ({ className, onClick, "aria-label": ariaLabel, ...props }, ref) => {
      const IconComponent = defaultIcons[name]

      if (!IconComponent) {
        console.warn(`Icon "${name}" no encontrado en picto`)
        return null
      }

      const size = detectSize(props)
      const color = detectColor(props)

      const iconClasses = cn(
        iconSizes[size],
        iconColors[color],
        onClick && "cursor-pointer hover:opacity-80 transition-opacity",
        className
      )

      // Filtrar props que no deben pasarse al elemento SVG
      const {
        size: _size,
        color: _color,
        xs, sm, md, lg, xl, "2xl": _2xl,
        default: _default, muted, primary, secondary, destructive, success, warning, info,
        ...svgProps
      } = props

      return React.createElement(IconComponent, {
        ref,
        className: iconClasses,
        onClick,
        "aria-label": ariaLabel || name,
        ...svgProps
      })
    }
  )

  IconComponent.displayName = `Icon.${name}`
  return IconComponent
}

// Crear tipos específicos para cada icono
type CapitalizedIconNames = {
  [K in IconName as Capitalize<K>]: React.ComponentType<BaseIconProps>
}

// Crear el objeto Icon con todas las propiedades de iconos
const IconComponents: CapitalizedIconNames = Object.keys(defaultIcons).reduce((acc, iconName) => {
  const capitalizedName = iconName.charAt(0).toUpperCase() + iconName.slice(1) as Capitalize<IconName>
  acc[capitalizedName] = createIconComponent(iconName as IconName)
  return acc
}, {} as CapitalizedIconNames)

// El componente Icon principal (para mantener compatibilidad hacia atrás)
export interface IconProps extends BaseIconProps {
  name: IconName
}

function IconBase({
  name,
  className,
  onClick,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  const IconComponent = defaultIcons[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" no encontrado en defaultIcons`)
    return null
  }

  const size = detectSize(props)
  const color = detectColor(props)

  const iconClasses = cn(
    iconSizes[size],
    iconColors[color],
    onClick && "cursor-pointer hover:opacity-80 transition-opacity",
    className
  )

  // Filtrar props que no deben pasarse al elemento SVG
  const {
    size: _size,
    color: _color,
    xs, sm, md, lg, xl, "2xl": _2xl,
    default: _default, muted, primary, secondary, destructive, success, warning, info,
    ...svgProps
  } = props

  return React.createElement(IconComponent, {
    className: iconClasses,
    onClick,
    "aria-label": ariaLabel || name,
    ...svgProps
  })
}

// Asignar los componentes individuales al componente base
Object.assign(IconBase, IconComponents)

// Exportar con tipos apropiados
export const Icon = IconBase as typeof IconBase & CapitalizedIconNames

// Hook para usar iconos programáticamente
export function useIcon(name: IconName) {
  return defaultIcons[name]
}

// Utilidad para obtener clases de icono sin el componente
export function getIconClasses(size: IconSize = "md", color: IconColor = "default", className?: string) {
  return cn(iconSizes[size], iconColors[color], className)
}