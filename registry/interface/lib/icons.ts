// Importar solo los iconos que actualmente necesitamos
import {
  PanelRightIcon as _PanelRightIcon,
  PanelRightOpenIcon as _PanelRightOpenIcon,
  PanelRightCloseIcon as _PanelRightCloseIcon,
} from "lucide-react"

// Mapeo semántico de iconos - Nombres que describen el CONTEXTO, no la forma
export const productIcons = {
  rightPanel: _PanelRightIcon,
  closePanel: _PanelRightCloseIcon,
  closeRightPanel: _PanelRightCloseIcon,
  openRightPanel: _PanelRightOpenIcon,
} as const

// Type para autocompletado
export type IconName = keyof typeof productIcons
